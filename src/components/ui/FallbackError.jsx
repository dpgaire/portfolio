const FallbackError = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-stone-100 px-6">
    <div className="w-12 h-12 rounded-2xl bg-red-900/30 border border-red-800/40 flex items-center justify-center mb-6">
      {/* Simple X — not a pulsing red aura */}
      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    </div>
 
    <h2 className="text-base font-semibold text-stone-100 mb-2">Something went wrong</h2>
    <p className="text-sm text-stone-400 text-center mb-2 max-w-xs leading-relaxed">
      We couldn't load this content. Please try again or get in touch.
    </p>
    <p className="text-xs text-stone-500 text-center mb-8">
      <a href="tel:+9779846724440" className="text-secondary-400 hover:text-secondary-300 transition-colors">
        +977 9846724440
      </a>
      {" · "}
      <a href="mailto:gairhedurga13@gmail.com" className="text-secondary-400 hover:text-secondary-300 transition-colors">
        gairhedurga13@gmail.com
      </a>
    </p>
 
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-sm font-medium transition-colors duration-200"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Try again
    </button>
  </div>
);

export default FallbackError;
