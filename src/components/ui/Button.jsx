const Button = ({ children, variant = "primary", size = "md", className = "", icon, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400",
    glow: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl relative overflow-hidden group"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-6 py-2.5 text-base rounded-lg",
    lg: "px-8 py-3 text-lg rounded-xl"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} relative`}
      {...props}
    >
      {variant === 'glow' && (
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      )}
      {icon && <span className="mr-2">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button