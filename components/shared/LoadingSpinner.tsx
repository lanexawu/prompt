
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <div
        className={`animate-spin rounded-full border-4 border-t-4 border-sky-400 border-t-cyan-200 ${sizeClasses[size]}`}
      ></div>
      {message && <p className="mt-3 text-sm text-sky-200">{message}</p>}
    </div>
  );
};
    