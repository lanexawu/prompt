
import React, { useState, useCallback } from 'react';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../../constants';

interface FileUploadProps {
  onFileSelect: (file: File, base64: string) => void;
  label: string;
  acceptedMimeTypes?: string[]; // e.g., ['image/jpeg', 'image/png']
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  label,
  acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFileName(null);
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`Ukuran file maksimal adalah ${MAX_FILE_SIZE_MB}MB.`);
        event.target.value = ''; // Reset file input
        return;
      }
      if (acceptedMimeTypes && !acceptedMimeTypes.includes(file.type)) {
        setError(`Jenis file tidak valid. Harap unggah: ${acceptedMimeTypes.join(', ')}.`);
        event.target.value = ''; // Reset file input
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(file, (reader.result as string).split(',')[1]); // Send base64 part only
      };
      reader.onerror = () => {
        setError('Gagal membaca file.');
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect, acceptedMimeTypes]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-sky-200 mb-1">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sky-600/70 border-dashed rounded-md bg-sky-800/30 hover:bg-sky-800/50 transition-colors">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-sky-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-sky-300">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-sky-700 rounded-md font-medium text-cyan-300 hover:text-cyan-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-sky-800 focus-within:ring-cyan-400 px-2 py-1"
            >
              <span>Unggah file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept={acceptedMimeTypes.join(',')} />
            </label>
            <p className="pl-1">atau seret dan lepas</p>
          </div>
          <p className="text-xs text-sky-400">PNG, JPG, GIF, WEBP hingga {MAX_FILE_SIZE_MB}MB</p>
        </div>
      </div>
      {fileName && <p className="mt-2 text-sm text-green-400">File terpilih: {fileName}</p>}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
};
    