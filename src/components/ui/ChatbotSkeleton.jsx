import React from 'react';

const ChatbotSkeleton = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="relative w-full h-full md:w-[95vw] md:h-[90vh] max-w-4xl rounded-lg bg-white flex shadow-2xl transition-all duration-300 animate-pulse">
        {/* Sidebar Skeleton */}
        <div className="hidden md:flex w-1/3 bg-gray-200/95 p-3 flex-col rounded-l-lg">
          <div className="h-12 mb-4 rounded-lg bg-gray-300/50"></div>
          <div className="flex-grow overflow-y-auto -mr-2 pr-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 mb-2 rounded-lg bg-gray-300/50"></div>
            ))}
          </div>
          <div className="border-t border-gray-300/20 pt-3 mt-2">
            <div className="flex items-center p-2.5 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gray-300/50 mr-2"></div>
              <div className="flex-grow">
                <div className="h-4 w-3/4 rounded bg-gray-300/50"></div>
                <div className="h-3 w-1/2 mt-1 rounded bg-gray-300/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area Skeleton */}
        <div className="w-full flex flex-col bg-gray-100/50 rounded-lg md:rounded-r-lg md:rounded-l-none">
          <div className="p-3 border-b border-gray-200/80 flex justify-between items-center bg-gray-200/50 rounded-t-lg md:rounded-tr-lg md:rounded-tl-none">
            <div className="h-6 w-1/3 rounded bg-gray-300/50"></div>
            <div className="h-8 w-8 rounded-md bg-gray-300/50"></div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto">
            <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-300/50 mb-4"></div>
                <div className="h-8 w-1/2 rounded bg-gray-300/50 mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                    <div className="h-12 rounded-xl bg-gray-300/50"></div>
                    <div className="h-12 rounded-xl bg-gray-300/50"></div>
                    <div className="h-12 rounded-xl bg-gray-300/50"></div>
                    <div className="h-12 rounded-xl bg-gray-300/50"></div>
                </div>
            </div>
          </div>

          <div className="p-3 border-t border-gray-200/80 bg-gray-200/50 rounded-br-lg">
            <div className="relative">
              <div className="w-full h-12 rounded-xl bg-gray-300/50"></div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-300/50"></div>
            </div>
            <div className="h-4 w-1/2 mx-auto mt-2 rounded bg-gray-300/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSkeleton;
