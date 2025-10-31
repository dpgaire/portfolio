import { useMemo } from "react";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const quotes = [
  "“Every setback is a setup for a comeback.”",
  "“Failure is not the opposite of success; it’s part of success.”",
  "“Even the best code sometimes breaks — stay calm and fix it.”",
  "“Errors are just opportunities to learn faster.”",
  "“Perfection is achieved not when there is nothing to add, but when there is nothing left to take away.”",
  "“The only real mistake is the one from which we learn nothing.”",
  "“Bugs are proof you’re building something real.”",
];

const FallbackError = () => {
  const randomQuote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white backdrop-blur-lg">
      {/* Animated icon or X mark */}

      <div className="relative flex items-center justify-center mb-6">
        {/* Glowing red aura */}
        <div className="absolute w-24 h-24 bg-red-600/30 blur-2xl rounded-full animate-pulse"></div>
        <div className="absolute w-16 h-16 bg-red-500/40 blur-xl rounded-full animate-ping"></div>

        {/* Error Icon */}
        <ExclamationTriangleIcon className="relative w-16 h-16 text-red-500 drop-shadow-[0_0_12px_rgba(255,0,0,0.6)]" />
      </div>

      {/* Error Message */}
      <h2 className="text-2xl space-y-2 mt-2 font-semibold mb-3 text-red-400">
        Error: Something went wrong!
      </h2>

      {/* Random Quote */}
      <p className="max-w-md text-center text-gray-400 italic px-6 mb-6">
        {randomQuote}
      </p>
      <p className="text-gray-300 font-semibold italic text-center px-4">
        Please contact us at{" "}
        <a
          href="tel:+9779846724440"
          className="text-blue-400 underline hover:text-blue-300 transition-colors"
        >
          +977 9846724440
        </a>{" "}
        or email us at{" "}
        <a
          href="mailto:gairhedurga13@gmail.com"
          className="text-blue-400 underline hover:text-blue-300 transition-colors"
        >
          gairhedurga13@gmail.com
        </a>
      </p>

      <button
        onClick={() => window.location.reload()}
        className="
        mt-8 px-6 py-3 flex items-center gap-2
        rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
        text-white font-medium shadow-lg shadow-blue-500/30
        hover:from-indigo-500 hover:to-purple-600
        transform hover:scale-105 active:scale-95
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
      "
      >
        <ArrowPathIcon className="w-5 h-5 animate-spin-on-hover transition-transform duration-300" />
        <span>Try Again</span>
      </button>
    </div>
  );
};

export default FallbackError;
