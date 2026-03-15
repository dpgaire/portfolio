const BlogDetailsSkeleton = () => {
  return (
     <div className="pt-16 bg-white dark:bg-dark-900 min-h-screen">
    <div className="border-b border-stone-100 dark:border-dark-700 py-14">
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-4xl space-y-4">
        <div className="h-3 bg-stone-200 dark:bg-dark-700 rounded-full w-24 animate-pulse" />
        <div className="h-10 bg-stone-200 dark:bg-dark-700 rounded-lg w-3/4 animate-pulse" />
        <div className="h-5 bg-stone-200 dark:bg-dark-700 rounded-full w-1/2 animate-pulse" />
        <div className="flex gap-4 pt-2">
          {[1,2,3].map(i => <div key={i} className="h-4 bg-stone-200 dark:bg-dark-700 rounded-full w-20 animate-pulse" />)}
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        <div className="lg:col-span-3 space-y-3">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className={`h-3.5 bg-stone-200 dark:bg-dark-700 rounded-full animate-pulse ${i % 4 === 0 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 p-5 space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-9 bg-stone-200 dark:bg-dark-700 rounded-xl animate-pulse" />)}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default BlogDetailsSkeleton;
