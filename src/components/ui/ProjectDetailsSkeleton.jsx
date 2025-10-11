const ProjectDetailsSkeleton = () => {
  return (
    <div className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-8 animate-pulse"></div>

        <div className="text-center mb-16">
          <div className="h-16 bg-gray-300 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>

        <div className="mb-12">
          <div className="w-full h-96 bg-gray-300 rounded-lg shadow-lg animate-pulse"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose dark:prose-invert max-w-none">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-4 animate-pulse"></div>

              <div className="h-8 bg-gray-300 rounded w-1/3 mt-8 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-4/5 mb-4 animate-pulse"></div>

              <div className="h-8 bg-gray-300 rounded w-1/3 mt-8 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-4 animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="card p-6 sticky top-24">
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="flex flex-wrap gap-2 mb-8">
                <div className="h-6 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-full w-28 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-300 rounded w-full mb-3 animate-pulse"></div>
              <div className="h-12 bg-gray-300 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
            <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
