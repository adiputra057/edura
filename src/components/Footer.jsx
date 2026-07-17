import React, { useState } from 'react';
import { Globe, Mail, Send, Check } from 'lucide-react';

export default function Footer({ onAdminClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Tolong lengkapi formulir kontak!');
      return;
    }
    
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-white border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Contact text */}
            <div data-aos="fade-right" className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">Hubungi Kami</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Mari Mulai Proyek Impian Anda Bersama Kami
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Punya pertanyaan mengenai paket layanan kami atau butuh solusi kustom? Silakan isi formulir di samping, tim kami akan merespons dalam waktu kurang dari 24 jam.
              </p>
              
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <a href="mailto:gedeadiputra14@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors">
                  <div className="p-2.5 bg-gray-50 rounded-lg text-primary-500">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium">gedeadiputra14@gmail.com</span>
                </a>
                <a href="https://edura.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors">
                  <div className="p-2.5 bg-gray-50 rounded-lg text-primary-500">
                    <Globe size={18} />
                  </div>
                  <span className="text-sm font-medium">edura.vercel.app</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div data-aos="fade-left" data-aos-delay="150" className="lg:col-span-7">
              <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-8 md:p-10 shadow-sm text-left">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 animate-scale-up">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center shadow-inner">
                      <Check size={24} className="stroke-[3]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Pesan Terkirim!</h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                      Terima kasih telah menghubungi EDURA. Tim kami akan segera menghubungi Anda kembali.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Masukkan nama Anda"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Alamat Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@email.com"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Pesan Anda</label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Jelaskan kebutuhan proyek atau pertanyaan Anda secara rinci..."
                        rows="5"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Send size={16} />
                      Kirim Pesan
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Footer matching the design mockup */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo and copyright */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <span className="text-xl font-extrabold tracking-tight text-primary-500 font-sans">
                EDURA
              </span>
              <p className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} EDURA. Hak Cipta Dilindungi.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-8 text-xs font-medium text-gray-500">
              <a href="#" className="hover:text-primary-500 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Syarat & Ketentuan</a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="https://edura.vercel.app" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-primary-500 hover:bg-gray-50 rounded-full transition-all">
                <Globe size={18} />
              </a>
              <a href="mailto:gedeadiputra14@gmail.com" className="p-2 text-gray-400 hover:text-primary-500 hover:bg-gray-50 rounded-full transition-all">
                <Mail size={18} />
              </a>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}
