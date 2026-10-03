import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER;

export type UploadedImage = {
  url: string;
  publicId: string;
};

type CloudinaryResponse = {
  secure_url: string;
  public_id: string;
};

export async function uploadImage(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<UploadedImage> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", UPLOAD_PRESET);
  if (UPLOAD_FOLDER) body.append("folder", UPLOAD_FOLDER);

  const { data } = await axios.post<CloudinaryResponse>(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    body,
    {
      headers: { "Content-Type": undefined },
      onUploadProgress: (event) => {
        if (!onProgress || !event.total) return;
        onProgress(Math.round((event.loaded / event.total) * 100));
      },
    },
  );

  return { url: data.secure_url, publicId: data.public_id };
}

export async function uploadImages(
  files: File[],
  onProgress?: (percent: number) => void,
): Promise<UploadedImage[]> {
  if (files.length === 0) return [];

  const progressByFile = new Array<number>(files.length).fill(0);

  return Promise.all(
    files.map((file, index) =>
      uploadImage(file, (percent) => {
        progressByFile[index] = percent;
        const overall =
          progressByFile.reduce((sum, value) => sum + value, 0) / files.length;
        onProgress?.(Math.round(overall));
      }),
    ),
  );
}
