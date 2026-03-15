const ProjectDetailsSkeleton = () => {
  return (
    <div className="section-padding bg-white dark:bg-dark-900 min-h-screen">
    <div className="container-custom space-y-10">
      <div className="h-4 bg-stone-200 dark:bg-dark-700 rounded-full w-28 animate-pulse" />
      <div className="space-y-3 max-w-3xl">
        <div className="h-10 bg-stone-200 dark:bg-dark-700 rounded-lg w-2/3 animate-pulse" />
        <div className="h-5 bg-stone-200 dark:bg-dark-700 rounded-full w-full animate-pulse" />
      </div>
      <div className="w-full h-80 bg-stone-200 dark:bg-dark-700 rounded-2xl animate-pulse" />
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {[1,2,3].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-stone-200 dark:bg-dark-700 rounded-full w-24 animate-pulse" />
              <div className="h-4 bg-stone-200 dark:bg-dark-700 rounded-full w-full animate-pulse" />
              <div className="h-4 bg-stone-200 dark:bg-dark-700 rounded-full w-5/6 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 p-6 space-y-4">
          <div className="h-3 bg-stone-200 dark:bg-dark-700 rounded-full w-24 animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {[1,2,3,4].map(i => <div key={i} className="h-6 bg-stone-200 dark:bg-dark-700 rounded-lg w-16 animate-pulse" />)}
          </div>
          <div className="h-10 bg-stone-200 dark:bg-dark-700 rounded-xl animate-pulse" />
          <div className="h-10 bg-stone-200 dark:bg-dark-700 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProjectDetailsSkeleton;
