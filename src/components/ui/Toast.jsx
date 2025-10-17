import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Toast = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      const hasBeenShown = sessionStorage.getItem('toastShown');
      if (!hasBeenShown) {
        setTimeout(() => {
          setVisible(true);
          const audio = new Audio('https://dpgaire.github.io/image-server/sounds/live-chat.mp3');
          audio.play().catch(() => {}); 
        }, 4000);

        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem('toastShown', 'true');
        }, 10000);

        window.removeEventListener('click', handleUserInteraction);
      }
    };

    window.addEventListener('click', handleUserInteraction);
    return () => window.removeEventListener('click', handleUserInteraction);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-5 sm:bottom-5 sm:right-5 animate-slide-in-right z-50">
      <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 text-white p-4 rounded-xl shadow-xl flex items-center">
        <MessageCircle size={28} className="mr-3 flex-shrink-0" />
        <div>
          <p className="font-bold leading-tight">Chat with me!</p>
          <p className="text-sm text-emerald-100">I can answer your questions.</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute top-1 right-1 text-white/70 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Pointer / Tail */}
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-gradient-to-br from-emerald-500 to-green-600 rotate-45 rounded-sm shadow-md" />
      </div>
    </div>
  );
};

export default Toast;
