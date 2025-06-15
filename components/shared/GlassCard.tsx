
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-sky-700/20 backdrop-blur-md border border-sky-500/30 rounded-xl shadow-2xl p-6 sm:p-8 ${className || ''}`}
    >
      {children}
    </div>
  );
};
    