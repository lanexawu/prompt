import React, { useRef, useLayoutEffect } from 'react';

interface TextAreaInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3, // Will act as a min-rows suggestion
  required = false,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Temporarily reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height to the scrollHeight to fit the content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      // Hide the scrollbar
      textareaRef.current.style.overflowY = 'hidden';
    }
  }, [value]); // Re-run when the value changes

  // Calculate min-height based on rows prop to ensure initial size is reasonable
  // Assuming line height of around 1.5rem (24px) and py-2 (8px top/bottom padding)
  const minHeight = `calc(${rows * 1.5}rem + 1rem)`; // 1.5rem per row + py-2 (0.5rem * 2)

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-sky-200 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        ref={textareaRef}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // rows attribute is less critical now but can provide an initial hint
        rows={rows} 
        required={required}
        disabled={disabled}
        className={`w-full bg-sky-800/50 border border-sky-600/70 text-sky-100 placeholder-sky-400/70 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition duration-150 ease-in-out resize-none ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
        style={{ minHeight: minHeight, overflowY: 'hidden' }} // Ensure resize-none and overflow is hidden
      />
    </div>
  );
};