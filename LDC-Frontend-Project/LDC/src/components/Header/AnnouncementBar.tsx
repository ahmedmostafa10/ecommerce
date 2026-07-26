import { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/icons/CloseIcon";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/slices/authslice";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isVisible || isAuthenticated) return null;

  return (
    <div className="relative bg-black px-4 py-2 pr-12 text-xs text-white sm:text-sm">
      <p className="text-center">
        Sign up and get 20% off to your first order.{" "}
        <Link
          to="/register"
          className="font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          Sign Up Now
        </Link>
      </p>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-opacity hover:opacity-70 md:mr-40 sm:mr-20"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
