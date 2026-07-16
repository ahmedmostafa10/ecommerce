import { useState } from "react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-black px-4 py-2 pr-12 text-xs text-white sm:text-sm">
      <p className="text-center">
        Sign up and get 20% off to your first order.{" "}
        <a
          href="/signup"
          className="font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          Sign Up Now
        </a>
      </p>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-opacity hover:opacity-70 md:mr-40 sm:mr-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M18 6L6 18" />
          <path d="M6 6L18 18" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;
