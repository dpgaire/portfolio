const ProgressBar = ({ skill }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <span className="mr-2 text-blue-500">{skill.icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${skill.level}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;