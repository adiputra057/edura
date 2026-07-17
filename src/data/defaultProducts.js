import ecommerceImg from '../assets/product_ecommerce.png';
import saasImg from '../assets/product_saas.png';
import identityImg from '../assets/product_identity.png';
import posImg from '../assets/product_pos.png';
import absensiImg from '../assets/product_absensi.png';

export const defaultProducts = [
  {
    id: 'prod-1',
    title: 'E-Commerce Core',
    price: 4999000,
    category: 'Web Design & E-Commerce',
    image: ecommerceImg,
    images: [ecommerceImg, saasImg, identityImg],
    techStack: ['React', 'Tailwind', 'Laravel', 'MySQL'],
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
    techStack: ['React', 'Tailwind', 'Vite', 'JS'],
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
    techStack: ['Bootstrap', 'Tailwind'],
    description: 'Paket desain identitas digital yang memastikan brand Anda tampil konsisten di semua platform.',
    features: [
      'Desain logo utama & sekunder',
      'Panduan gaya brand (Brand Guidelines)',
      'Palet warna & sistem tipografi',
      'Aset media sosial & template desain',
      'Desain kartu nama & kop surat',
      'File master resolusi tinggi (SVG/AI/Figma)'
    ]
  },
  {
    id: 'prod-4',
    title: 'Sistem POS (Point of Sale) Kasir',
    price: 2499000,
    category: 'Web Development & POS',
    image: posImg,
    images: [posImg, saasImg, ecommerceImg],
    techStack: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JS'],
    description: 'Aplikasi kasir (POS) berbasis web yang responsif, cepat, dan mudah digunakan untuk manajemen stok, penjualan, dan laporan keuangan toko Anda.',
    features: [
      'Multi-outlet & multi-kasir',
      'Manajemen stok barang real-time',
      'Pencetakan struk penjualan (thermal printer)',
      'Laporan penjualan harian, bulanan & tahunan',
      'Grafik analisis keuntungan',
      'Desain responsif untuk PC, Tablet & Mobile'
    ]
  },
  {
    id: 'prod-5',
    title: 'Sistem Absensi Online Karyawan',
    price: 2999000,
    category: 'Web Development & HRIS',
    image: absensiImg,
    images: [absensiImg, saasImg, ecommerceImg],
    techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind', 'JS'],
    description: 'Sistem absensi online berbasis web terintegrasi dengan pelacakan lokasi GPS (Geofencing) dan deteksi wajah untuk keakuratan kehadiran karyawan.',
    features: [
      'Absensi berbasis GPS dengan batas radius (Geofencing)',
      'Deteksi wajah & foto selfie kehadiran',
      'Manajemen izin, sakit, dan cuti karyawan',
      'Rekap absensi otomatis & ekspor Excel',
      'Dashboard admin & panel karyawan',
      'Notifikasi WhatsApp terintegrasi'
    ]
  }
];
