import React from 'react';

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

export default function ProductCard({ product, onOpenModal }) {
  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value).replace(/\s/g, ' ');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      {/* Product Image Container */}
      <div className="relative aspect-[16/9] w-full bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top select-none transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] font-extrabold text-primary-500 uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary-100 shadow-sm">
          {product.category.split('&')[0].trim()}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 md:p-8 flex flex-col flex-1 text-left space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors duration-200">
          {product.title}
        </h3>
        
        <p className="text-base font-bold text-primary-500">
          {formatPrice(product.price)}
        </p>
        
        <p className="text-sm text-gray-500 leading-relaxed flex-1">
          {product.description}
        </p>
        
        {/* Technology Stack Badges */}
        {product.techStack && product.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {product.techStack.map((tech) => {
              const info = TECH_MAP[tech] || {
                name: tech,
                color: 'bg-gray-50 text-gray-600 border-gray-100',
                icon: (
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                )
              };
              return (
                <span
                  key={tech}
                  className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-lg border ${info.color} transition-all duration-300 hover:scale-105`}
                >
                  {info.icon}
                  {info.name}
                </span>
              );
            })}
          </div>
        )}
        
        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={() => onOpenModal(product)}
            className="w-full border border-primary-500 text-primary-500 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-50 transition-all duration-300 text-center"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}
