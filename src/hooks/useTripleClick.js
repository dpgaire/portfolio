import { useEffect } from 'react';

export const useTripleClick = (callback, delay = 1200) => {
  let clicks = 0;
  let timer;

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (clicks === 3) callback();
      clicks = 0;
    }, delay);
  };
};
