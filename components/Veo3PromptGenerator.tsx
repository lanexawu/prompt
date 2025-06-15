
import React, { useState, useCallback } from 'react';
import { Veo3FormData, GeneratedPrompts, SelectOption } from '../types';
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
  CAMERA_MOVEMENTS,
  LIGHTING_CONDITIONS,
  VIDEO_STYLES,
  VIDEO_MOODS,
} from '../constants';

const initialFormData: Veo3FormData = {
  subjek: '',
  usia: '',
  rambut: '',
  negaraAsal: '',
  pakaian: '',
  aksi: '',
  ekspresi: '',
  tempat: '',
  waktu: '',
  gerakanKamera: '',
  pencahayaan: '',
  gayaVideo: '',
  suasanaVideo: '',
  suaraMusik: '',
  kalimatDiucapkan: '',
  detailTambahan: '',
};

export const Veo3PromptGenerator: React.FC = () => {
  const [formData, setFormData] = useState<Veo3FormData>(initialFormData);
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
      formData.usia && `Usia: ${formData.usia} tahun`,
      formData.rambut && `Rambut: ${formData.rambut}`,
      formData.negaraAsal && `Negara asal: ${formData.negaraAsal}`,
      formData.pakaian && `Pakaian: ${formData.pakaian}`,
      formData.aksi && `Aksi: ${formData.aksi}`,
      formData.ekspresi && `Ekspresi: ${formData.ekspresi}`,
      formData.tempat && `Tempat: ${formData.tempat}`,
      formData.waktu && `Waktu: ${formData.waktu}`,
      formData.gerakanKamera && `Gerakan kamera: ${CAMERA_MOVEMENTS.find(opt => opt.value === formData.gerakanKamera)?.label || formData.gerakanKamera}`,
      formData.pencahayaan && `Pencahayaan: ${LIGHTING_CONDITIONS.find(opt => opt.value === formData.pencahayaan)?.label || formData.pencahayaan}`,
      formData.gayaVideo && `Gaya video: ${VIDEO_STYLES.find(opt => opt.value === formData.gayaVideo)?.label || formData.gayaVideo}`,
      formData.suasanaVideo && `Suasana video: ${VIDEO_MOODS.find(opt => opt.value === formData.suasanaVideo)?.label || formData.suasanaVideo}`,
      formData.suaraMusik && `Suara atau musik: ${formData.suaraMusik}`,
      formData.kalimatDiucapkan && `Kalimat yang diucapkan: "${formData.kalimatDiucapkan}"`,
      formData.detailTambahan && `Detail tambahan: ${formData.detailTambahan}`,
    ];
    const basePrompt = basePromptParts.filter(Boolean).join('. ');

    try {
      const prompts = await generateEnhancedPrompt(basePrompt, 'veo');
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
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-sky-100">Veo 3 Prompt Generator</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <TextInput label="Subjek" name="subjek" value={formData.subjek} onChange={handleChange} placeholder="Contoh: Seorang astronot, seekor kucing" required />
        <SelectInput label="Usia" name="usia" value={formData.usia} onChange={handleChange} options={AGES} />
        <TextInput label="Rambut" name="rambut" value={formData.rambut} onChange={handleChange} placeholder="Contoh: Panjang berwarna merah, botak" />
        <SelectInput label="Negara Asal (Subjek)" name="negaraAsal" value={formData.negaraAsal} onChange={handleChange} options={COUNTRIES} />
        <TextInput label="Pakaian" name="pakaian" value={formData.pakaian} onChange={handleChange} placeholder="Contoh: Jas hujan kuning, baju luar angkasa" />
        <TextInput label="Aksi" name="aksi" value={formData.aksi} onChange={handleChange} placeholder="Contoh: Menari di bawah hujan, melayang di luar angkasa" required />
        <TextInput label="Ekspresi" name="ekspresi" value={formData.ekspresi} onChange={handleChange} placeholder="Contoh: Gembira, terkejut, fokus" />
        <TextInput label="Tempat / Latar" name="tempat" value={formData.tempat} onChange={handleChange} placeholder="Contoh: Hutan ajaib, stasiun luar angkasa" required />
        <SelectInput label="Waktu" name="waktu" value={formData.waktu} onChange={handleChange} options={TIMES_OF_DAY} />
        <SelectInput label="Gerakan Kamera" name="gerakanKamera" value={formData.gerakanKamera} onChange={handleChange} options={CAMERA_MOVEMENTS} />
        <SelectInput label="Pencahayaan" name="pencahayaan" value={formData.pencahayaan} onChange={handleChange} options={LIGHTING_CONDITIONS} />
        <SelectInput label="Gaya Video" name="gayaVideo" value={formData.gayaVideo} onChange={handleChange} options={VIDEO_STYLES} />
        <SelectInput label="Suasana Video" name="suasanaVideo" value={formData.suasanaVideo} onChange={handleChange} options={VIDEO_MOODS} />
        <TextInput label="Suara atau Musik" name="suaraMusik" value={formData.suaraMusik} onChange={handleChange} placeholder="Contoh: Musik orkestra epik, suara ombak" />
        <TextInput label="Kalimat yang Diucapkan (jika ada)" name="kalimatDiucapkan" value={formData.kalimatDiucapkan} onChange={handleChange} placeholder="Contoh: 'Ini langkah kecil bagi manusia...'" />
        
        <div className="md:col-span-2">
            <TextAreaInput label="Detail Tambahan" name="detailTambahan" value={formData.detailTambahan} onChange={handleChange} placeholder="Contoh: Dengan efek visual partikel berkilauan, fokus pada ekspresi wajah" rows={3}/>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Menghasilkan...' : 'Hasilkan Prompt'}
          </button>
        </div>
      </form>

      {isLoading && <LoadingSpinner message="Sedang memproses permintaan Anda..." />}
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
