export default function Checkbox({ label, id, ...props }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center gap-2 text-sm text-gray-700"
    >
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
        {...props}
      />
      {label}
    </label>
  );
}
