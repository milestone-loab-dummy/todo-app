"use client";

import { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 bg-red-500 text-white rounded-xl shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-4"
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {message}
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="ml-2 opacity-75 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-white rounded"
      >
        ✕
      </button>
    </div>
  );
}
