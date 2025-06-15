
import { SelectOption } from './types';

export const GEMINI_API_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_API_MODEL_VISION = 'gemini-2.5-flash-preview-04-17'; // Vision model for image analysis

export const AGES: SelectOption[] = Array.from({ length: 16 }, (_, i) => ({
  value: (20 + i).toString(),
  label: `${20 + i} Tahun`,
}));

export const COUNTRIES: SelectOption[] = [
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Amerika Serikat', label: 'Amerika Serikat' },
  { value: 'Jepang', label: 'Jepang' },
  { value: 'Korea Selatan', label: 'Korea Selatan' },
  { value: 'Inggris', label: 'Inggris' },
  { value: 'Prancis', label: 'Prancis' },
  { value: 'Jerman', label: 'Jerman' },
  { value: 'Kanada', label: 'Kanada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'India', label: 'India' },
  { value: 'Brasil', label: 'Brasil' },
  { value: 'Tiongkok', label: 'Tiongkok' },
  // Add more countries as needed
];

export const TIMES_OF_DAY: SelectOption[] = [
  { value: 'Pagi Hari (Sunrise)', label: 'Pagi Hari (Sunrise)' },
  { value: 'Siang Hari (Terik)', label: 'Siang Hari (Terik)' },
  { value: 'Sore Hari (Golden Hour)', label: 'Sore Hari (Golden Hour)' },
  { value: 'Senja (Twilight/Blue Hour)', label: 'Senja (Twilight/Blue Hour)' },
  { value: 'Malam Hari', label: 'Malam Hari' },
  { value: 'Dini Hari', label: 'Dini Hari' },
];

export const CAMERA_MOVEMENTS: SelectOption[] = [
  { value: 'Static (Statis)', label: 'Static (Statis)' },
  { value: 'Zoom In (Perbesar)', label: 'Zoom In (Perbesar)' },
  { value: 'Zoom Out (Perkecil)', label: 'Zoom Out (Perkecil)' },
  { value: 'Pan Left (Geser Kiri)', label: 'Pan Left (Geser Kiri)' },
  { value: 'Pan Right (Geser Kanan)', label: 'Pan Right (Geser Kanan)' },
  { value: 'Tilt Up (Dongak ke Atas)', label: 'Tilt Up (Dongak ke Atas)' },
  { value: 'Tilt Down (Tunduk ke Bawah)', label: 'Tilt Down (Tunduk ke Bawah)' },
  { value: 'Crane Up (Derek Naik)', label: 'Crane Up (Derek Naik)' },
  { value: 'Crane Down (Derek Turun)', label: 'Crane Down (Derek Turun)' },
  { value: 'Dolly In (Maju Mendekat)', label: 'Dolly In (Maju Mendekat)' },
  { value: 'Dolly Out (Mundur Menjauh)', label: 'Dolly Out (Mundur Menjauh)' },
  { value: 'Track Left (Ikuti ke Kiri)', label: 'Track Left (Ikuti ke Kiri)' },
  { value: 'Track Right (Ikuti ke Kanan)', label: 'Track Right (Ikuti ke Kanan)' },
  { value: 'Orbit Left (Mengorbit Kiri)', label: 'Orbit Left (Mengorbit Kiri)' },
  { value: 'Orbit Right (Mengorbit Kanan)', label: 'Orbit Right (Mengorbit Kanan)' },
  { value: 'Rise (Naik Vertikal)', label: 'Rise (Naik Vertikal)' },
  { value: 'Fall (Turun Vertikal)', label: 'Fall (Turun Vertikal)' },
  { value: 'Roll Left (Putar Kiri)', label: 'Roll Left (Putar Kiri)' },
  { value: 'Roll Right (Putar Kanan)', label: 'Roll Right (Putar Kanan)' },
  { value: 'Dutch Angle Left (Sudut Miring Kiri)', label: 'Dutch Angle Left (Sudut Miring Kiri)' },
  { value: 'Dutch Angle Right (Sudut Miring Kanan)', label: 'Dutch Angle Right (Sudut Miring Kanan)' },
  { value: 'Shake (Goyangan)', label: 'Shake (Goyangan)' },
  { value: 'Handheld (Genggam Tangan)', label: 'Handheld (Genggam Tangan)' },
  { value: 'Drone Flyover (Terbang Drone Melintas)', label: 'Drone Flyover (Terbang Drone Melintas)' },
  { value: 'First Person View (Sudut Pandang Orang Pertama)', label: 'First Person View (Sudut Pandang Orang Pertama)' },
  { value: 'Reverse Shot (Rekaman Terbalik)', label: 'Reverse Shot (Rekaman Terbalik)' },
  { value: 'Slow Motion (Gerak Lambat)', label: 'Slow Motion (Gerak Lambat)' },
  { value: 'Time Lapse (Selang Waktu)', label: 'Time Lapse (Selang Waktu)' },
  { value: 'Hyperlapse (Hiperlaps)', label: 'Hyperlapse (Hiperlaps)' },
  { value: 'Low Angle Shot (Sudut Rendah)', label: 'Low Angle Shot (Sudut Rendah)' },
  { value: 'High Angle Shot (Sudut Tinggi)', label: 'High Angle Shot (Sudut Tinggi)' },
  { value: 'Worms Eye View (Pandangan Mata Cacing)', label: "Worm's Eye View (Pandangan Mata Cacing)" },
  { value: 'Birds Eye View (Pandangan Mata Burung)', label: "Bird's Eye View (Pandangan Mata Burung)" },
  { value: 'Overhead Shot (Rekaman dari Atas)', label: 'Overhead Shot (Rekaman dari Atas)' },
  { value: 'Close Up (Dekat)', label: 'Close Up (Dekat)' },
  { value: 'Extreme Close Up (Sangat Dekat)', label: 'Extreme Close Up (Sangat Dekat)' },
  { value: 'Medium Shot (Setengah Badan)', label: 'Medium Shot (Setengah Badan)' },
  { value: 'Long Shot (Jarak Jauh)', label: 'Long Shot (Jarak Jauh)' },
  { value: 'Full Shot (Seluruh Badan)', label: 'Full Shot (Seluruh Badan)' },
  { value: 'Establishing Shot (Rekaman Pembuka)', label: 'Establishing Shot (Rekaman Pembuka)' },
  { value: 'Point of View (POV) (Sudut Pandang Subjek)', label: 'Point of View (POV) (Sudut Pandang Subjek)' },
  { value: 'Follow Shot (Ikuti Subjek)', label: 'Follow Shot (Ikuti Subjek)' },
  { value: 'Steadicam (Steadicam)', label: 'Steadicam (Steadicam)' },
  { value: 'Vertigo Effect (Dolly Zoom) (Efek Vertigo)', label: 'Vertigo Effect (Dolly Zoom) (Efek Vertigo)' },
  { value: '3D Rotation (Rotasi 3D)', label: '3D Rotation (Rotasi 3D)' },
];

export const LIGHTING_CONDITIONS: SelectOption[] = [
  { value: 'Natural Light (Cahaya Alami)', label: 'Natural Light (Cahaya Alami)' },
  { value: 'Studio Lighting (Pencahayaan Studio)', label: 'Studio Lighting (Pencahayaan Studio)' },
  { value: 'Cinematic Lighting (Pencahayaan Sinematik)', label: 'Cinematic Lighting (Pencahayaan Sinematik)' },
  { value: 'Low Key Lighting (Pencahayaan Gelap)', label: 'Low Key Lighting (Pencahayaan Gelap)' },
  { value: 'High Key Lighting (Pencahayaan Terang)', label: 'High Key Lighting (Pencahayaan Terang)' },
  { value: 'Rim Lighting (Cahaya Tepi)', label: 'Rim Lighting (Cahaya Tepi)' },
  { value: 'Backlight (Cahaya Belakang)', label: 'Backlight (Cahaya Belakang)' },
  { value: 'Soft Light (Cahaya Lembut)', label: 'Soft Light (Cahaya Lembut)' },
  { value: 'Hard Light (Cahaya Keras)', label: 'Hard Light (Cahaya Keras)' },
  { value: 'Volumetric Lighting (Pencahayaan Volumetrik)', label: 'Volumetric Lighting (Pencahayaan Volumetrik)' },
  { value: 'Neon Lights (Lampu Neon)', label: 'Neon Lights (Lampu Neon)' },
  { value: 'Candlelight (Cahaya Lilin)', label: 'Candlelight (Cahaya Lilin)' },
  { value: 'Moonlight (Cahaya Bulan)', label: 'Moonlight (Cahaya Bulan)' },
];

export const VIDEO_STYLES: SelectOption[] = [
  { value: 'Cinematic (Sinematik)', label: 'Cinematic (Sinematik)' },
  { value: 'Documentary (Dokumenter)', label: 'Documentary (Dokumenter)' },
  { value: 'Vlog Style (Gaya Vlog)', label: 'Vlog Style (Gaya Vlog)' },
  { value: 'Music Video (Video Musik)', label: 'Music Video (Video Musik)' },
  { value: 'Animated (Animasi)', label: 'Animated (Animasi)' },
  { value: 'Vintage Film (Film Antik)', label: 'Vintage Film (Film Antik)' },
  { value: 'Sci-Fi (Fiksi Ilmiah)', label: 'Sci-Fi (Fiksi Ilmiah)' },
  { value: 'Fantasy (Fantasi)', label: 'Fantasy (Fantasi)' },
  { value: 'Horror (Horor)', label: 'Horror (Horor)' },
  { value: 'Action (Aksi)', label: 'Action (Aksi)' },
  { value: 'Commercial (Iklan)', label: 'Commercial (Iklan)' },
  { value: 'Time-lapse (Selang Waktu)', label: 'Time-lapse (Selang Waktu)' },
  { value: 'Slow Motion (Gerak Lambat)', label: 'Slow Motion (Gerak Lambat)' },
];

export const VIDEO_MOODS: SelectOption[] = [
  { value: 'Happy (Bahagia)', label: 'Happy (Bahagia)' },
  { value: 'Sad (Sedih)', label: 'Sad (Sedih)' },
  { value: 'Tense (Tegang)', label: 'Tense (Tegang)' },
  { value: 'Mysterious (Misterius)', label: 'Mysterious (Misterius)' },
  { value: 'Energetic (Energik)', label: 'Energetic (Energik)' },
  { value: 'Calm (Tenang)', label: 'Calm (Tenang)' },
  { value: 'Romantic (Romantis)', label: 'Romantic (Romantis)' },
  { value: 'Suspenseful (Mencekam)', label: 'Suspenseful (Mencekam)' },
  { value: 'Epic (Epik)', label: 'Epic (Epik)' },
  { value: 'Dreamy (Melamun)', label: 'Dreamy (Melamun)' },
  { value: 'Nostalgic (Nostalgia)', label: 'Nostalgic (Nostalgia)' },
  { value: 'Futuristic (Futuristik)', label: 'Futuristic (Futuristik)' },
];

export const SHOT_TYPES: SelectOption[] = [
  { value: 'Extreme Close Up (Sangat Dekat)', label: 'Extreme Close Up (Sangat Dekat)' },
  { value: 'Close Up (Dekat)', label: 'Close Up (Dekat)' },
  { value: 'Medium Shot (Setengah Badan)', label: 'Medium Shot (Setengah Badan)' },
  { value: 'Full Shot (Seluruh Badan)', label: 'Full Shot (Seluruh Badan)' },
  { value: 'Long Shot (Jarak Jauh)', label: 'Long Shot (Jarak Jauh)' },
  { value: 'Extreme Long Shot (Sangat Jauh)', label: 'Extreme Long Shot (Sangat Jauh)' },
  { value: 'Establishing Shot (Rekaman Pembuka)', label: 'Establishing Shot (Rekaman Pembuka)' },
  { value: 'Point of View (POV) (Sudut Pandang)', label: 'Point of View (POV) (Sudut Pandang)' },
  { value: 'Over the Shoulder Shot (Dari Atas Bahu)', label: 'Over the Shoulder Shot (Dari Atas Bahu)' },
  { value: 'Low Angle (Sudut Rendah)', label: 'Low Angle (Sudut Rendah)' },
  { value: 'High Angle (Sudut Tinggi)', label: 'High Angle (Sudut Tinggi)' },
  { value: 'Birds Eye View (Pandangan Mata Burung)', label: "Bird's Eye View (Pandangan Mata Burung)" },
  { value: 'Worms Eye View (Pandangan Mata Cacing)', label: "Worm's Eye View (Pandangan Mata Cacing)" },
];

export const ASPECT_RATIOS: SelectOption[] = [
  { value: '1:1 (Square)', label: '1:1 (Persegi)' },
  { value: '16:9 (Widescreen)', label: '16:9 (Layar Lebar)' },
  { value: '9:16 (Vertical)', label: '9:16 (Vertikal)' },
];

export const IMAGE_STYLES: SelectOption[] = [
  { value: 'Photography (Fotografi)', label: 'Photography (Fotografi)' },
  { value: 'Realistic (Realistis)', label: 'Realistic (Realistis)' },
  { value: 'Hyperrealistic (Hiperrealistis)', label: 'Hyperrealistic (Hiperrealistis)' },
  { value: 'Cinematic (Sinematik)', label: 'Cinematic (Sinematik)' },
  { value: '3D Render (Render 3D)', label: '3D Render (Render 3D)' },
  { value: 'Anime Style (Gaya Anime)', label: 'Anime Style (Gaya Anime)' },
  { value: 'Cartoon Style (Gaya Kartun)', label: 'Cartoon Style (Gaya Kartun)' },
  { value: 'Illustration (Ilustrasi)', label: 'Illustration (Ilustrasi)' },
  { value: 'Digital Painting (Lukisan Digital)', label: 'Digital Painting (Lukisan Digital)' },
  { value: 'Oil Painting (Lukisan Cat Minyak)', label: 'Oil Painting (Lukisan Cat Minyak)' },
  { value: 'Watercolor (Cat Air)', label: 'Watercolor (Cat Air)' },
  { value: 'Abstract (Abstrak)', label: 'Abstract (Abstrak)' },
  { value: 'Surreal (Surealis)', label: 'Surreal (Surealis)' },
  { value: 'Fantasy Art (Seni Fantasi)', label: 'Fantasy Art (Seni Fantasi)' },
  { value: 'Sci-Fi Art (Seni Fiksi Ilmiah)', label: 'Sci-Fi Art (Seni Fiksi Ilmiah)' },
  { value: 'Concept Art (Seni Konsep)', label: 'Concept Art (Seni Konsep)' },
  { value: 'Pixel Art (Seni Piksel)', label: 'Pixel Art (Seni Piksel)' },
  { value: 'Low Poly (Poli Rendah)', label: 'Low Poly (Poli Rendah)' },
  { value: 'Steampunk (Steampunk)', label: 'Steampunk (Steampunk)' },
  { value: 'Cyberpunk (Cyberpunk)', label: 'Cyberpunk (Cyberpunk)' },
  { value: 'Vintage Photo (Foto Antik)', label: 'Vintage Photo (Foto Antik)' },
  { value: 'Film Noir (Film Noir)', label: 'Film Noir (Film Noir)' },
  { value: 'Sketch (Sketsa)', label: 'Sketch (Sketsa)' },
  { value: 'Line Art (Seni Garis)', label: 'Line Art (Seni Garis)' },
  { value: 'Graffiti (Grafiti)', label: 'Graffiti (Grafiti)' },
  // Photographic Styles
  { value: 'Portrait Photography (Fotografi Potret)', label: 'Portrait Photography (Fotografi Potret)' },
  { value: 'Landscape Photography (Fotografi Lanskap)', label: 'Landscape Photography (Fotografi Lanskap)' },
  { value: 'Street Photography (Fotografi Jalanan)', label: 'Street Photography (Fotografi Jalanan)' },
  { value: 'Macro Photography (Fotografi Makro)', label: 'Macro Photography (Fotografi Makro)' },
  { value: 'Wildlife Photography (Fotografi Satwa Liar)', label: 'Wildlife Photography (Fotografi Satwa Liar)' },
  { value: 'Black and White Photography (Fotografi Hitam Putih)', label: 'Black and White Photography (Fotografi Hitam Putih)' },
  { value: 'HDR (High Dynamic Range) Photography (Fotografi HDR)', label: 'HDR Photography (Fotografi HDR)' },
  { value: 'Long Exposure Photography (Fotografi Eksposur Panjang)', label: 'Long Exposure Photography (Fotografi Eksposur Panjang)' },
  { value: 'Bokeh Photography (Fotografi Bokeh)', label: 'Bokeh Photography (Fotografi Bokeh)' },
  { value: 'Fashion Photography (Fotografi Mode)', label: 'Fashion Photography (Fotografi Mode)' },
  { value: 'Architectural Photography (Fotografi Arsitektur)', label: 'Architectural Photography (Fotografi Arsitektur)' },
  { value: 'Astrophotography (Astrophotografi)', label: 'Astrophotography (Astrophotografi)' },
  { value: 'Food Photography (Fotografi Makanan)', label: 'Food Photography (Fotografi Makanan)' },
  { value: 'Golden Hour Photography (Fotografi Jam Emas)', label: 'Golden Hour Photography (Fotografi Jam Emas)' },
  { value: 'Blue Hour Photography (Fotografi Jam Biru)', label: 'Blue Hour Photography (Fotografi Jam Biru)' },
  { value: 'Studio Photography (Fotografi Studio)', label: 'Studio Photography (Fotografi Studio)' },
];

export const IMAGE_MOODS: SelectOption[] = [
  { value: 'Joyful (Gembira)', label: 'Joyful (Gembira)' },
  { value: 'Melancholic (Melankolis)', label: 'Melancholic (Melankolis)' },
  { value: 'Dramatic (Dramatis)', label: 'Dramatic (Dramatis)' },
  { value: 'Serene (Tenang)', label: 'Serene (Tenang)' },
  { value: 'Mysterious (Misterius)', label: 'Mysterious (Misterius)' },
  { value: 'Whimsical (Aneh/Unik)', label: 'Whimsical (Aneh/Unik)' },
  { value: 'Dark (Gelap)', label: 'Dark (Gelap)' },
  { value: 'Bright (Cerah)', label: 'Bright (Cerah)' },
  { value: 'Romantic (Romantis)', label: 'Romantic (Romantis)' },
  { value: 'Nostalgic (Nostalgia)', label: 'Nostalgic (Nostalgia)' },
  { value: 'Powerful (Kuat)', label: 'Powerful (Kuat)' },
  { value: 'Peaceful (Damai)', label: 'Peaceful (Damai)' },
  { value: 'Ominous (Mengancam)', label: 'Ominous (Mengancam)' },
];

export const MAX_FILE_SIZE_MB = 30;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    