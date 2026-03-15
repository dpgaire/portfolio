export const LegalSection = ({ number, title, children }) => (
  <section>
    <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-4 flex items-baseline gap-2">
      <span className="text-xs font-mono text-stone-400 dark:text-stone-500 w-5">{number}.</span>
      {title}
    </h2>
    <div className="pl-7 text-sm text-stone-600 dark:text-stone-400 leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

export const Highlight = ({ children }) => (
  <span className="font-medium text-gray-800 dark:text-stone-200">{children}</span>
);
 
/* ─ Contact box ─ */
export const ContactBox = ({ children }) => (
  <div className="mt-4 p-5 rounded-xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800">
    {children}
  </div>
);