import React from 'react';

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
      <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover select-none transform group-hover:scale-105 transition-transform duration-500"
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
