import React, { useState, useEffect, useMemo } from 'react';

const Alert = ({ message, type = 'error', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const styles = useMemo(() => ({
    bgColor: type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-blue-500',
    progressColor: type === 'error' ? 'bg-red-300' : type === 'success' ? 'bg-green-300' : 'bg-blue-300',
    shadowColor: type === 'success' ? 'shadow-green-200' : 'shadow-lg'
  }), [type]);

  useEffect(() => {
    if (!message) return;

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    // Auto hide after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Wait for exit animation
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [message, duration, onClose]);

  if (!message || !isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-[60] transform transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`${styles.bgColor} text-white px-6 py-4 rounded-lg ${styles.shadowColor} max-w-sm min-w-[300px] relative overflow-hidden ${type === 'success' ? 'shadow-xl' : 'shadow-lg'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {type === 'error' && (
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'success' && (
              <div className="flex items-center mr-3">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg">🎉</span>
              </div>
            )}
            <span className={`font-medium ${type === 'success' ? 'text-base font-semibold' : 'text-sm'}`}>{message}</span>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose && onClose(), 300);
            }}
            className="ml-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
          <div
            className={`h-full ${styles.progressColor} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Alert;
