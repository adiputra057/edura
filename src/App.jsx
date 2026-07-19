import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CMSDashboard from './components/CMSDashboard';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import { defaultProducts } from './data/defaultProducts';
import { Layers } from 'lucide-react';
import whatsappIcon from './assets/whatsapp.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const [currentView, setView] = useState(() => {
    return window.location.pathname === '/admin' ? 'login' : 'portfolio';
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Helper to change view and update URL path dynamically
  const changeView = (view) => {
    setView(view);
    if (view === 'login' || view === 'cms') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  // Sync back button / popstate navigation
  useEffect(() => {
    const handlePopState = () => {
      setView(window.location.pathname === '/admin' ? 'login' : 'portfolio');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Refresh AOS elements on layout modifications
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 150);
  }, [products, currentView, showAllProducts]);

  // Load products from localStorage or use defaults
  // Menggunakan versi migrasi agar data default hanya di-reset sekali saat ada update struktur,
  // dan TIDAK mereset ulang setiap kali user menghapus/mengubah produk dari CMS.
  const PRODUCTS_VERSION = '3'; // Naikkan angka ini jika ingin paksa reset data ke default baru

  useEffect(() => {
    const storedVersion = localStorage.getItem('edura_products_version');
    const stored = localStorage.getItem('edura_products');

    // Jika versi belum sama, reset ke default (migrasi data baru)
    if (storedVersion !== PRODUCTS_VERSION) {
      setProducts(defaultProducts);
      localStorage.setItem('edura_products', JSON.stringify(defaultProducts));
      localStorage.setItem('edura_products_version', PRODUCTS_VERSION);
    } else if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProducts(parsed);
      } catch (err) {
        console.error('Error parsing stored products', err);
        setProducts(defaultProducts);
        localStorage.setItem('edura_products', JSON.stringify(defaultProducts));
      }
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('edura_products', JSON.stringify(defaultProducts));
    }
  }, []);

  // Update products state and save to localStorage
  const updateProductsStorage = (updatedList) => {
    setProducts(updatedList);
    localStorage.setItem('edura_products', JSON.stringify(updatedList));
  };

  const handleAddProduct = (newProduct) => {
    const newList = [...products, newProduct];
    updateProductsStorage(newList);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const newList = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    updateProductsStorage(newList);
  };

  const handleDeleteProduct = (id) => {
    const newList = products.filter((p) => p.id !== id);
    updateProductsStorage(newList);
  };

  const handleResetProducts = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset daftar produk kembali ke bawaan awal? Semua produk tambahan Anda akan hilang.')) {
      updateProductsStorage(defaultProducts);
    }
  };

  // Scroll section helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Tracking scroll to highlight navbar links
  useEffect(() => {
    if (currentView !== 'portfolio') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setView={changeView}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isAdmin={isAdmin}
      />

      {/* Main Content Layout */}
      {currentView === 'portfolio' ? (
        <main className="flex-1">
          {/* Hero Landing */}
          <Hero scrollToSection={scrollToSection} />

          {/* About & Services Section */}
          <Services />

          {/* Featured Products Section ("Produk Unggulan") */}
          <section id="products" className="py-20 md:py-28 bg-white border-t border-gray-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              
              {/* Section Header */}
              <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
                <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">
                  Layanan Kami
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Produk Kami
                </h2>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  Pilih paket solusi yang paling sesuai dengan kebutuhan transformasi bisnis Anda.
                </p>
              </div>

              {/* Product Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {(showAllProducts ? products : products.slice(0, 3)).map((product, idx) => (
                  <div 
                    key={product.id} 
                    data-aos="fade-up" 
                    data-aos-delay={(idx % 3) * 150}
                  >
                    <ProductCard
                      product={product}
                      onOpenModal={setSelectedProduct}
                    />
                  </div>
                ))}
              </div>

              {/* View All / Show More Button */}
              <div className="flex justify-center mt-12 md:mt-16">
                <button
                  onClick={() => {
                    if (products.length > 3) {
                      setShowAllProducts(!showAllProducts);
                    } else {
                      scrollToSection('contact');
                    }
                  }}
                  className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  {products.length > 3 && showAllProducts ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua'}
                </button>
              </div>

            </div>
          </section>

          {/* Contact and Footer Form */}
          <Footer onAdminClick={() => changeView(isAdmin ? 'cms' : 'login')} />
        </main>
      ) : currentView === 'login' ? (
        <AdminLogin
          onLogin={() => {
            setIsAdmin(true);
            changeView('cms');
          }}
          onCancel={() => changeView('portfolio')}
        />
      ) : (
        /* CMS Dashboard page */
        <CMSDashboard
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetProducts={handleResetProducts}
          setView={changeView}
          onLogout={() => {
            setIsAdmin(false);
            changeView('portfolio');
          }}
        />
      )}

      {/* Float CMS Toggle Widget for quick admin discovery */}
      {/* Float CMS Toggle Widget for quick admin discovery */}
      {isAdmin && (
        <button
          onClick={() => changeView(currentView === 'portfolio' ? 'cms' : 'portfolio')}
          className={`fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group ${
            currentView === 'cms'
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-white text-primary-500 border border-gray-100 hover:bg-primary-50'
          }`}
          title="Buka CMS Dashboard"
        >
          <Layers size={20} className={currentView === 'cms' ? 'animate-spin' : ''} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-xs font-bold whitespace-nowrap">
            {currentView === 'portfolio' ? 'Buka Admin CMS' : 'Buka Halaman Web'}
          </span>
        </button>
      )}

      {/* Floating WhatsApp Button */}
      {currentView === 'portfolio' && (
        <a
          href={`https://wa.me/6281999834034?text=${encodeURIComponent('Halo EDURA, saya tertarik untuk berkonsultasi mengenai layanan teknologi.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-subtle cursor-pointer hover:shadow-[#25D366]/30 hover:shadow-lg overflow-hidden p-0"
          title="Hubungi Kami di WhatsApp"
        >
          <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full object-cover" />
        </a>
      )}

      {/* Detail Modal Component */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
