import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-200 mb-4">
          Sorry, the page you're looking for cannot be found.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400 mb-8">
          It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="btn-primary inline-flex items-center"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
