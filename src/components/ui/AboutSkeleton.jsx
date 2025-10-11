const AboutSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/2 pr-8">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4 animate-pulse"></div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto animate-pulse"></div>
      </div>
    </div>
  );
};

export default AboutSkeleton;
