
import React from 'react';
import { SelectOption } from '../../types';

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-sky-200 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-sky-800/50 border border-sky-600/70 text-sky-100 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition duration-150 ease-in-out appearance-none bg-no-repeat bg-right pr-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%237dd3fc' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        <option value="" disabled className="text-gray-500">Pilih...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-sky-700 text-sky-100">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
    