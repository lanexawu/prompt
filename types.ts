
export interface Veo3FormData {
  subjek: string;
  usia: string;
  rambut: string;
  negaraAsal: string;
  pakaian: string;
  aksi: string;
  ekspresi: string;
  tempat: string;
  waktu: string;
  gerakanKamera: string;
  pencahayaan: string;
  gayaVideo: string;
  suasanaVideo: string;
  suaraMusik: string;
  kalimatDiucapkan: string;
  detailTambahan: string;
}

export interface ImagePromptFormData {
  subjek: string;
  rambut: string;
  usia: string;
  pakaian: string;
  negaraAsal: string;
  aksi: string;
  ekspresi: string;
  tempat: string;
  waktu: string;
  pengambilanGambar: string;
  aspekRasio: string;
  pencahayaan: string;
  gayaGambar: string;
  suasanaGambar: string;
  detailTambahan: string;
}

export interface GeneratedPrompts {
  indonesian: string;
  english: string;
}

export enum Tab {
  Veo3 = 'Veo3',
  ImageToPrompt = 'ImageToPrompt',
  PromptToImage = 'PromptToImage',
}

export interface SelectOption {
  value: string;
  label: string;
}
    