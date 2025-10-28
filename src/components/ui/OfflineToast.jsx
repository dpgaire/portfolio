import React from 'react';
import { WifiOff } from 'lucide-react';

const OfflineToast = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slide-in-right">
      <div className="bg-red-600 text-white p-4 rounded-xl shadow-xl flex items-center">
        <WifiOff size={28} className="mr-3 flex-shrink-0" />
        <div>
          <p className="font-bold leading-tight">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default OfflineToast;
