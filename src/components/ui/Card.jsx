const Card = ({ children, className = "", hover = true, glow = false }) => (
  <div className={`relative ${glow ? 'group' : ''}`}>
    {glow && (
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
    )}
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative ${hover ? 'hover:shadow-xl transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  </div>
);

export default Card;