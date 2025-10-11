const ProjectCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4 animate-pulse"></div>
      <div className="flex justify-between">
        <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

const ProjectsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  );
};

export default ProjectsSkeleton;
