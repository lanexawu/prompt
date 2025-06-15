
import React, { useState, useCallback } from 'react';
import { ImagePromptFormData, GeneratedPrompts, SelectOption } from '../types';
import { TextInput } from './shared/TextInput';
import { TextAreaInput } from './shared/TextAreaInput';
import { SelectInput } from './shared/SelectInput';
import { GlassCard } from './shared/GlassCard';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { generateEnhancedPrompt } from '../services/geminiService';
import {
  AGES,
  COUNTRIES,
  TIMES_OF_DAY,
  LIGHTING_CONDITIONS,
  SHOT_TYPES,
  ASPECT_RATIOS,
  IMAGE_STYLES,
  IMAGE_MOODS,
} from '../constants';

const initialFormData: ImagePromptFormData = {
  subjek: '',
  rambut: '',
  usia: '',
  pakaian: '',
  negaraAsal: '',
  aksi: '',
  ekspresi: '',
  tempat: '',
  waktu: '',
  pengambilanGambar: '',
  aspekRasio: '',
  pencahayaan: '',
  gayaGambar: '',
  suasanaGambar: '',
  detailTambahan: '',
};

export const PromptToImageGenerator: React.FC = () => {
  const [formData, setFormData] = useState<ImagePromptFormData>(initialFormData);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedEnglish, setCopiedEnglish] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleIndonesianPromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGeneratedPrompts(prev => prev ? { ...prev, indonesian: e.target.value } : null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPrompts(null);
    setCopiedEnglish(false);

    const basePromptParts = [
      formData.subjek && `Subjek: ${formData.subjek}`,
      formData.rambut && `Rambut: ${formData.rambut}`,
      formData.usia && `Usia: ${formData.usia} tahun`,
      formData.pakaian && `Pakaian: ${formData.pakaian}`,
      formData.negaraAsal && `Negara asal subjek: ${formData.negaraAsal}`,
      formData.aksi && `Aksi: ${formData.aksi}`,
      formData.ekspresi && `Ekspresi: ${formData.ekspresi}`,
      formData.tempat && `Tempat/Latar: ${formData.tempat}`,
      formData.waktu && `Waktu: ${TIMES_OF_DAY.find(opt => opt.value === formData.waktu)?.label || formData.waktu}`,
      formData.pengambilanGambar && `Pengambilan gambar: ${SHOT_TYPES.find(opt => opt.value === formData.pengambilanGambar)?.label || formData.pengambilanGambar}`,
      formData.aspekRasio && `Aspek rasio: ${ASPECT_RATIOS.find(opt => opt.value === formData.aspekRasio)?.label || formData.aspekRasio}`,
      formData.pencahayaan && `Pencahayaan: ${LIGHTING_CONDITIONS.find(opt => opt.value === formData.pencahayaan)?.label || formData.pencahayaan}`,
      formData.gayaGambar && `Gaya gambar: ${IMAGE_STYLES.find(opt => opt.value === formData.gayaGambar)?.label || formData.gayaGambar}`,
      formData.suasanaGambar && `Suasana gambar: ${IMAGE_MOODS.find(opt => opt.value === formData.suasanaGambar)?.label || formData.suasanaGambar}`,
      formData.detailTambahan && `Detail tambahan: ${formData.detailTambahan}`,
    ];
    const basePrompt = basePromptParts.filter(Boolean).join('. ');


    try {
      const prompts = await generateEnhancedPrompt(basePrompt, 'image');
      setGeneratedPrompts(prompts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghasilkan prompt. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleCopyEnglishPrompt = useCallback(() => {
    if (generatedPrompts?.english) {
      navigator.clipboard.writeText(generatedPrompts.english);
      setCopiedEnglish(true);
      setTimeout(() => setCopiedEnglish(false), 2000);
    }
  }, [generatedPrompts]);


  return (
    <GlassCard className="w-full">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-sky-100">Prompt Generator untuk Gambar</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <TextInput label="Subjek Utama" name="subjek" value={formData.subjek} onChange={handleChange} placeholder="Contoh: Naga perkasa, sebuah apel" required />
        <TextInput label="Rambut/Bulu/Tekstur Subjek" name="rambut" value={formData.rambut} onChange={handleChange} placeholder="Contoh: Bersisik hijau, halus dan berkilau" />
        <SelectInput label="Usia Subjek (jika relevan)" name="usia" value={formData.usia} onChange={handleChange} options={AGES} />
        <TextInput label="Pakaian/Aksesori Subjek" name="pakaian" value={formData.pakaian} onChange={handleChange} placeholder="Contoh: Armor emas, selendang sutra" />
        <SelectInput label="Negara Asal (inspirasi visual)" name="negaraAsal" value={formData.negaraAsal} onChange={handleChange} options={COUNTRIES} />
        <TextInput label="Aksi/Pose Subjek" name="aksi" value={formData.aksi} onChange={handleChange} placeholder="Contoh: Terbang di atas gunung, berpose anggun" required />
        <TextInput label="Ekspresi Subjek" name="ekspresi" value={formData.ekspresi} onChange={handleChange} placeholder="Contoh: Marah, tenang, bahagia" />
        <TextInput label="Tempat/Latar Belakang" name="tempat" value={formData.tempat} onChange={handleChange} placeholder="Contoh: Kastil melayang, padang pasir luas" required />
        <SelectInput label="Waktu (Pencahayaan Utama)" name="waktu" value={formData.waktu} onChange={handleChange} options={TIMES_OF_DAY} />
        <SelectInput label="Pengambilan Gambar (Framing)" name="pengambilanGambar" value={formData.pengambilanGambar} onChange={handleChange} options={SHOT_TYPES} />
        <SelectInput label="Aspek Rasio" name="aspekRasio" value={formData.aspekRasio} onChange={handleChange} options={ASPECT_RATIOS} />
        <SelectInput label="Pencahayaan Detail" name="pencahayaan" value={formData.pencahayaan} onChange={handleChange} options={LIGHTING_CONDITIONS} />
        <SelectInput label="Gaya Gambar" name="gayaGambar" value={formData.gayaGambar} onChange={handleChange} options={IMAGE_STYLES} required />
        <SelectInput label="Suasana Gambar" name="suasanaGambar" value={formData.suasanaGambar} onChange={handleChange} options={IMAGE_MOODS} />
        
        <div className="md:col-span-2">
            <TextAreaInput label="Detail Tambahan" name="detailTambahan" value={formData.detailTambahan} onChange={handleChange} placeholder="Contoh: Warna dominan biru dan emas, tekstur kasar pada batu" rows={3}/>
        </div>
        
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Menghasilkan...' : 'Hasilkan Prompt Gambar'}
          </button>
        </div>
      </form>

      {isLoading && <LoadingSpinner message="Sedang meracik prompt gambar..." />}
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
