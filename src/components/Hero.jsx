import React from 'react';
import heroMockup from '../assets/hero_mockup.png';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ scrollToSection }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-transparent">
      {/* Decorative background glow circles */}
      <div className="absolute top-20 left-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[30rem] h-[30rem] rounded-full bg-indigo-100/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 md:space-y-8 z-10">
            {/* Small pill banner */}
            <div data-aos="fade-down" data-aos-duration="600" className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide animate-pulse">
              <Sparkles size={14} className="text-primary-500" />
              <span>Digital Agency Terpercaya</span>
            </div>
            
            <h1 data-aos="fade-right" data-aos-delay="100" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Transformasi Bisnis Anda Melalui <span className="text-primary-500 relative">Ekselerasi Digital.</span>
            </h1>
            
            <p data-aos="fade-right" data-aos-delay="200" className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              Kami membangun solusi teknologi yang elegan, fungsional, dan siap membantu Anda berkembang di era digital.
            </p>
            
            <div data-aos="fade-right" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Mulai Sekarang
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => scrollToSection('products')}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl shadow-sm hover:shadow transition-all duration-300"
              >
                Lihat Produk Kami
              </button>
            </div>
          </div>
          
          {/* Hero Right Media Mockup */}
          <div data-aos="fade-left" data-aos-delay="200" className="lg:col-span-6 flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl transform hover:scale-[1.01] transition-transform duration-500">
              
              {/* Browser Window Mockup Frame wrapper */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-3">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-50 bg-gray-50/50 rounded-t-xl">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 bg-white border border-gray-100 text-[10px] text-gray-400 py-1 px-4 rounded text-center truncate max-w-xs mx-auto">
                    https://edura.vercel.app
                  </div>
                </div>
                {/* Image Canvas */}
                <div className="relative aspect-[4/3] bg-gray-100 rounded-b-xl overflow-hidden group">
                  <img
                    src={heroMockup}
                    alt="EDURA Platform Mockup"
                    className="w-full h-full object-cover select-none"
                  />
                  {/* Glass overlay grid */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
