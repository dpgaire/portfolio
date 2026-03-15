export const LegalPage = ({ title, subtitle, lastUpdated, children }) => (
  <>
    <div className="bg-white dark:bg-dark-900 min-h-screen">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest text-secondary-600 dark:text-secondary-400 uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 leading-relaxed">{subtitle}</p>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>
 
        {/* Content */}
        <div className="space-y-12">{children}</div>
      </div>
    </div>
  </>
);