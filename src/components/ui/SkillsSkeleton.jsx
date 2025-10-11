const SkillCategorySkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="h-8 w-8 bg-gray-300 rounded-full mb-4 animate-pulse"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
    </div>
  </div>
);

const SkillsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <SkillCategorySkeleton />
      <SkillCategorySkeleton />
      <SkillCategorySkeleton />
    </div>
  );
};

export default SkillsSkeleton;
