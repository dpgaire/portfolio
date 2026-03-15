const ProjectCardSkeleton = () => (
  <div className="rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 overflow-hidden">
    <div className="aspect-video bg-stone-200 dark:bg-dark-700 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-stone-200 dark:bg-dark-700 rounded-full w-3/5 animate-pulse" />
      <div className="h-3 bg-stone-200 dark:bg-dark-700 rounded-full w-full animate-pulse" />
      <div className="h-3 bg-stone-200 dark:bg-dark-700 rounded-full w-4/5 animate-pulse" />
      <div className="flex gap-2 pt-1">
        {[1,2,3].map(i => <div key={i} className="h-5 bg-stone-200 dark:bg-dark-700 rounded-lg w-14 animate-pulse" />)}
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
