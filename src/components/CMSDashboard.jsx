import React, { useState } from 'react';
import { Plus, Edit2, Trash2, RotateCcw, Search, X, Check, Eye } from 'lucide-react';

export default function CMSDashboard({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onResetProducts, setView, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (uploadedImages.length + files.length > 3) {
      alert('Maksimal hanya boleh mengunggah 3 gambar!');
      return;
    }

    const loaders = files.map((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" melebihi batas ukuran 5MB!`);
        return null;
      }

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 600;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
            resolve(compressedDataUrl);
          };
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(loaders).then((results) => {
      const validResults = results.filter(r => r !== null);
      setUploadedImages((prev) => [...prev, ...validResults]);
    });
  };

  const removeUploadedImage = (indexToRemove) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setTitle('');
    setCategory('Web Design & Development');
    setPrice('');
    setDescription('');
    setUploadedImages([]);
    setFeatures('Desain modern & responsif\nFitur SEO Friendly\nIntegrasi Chat WA');
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setCategory(product.category);
    setPrice(product.price);
    setDescription(product.description);
    setUploadedImages(product.images || [product.image]);
    setFeatures(product.features ? product.features.join('\n') : '');
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !price || !description || !category) {
      alert('Semua kolom wajib diisi!');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Harga harus berupa angka positif!');
      return;
    }

    if (uploadedImages.length === 0) {
      alert('Silakan unggah minimal 1 gambar!');
      return;
    }

    const finalImage = uploadedImages[0];
    const finalImages = uploadedImages;

    const featuresList = features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const productPayload = {
      title,
      category,
      price: priceNum,
      description,
      image: finalImage,
      images: finalImages,
      features: featuresList
    };

    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...productPayload });
    } else {
      onAddProduct({
        id: `prod-${Date.now()}`,
        ...productPayload
      });
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      onDeleteProduct(id);
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value).replace(/\s/g, ' ');
  };

  // Filter products by search query
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">CMS Kelola Produk</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola portofolio produk/layanan yang ditampilkan di halaman utama.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onResetProducts}
              className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
              title="Reset ke produk awal bawaan"
            >
              <RotateCcw size={16} />
              Reset Produk
            </button>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow hover:shadow-md transition-all duration-300"
            >
              <Plus size={18} />
              Tambah Produk
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
              title="Keluar dari portal admin"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* Dashboard Controls (Search) */}
        <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari produk berdasarkan nama atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={() => setView('portfolio')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary-500 hover:text-primary-600 px-4 py-2 bg-primary-50 rounded-xl"
          >
            <Eye size={14} />
            Lihat di Halaman Utama
          </button>
        </div>

        {/* Products Table Card */}
        <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Info Produk</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Kategori</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Harga</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0 border border-gray-100"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate max-w-xs">{product.title}</p>
                            <p className="text-xs text-gray-500 truncate max-w-sm">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => openEditForm(product)}
                            className="p-2 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            title="Edit Produk"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Hapus Produk"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-16 text-gray-400">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* CRUD Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="form-modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsFormOpen(false)} />

          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 text-center">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl my-8 p-8 animate-scale-up">
              
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-6" id="form-modal-title">
                {editingProduct ? 'Edit Layanan / Produk' : 'Tambah Layanan Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Product Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Layanan</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Aplikasi POS Kasir"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Category & Price Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kategori</label>
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Contoh: Web Design & Development"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Harga (Rupiah)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Contoh: 5000000"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Image Selection Type - Upload Only */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Unggah Gambar Layanan (Maks 3)</label>
                  <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500">
                        Gambar Terunggah ({uploadedImages.length}/3)
                      </span>
                      {uploadedImages.length < 3 && (
                        <label className="text-xs font-bold text-primary-500 hover:text-primary-600 cursor-pointer select-none">
                          + Tambah Gambar
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {uploadedImages.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3">
                        {uploadedImages.map((imgSrc, idx) => (
                          <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-gray-200 bg-white shadow-sm">
                            <img src={imgSrc} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeUploadedImage(idx)}
                              className="absolute top-1.5 right-1.5 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition opacity-0 group-hover:opacity-100 shadow-md"
                            >
                              <X size={12} className="stroke-[3]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg text-xs text-gray-400">
                        Belum ada file diunggah. Klik "+ Tambah Gambar" (Maks 3, ukuran maks 5MB per file).
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Deskripsi Layanan</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan secara singkat apa produk/layanan ini..."
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Features list */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Fitur Unggulan (Satu Fitur Per Baris)
                  </label>
                  <textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="Contoh:&#10;Desain premium&#10;Dukungan selamanya&#10;Gratis Domain"
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Submit / Cancel Actions */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-md transition"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
