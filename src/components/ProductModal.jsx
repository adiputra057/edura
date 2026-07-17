import React, { useState, useEffect } from 'react';
import { X, Check, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const [currentIdx, setCurrentIdx] = useState(0);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Autoplay slideshow carousel (every 3.5 seconds)
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

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
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-5xl my-8 animate-scale-up border border-gray-100">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 text-gray-400 hover:text-gray-600 bg-white/80 hover:bg-white backdrop-blur shadow-sm rounded-full transition-colors border border-gray-100"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Product Images Slideshow (Large Layout 7 cols) */}
            <div className="relative lg:col-span-7 bg-white flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[400px] lg:min-h-[520px] group border-r border-gray-100">
              
              {/* Image Frame */}
              <div className="w-full h-full absolute inset-0 bg-white flex items-center justify-center p-4">
                <img
                  src={images[currentIdx]}
                  alt={`${product.title} view ${currentIdx + 1}`}
                  className="w-full h-full object-contain select-none transition-all duration-500 ease-out"
                />
              </div>

              {/* Slider Arrows (Only show if multiple images exist) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-3 rounded-full bg-white/70 hover:bg-white backdrop-blur text-gray-800 shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} className="stroke-[3]" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-3 rounded-full bg-white/70 hover:bg-white backdrop-blur text-gray-800 shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} className="stroke-[3]" />
                  </button>
                </>
              )}

              {/* Navigation Indicators (Dots at bottom) */}
              {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIdx(index);
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentIdx === index 
                          ? 'w-6 bg-primary-500 shadow-sm shadow-primary-300' 
                          : 'w-2.5 bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Content details (Compact Layout 5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between h-full min-h-[400px] lg:min-h-[520px]">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold text-primary-500 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-4 leading-tight" id="modal-title">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary-500 mt-2">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="space-y-5">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features list */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Fitur & Layanan Utama:
                      </p>
                      <ul className="space-y-2.5">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs text-gray-500">
                            <span className="p-1 rounded-full bg-emerald-50 text-emerald-500 flex-shrink-0 mt-0.5">
                              <Check size={12} className="stroke-[3]" />
                            </span>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action area */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col gap-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center gap-2 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <MessageSquare size={16} />
                  Hubungi Kami di WhatsApp
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full text-center text-xs font-medium text-gray-400 hover:text-gray-600 py-2 transition-colors"
                >
                  Kembali
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
