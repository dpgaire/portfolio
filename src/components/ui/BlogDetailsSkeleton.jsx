const BlogDetailsSkeleton = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative bg-gray-50 dark:bg-dark-800 py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8 animate-pulse"></div>
            <div className="h-16 bg-gray-300 rounded w-3/4 mb-6 animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-8 animate-pulse"></div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl sm:max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert w-full max-w-full overflow-auto">
                <div className="h-8 bg-gray-300 rounded w-full mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-4/5 mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded w-full mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-2 animate-pulse"></div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card p-6">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
                    <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
                    <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
