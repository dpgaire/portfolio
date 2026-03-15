import { useMemo } from "react";
 
const quotes = [
  "Great things take time.",
"Code is like humor. When you have to explain it, it's bad.",
  "Simplicity is the soul of efficiency.",
  "Stay hungry, stay foolish.",
  "Strive for progress, not perfection.",
  "Every great developer you know started where you are now.",
  "Good code is its own best documentation.",
];
 
export const LoadingSpinner = () => {
  const randomQuote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    []
  );
 
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-stone-100">
      {/* Single clean spinner — no nested rings */}
      <div className="mb-10">
        <div className="w-10 h-10 border-2 border-stone-700 border-t-secondary-400 rounded-full animate-spin" />
      </div>
 
      <p className="text-sm font-medium text-stone-300 mb-3">Loading…</p>
      <p className="max-w-xs text-center text-xs text-stone-500 italic px-6 leading-relaxed">
        {randomQuote}
      </p>
    </div>
  );
};
 
export default LoadingSpinner;