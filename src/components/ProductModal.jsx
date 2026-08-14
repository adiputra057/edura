import React, { useState, useEffect } from 'react';
import { X, Check, MessageSquare, ChevronLeft, ChevronRight, Package } from 'lucide-react';

const TECH_MAP = {
  React: {
    name: 'React',
    color: 'bg-cyan-50/70 text-cyan-600 border-cyan-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-cyan-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z"/>
        <path d="M12 2c9 0 9 20 0 20s-9-20 0-20Z"/>
        <path d="M2 12c0-9 20-9 20 0s-20 9-20 0Z"/>
      </svg>
    )
  },
  Laravel: {
    name: 'Laravel',
    color: 'bg-red-50/70 text-red-600 border-red-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m8 3 4 8 5-5 5 15H2L8 3Z"/>
      </svg>
    )
  },
  PHP: {
    name: 'PHP',
    color: 'bg-indigo-50/70 text-indigo-600 border-indigo-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  MySQL: {
    name: 'MySQL',
    color: 'bg-blue-50/70 text-blue-600 border-blue-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
        <path d="M3 12a9 3 0 0 0 18 0"/>
      </svg>
    )
  },
  Tailwind: {
    name: 'Tailwind',
    color: 'bg-teal-50/70 text-teal-600 border-teal-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  Bootstrap: {
    name: 'Bootstrap',
    color: 'bg-purple-50/70 text-purple-600 border-purple-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="2" y="2" width="20" height="20" rx="4"/>
        <path d="M10 8h3a2 2 0 0 1 0 4h-3V8zm0 4h4a2 2 0 0 1 0 4h-4v-4z"/>
      </svg>
    )
  },
  JS: {
    name: 'JS',
    color: 'bg-amber-50/70 text-amber-700 border-amber-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M16 18H8V6h8M12 12H8"/>
      </svg>
    )
  },
  Vite: {
    name: 'Vite',
    color: 'bg-yellow-50/70 text-yellow-700 border-yellow-100/80',
    icon: (
      <svg className="w-3 h-3 mr-1 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
      </svg>
    )
  }
};

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Autoplay slideshow carousel (every 3.5 seconds)
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value).replace(/\s/g, ' ');
  };

  const handleWhatsAppClick = () => {
    const message = `Halo EDURA, saya tertarik dengan layanan *${product.title}* (${formatPrice(product.price)}). Bisa tolong jelaskan detail pengerjaannya?`;
    const waUrl = `https://wa.me/6281999834034?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal contents wrapper */}
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-2xl sm:rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-5xl my-4 sm:my-8 animate-scale-up border border-gray-100 max-h-[90vh] overflow-y-auto no-scrollbar">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 p-2 sm:p-2.5 text-gray-400 hover:text-gray-600 bg-white/80 hover:bg-white backdrop-blur shadow-sm rounded-full transition-colors border border-gray-100"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col w-full">
            
            {/* Top: Product Images Slideshow */}
            <div className="relative w-full bg-slate-900/5 flex items-center justify-center overflow-hidden h-[240px] sm:h-[360px] md:h-[450px] group border-b border-gray-100 flex-shrink-0">
              
              {/* Image Frame */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="w-full h-full absolute inset-0 bg-gray-50/50 flex items-center justify-center p-3 sm:p-5 cursor-zoom-in group/zoom"
              >
                <img
                  src={images[currentIdx]}
                  alt={`${product.title} view ${currentIdx + 1}`}
                  className="w-full h-full object-contain select-none transition-all duration-500 ease-out group-hover/zoom:scale-[1.02]"
                />
                <div className="absolute bottom-3 right-3 bg-gray-900/70 backdrop-blur text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover/zoom:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 shadow-lg">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  Klik untuk Perbesar Gambar
                </div>
              </div>

              {/* Slider Arrows (Only show if multiple images exist) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white backdrop-blur text-gray-800 shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5 stroke-[3]" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:left-auto sm:right-4 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white backdrop-blur text-gray-800 shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} className="sm:w-5 sm:h-5 stroke-[3]" />
                  </button>
                </>
              )}

              {/* Navigation Indicators (Dots at bottom) */}
              {images.length > 1 && (
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIdx(index);
                      }}
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                        currentIdx === index 
                          ? 'w-5 sm:w-6 bg-primary-500 shadow-sm shadow-primary-300' 
                          : 'w-2 sm:w-2.5 bg-gray-400/60 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom: All Content details below image */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col space-y-6 text-left">
              
              {/* Header Title & Price */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] sm:text-xs font-extrabold text-primary-500 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight" id="modal-title">
                    {product.title}
                  </h3>
                </div>
                <div className="sm:text-right flex-shrink-0">
                  <span className="text-xs text-gray-400 font-semibold block">Harga Layanan</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary-500">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
              
              {/* Technology Stack Badges */}
              {product.techStack && product.techStack.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Teknologi Yang Digunakan:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map((tech) => {
                      const info = TECH_MAP[tech] || {
                        name: tech,
                        color: 'bg-gray-50 text-gray-600 border-gray-100',
                        icon: (
                          <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="16 18 22 12 16 6"/>
                            <polyline points="8 6 2 12 8 18"/>
                          </svg>
                        )
                      };
                      return (
                        <span
                          key={tech}
                          className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-xl border ${info.color}`}
                        >
                          {info.icon}
                          {info.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Features list */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Fitur & Layanan Utama:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 bg-gray-50/70 border border-gray-100 p-2.5 rounded-xl">
                        <span className="p-1 rounded-full bg-emerald-50 text-emerald-500 flex-shrink-0 mt-0.5">
                          <Check size={12} className="stroke-[3]" />
                        </span>
                        <span className="leading-relaxed font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables - Yang Anda Dapatkan */}
              {product.deliverables && product.deliverables.length > 0 && (
                <div className="space-y-3 bg-gradient-to-br from-amber-50/80 to-orange-50/60 border border-amber-100/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-100/80 text-amber-600">
                      <Package size={16} className="stroke-[2.5]" />
                    </span>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Yang Anda Dapatkan:
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <span className="p-1 rounded-full bg-amber-100 text-amber-600 flex-shrink-0 mt-0.5">
                          <Check size={10} className="stroke-[3]" />
                        </span>
                        <span className="leading-relaxed font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action area */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <MessageSquare size={18} />
                  Hubungi Kami di WhatsApp
                </button>
                
                <button
                  onClick={onClose}
                  className="sm:w-auto px-6 py-4 text-center text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Kembali
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-10 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Tutup pratinjau"
          >
            <X size={24} />
          </button>

          <img
            src={images[currentIdx]}
            alt={`${product.title} full view`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev(e);
                }}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext(e);
                }}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
