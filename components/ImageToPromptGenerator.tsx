
import React, { useState, useCallback } from 'react';
import { GeneratedPrompts } from '../types';
import { FileUpload } from './shared/FileUpload';
import { TextAreaInput } from './shared/TextAreaInput';
import { GlassCard } from './shared/GlassCard';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { getPromptFromImage } from '../services/geminiService';

export const ImageToPromptGenerator: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<{ file: File; base64: string } | null>(null);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedEnglish, setCopiedEnglish] = useState(false);

  const handleFileSelect = useCallback((file: File, base64: string) => {
    setSelectedFile({ file, base64 });
    setGeneratedPrompts(null); // Reset prompts if new file is selected
    setError(null);
    setCopiedEnglish(false);
  }, []);

  const handleIndonesianPromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGeneratedPrompts(prev => prev ? { ...prev, indonesian: e.target.value } : null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile) {
      setError('Silakan pilih file gambar terlebih dahulu.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompts(null);
    setCopiedEnglish(false);

    try {
      const prompts = await getPromptFromImage(selectedFile.base64, selectedFile.file.type);
      setGeneratedPrompts(prompts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghasilkan prompt dari gambar. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  const handleCopyEnglishPrompt = useCallback(() => {
    if (generatedPrompts?.english) {
      navigator.clipboard.writeText(generatedPrompts.english);
      setCopiedEnglish(true);
      setTimeout(() => setCopiedEnglish(false), 2000);
    }
  }, [generatedPrompts]);

  return (
    <GlassCard className="w-full">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-sky-100">Image to Prompt Generator</h2>
      
      <FileUpload
        onFileSelect={handleFileSelect}
        label="Unggah Gambar (Maks 30MB)"
      />

      {selectedFile && (
         <div className="my-4 text-center">
            <img 
                src={URL.createObjectURL(selectedFile.file)} 
                alt="Preview" 
                className="max-w-xs sm:max-w-sm max-h-64 mx-auto rounded-lg shadow-lg border-2 border-sky-500/50"
            />
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Menganalisis Gambar...' : 'Hasilkan Prompt dari Gambar'}
        </button>
      </div>

      {isLoading && <LoadingSpinner message="Sedang memproses gambar Anda..." />}
      {error && <p className="mt-4 text-sm text-red-400 bg-red-900/30 p-3 rounded-md">{error}</p>}

      {generatedPrompts && (
        <div className="mt-8 pt-6 border-t border-sky-600/50">
          <h3 className="text-xl font-semibold mb-4 text-sky-100">Hasil Prompt:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TextAreaInput
                label="Prompt Bahasa Indonesia (Dapat Diedit)"
                name="indonesianPrompt"
                value={generatedPrompts.indonesian}
                onChange={handleIndonesianPromptChange}
                rows={8}
              />
            </div>
            <div>
              <TextAreaInput
                label="Prompt Bahasa Inggris (Final)"
                name="englishPrompt"
                value={generatedPrompts.english}
                onChange={() => {}} // Non-editable
                rows={8}
                disabled
              />
               <button
                onClick={handleCopyEnglishPrompt}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
                aria-label="Salin prompt Bahasa Inggris"
              >
                {copiedEnglish ? 'Disalin!' : 'Salin Teks Inggris'}
              </button>
            </div>
          </div>
           <button
              onClick={() => navigator.clipboard.writeText(`Indonesian Prompt:\n${generatedPrompts.indonesian}\n\nEnglish Prompt:\n${generatedPrompts.english}`)}
              className="mt-6 bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-150"
            >
              Salin Semua Prompt
            </button>
        </div>
      )}
    </GlassCard>
  );
};
