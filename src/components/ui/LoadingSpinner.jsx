import React, { useMemo } from "react";

const quotes = [
  "“Great things take time.”",
  "“Code is like humor. When you have to explain it, it’s bad.”",
  "“Simplicity is the soul of efficiency.”",
  "“Stay hungry, stay foolish.”",
  "“Strive for progress, not perfection.”",
  "“Every great developer you know started where you are now.”",
  "“Good code is its own best documentation.”",
  "“Focus on being productive instead of busy.”",
  "“Dream in code, build in reality.”",
];

const LoadingSpinner = () => {
  // Pick a random quote once per mount
  const randomQuote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white backdrop-blur-lg">
      {/* Spinner */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-24 h-24 border-8 border-gray-700 border-t-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute w-16 h-16 border-8 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg"></div>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-semibold mb-3 animate-pulse">
        Preparing Awesomeness...
      </h2>

      {/* Random Quote */}
      <p className="max-w-md text-center text-gray-400 italic px-4">
        {randomQuote}
      </p>
    </div>
  );
};

export default LoadingSpinner;
