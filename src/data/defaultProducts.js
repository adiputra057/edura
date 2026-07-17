import ecommerceImg from '../assets/product_ecommerce.png';
import saasImg from '../assets/product_saas.png';
import identityImg from '../assets/product_identity.png';

export const defaultProducts = [
  {
    id: 'prod-1',
    title: 'E-Commerce Core',
    price: 4999000,
    category: 'Web Design & E-Commerce',
    image: ecommerceImg,
    images: [ecommerceImg, saasImg, identityImg],
    description: 'Platform toko online lengkap dengan manajemen inventaris dan sistem pembayaran terintegrasi.',
    features: [
      'Desain modern & responsif (mobile friendly)',
      'Manajemen produk & inventaris',
      'Integrasi Payment Gateway',
      'Halaman checkout aman',
      'Halaman dashboard admin',
      'Dukungan teknis 3 bulan'
    ]
  },
  {
    id: 'prod-2',
    title: 'SaaS Dashboard',
    price: 7500000,
    category: 'App Development & Analytics',
    image: saasImg,
    images: [saasImg, ecommerceImg, identityImg],
    description: 'Dashboard analitik bisnis real-time untuk memantau performa operasional harian Anda.',
    features: [
      'Visualisasi data real-time dengan grafik interaktif',
      'Manajemen pengguna & hak akses',
      'Integrasi API pihak ketiga',
      'Ekspor laporan (PDF/Excel)',
      'Keamanan tingkat tinggi & enkripsi data',
      'Dukungan teknis 6 bulan'
    ]
  },
  {
    id: 'prod-3',
    title: 'Identity Suite',
    price: 3200000,
    category: 'Branding & Design System',
    image: identityImg,
    images: [identityImg, ecommerceImg, saasImg],
    description: 'Paket desain identitas digital yang memastikan brand Anda tampil konsisten di semua platform.',
    features: [
      'Desain logo utama & sekunder',
      'Panduan gaya brand (Brand Guidelines)',
      'Palet warna & sistem tipografi',
      'Aset media sosial & template desain',
      'Desain kartu nama & kop surat',
      'File master resolusi tinggi (SVG/AI/Figma)'
    ]
  }
];
