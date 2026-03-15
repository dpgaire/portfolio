const SkillCatSkeleton = () => (
  <div className="rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 p-7 space-y-5">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-stone-200 dark:bg-dark-700 rounded-lg animate-pulse" />
      <div className="h-4 bg-stone-200 dark:bg-dark-700 rounded-full w-32 animate-pulse" />
    </div>
    {[1,2,3,4].map(i => (
      <div key={i} className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 bg-stone-200 dark:bg-dark-700 rounded-full w-24 animate-pulse" />
          <div className="h-3 bg-stone-200 dark:bg-dark-700 rounded-full w-8 animate-pulse" />
        </div>
        <div className="h-1.5 bg-stone-200 dark:bg-dark-700 rounded-full animate-pulse" />
      </div>
    ))}
  </div>
);
 
export const SkillsSkeleton = () => (
  <div className="grid lg:grid-cols-2 gap-6">
    <SkillCatSkeleton />
    <SkillCatSkeleton />
    <SkillCatSkeleton />
    <SkillCatSkeleton />
  </div>
);

export default SkillsSkeleton;
