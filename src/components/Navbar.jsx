import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, User } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar({ currentView, setView, activeSection, scrollToSection, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Tentang', id: 'about' },
    { name: 'Produk', id: 'products' },
    { name: 'Kontak', id: 'contact' }
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    if (currentView !== 'portfolio') {
      setView('portfolio');
      // Delay scrolling slightly to allow view transition
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleLinkClick('home')}>
            <img src={logo} alt="EDURA Logo" className="h-9 w-auto object-contain" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-500 py-2 relative ${
                  currentView === 'portfolio' && activeSection === link.id
                    ? 'text-primary-500 font-semibold'
                    : 'text-gray-500'
                }`}
              >
                {link.name}
                {currentView === 'portfolio' && activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </div>

          {/* Call to Action and Admin Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin && (
              <button
                onClick={() => setView(currentView === 'portfolio' ? 'cms' : 'portfolio')}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-all duration-300 ${
                  currentView === 'cms'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard size={16} />
                {currentView === 'portfolio' ? 'CMS Kelola Produk' : 'Kembali ke Web'}
              </button>
            )}
            
            <button
              onClick={() => handleLinkClick('contact')}
              className="bg-primary-500 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Mulai
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={() => setView(currentView === 'portfolio' ? 'cms' : 'portfolio')}
                className="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 rounded-lg transition-colors"
                title="CMS Kelola Produk"
              >
                <LayoutDashboard size={20} />
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-primary-500 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 animate-slide-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  currentView === 'portfolio' && activeSection === link.id
                    ? 'bg-primary-50 text-primary-500 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2 px-4">
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setView(currentView === 'portfolio' ? 'cms' : 'portfolio');
                  }}
                  className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-sm font-medium border ${
                    currentView === 'cms'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  {currentView === 'portfolio' ? 'CMS Kelola Produk' : 'Kembali ke Web'}
                </button>
              )}
              
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full bg-primary-500 text-white text-center py-3 rounded-lg text-sm font-semibold shadow"
              >
                Mulai
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
