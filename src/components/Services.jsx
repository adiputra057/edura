import React from 'react';
import { Monitor, Smartphone, TrendingUp, ShieldCheck, HeartHandshake, Code } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Monitor className="w-6 h-6 text-primary-500" />,
      title: 'Web Design',
      desc: 'Desain antarmuka yang modern dan responsif untuk pengalaman pengguna yang tak terlupakan.',
      bg: 'bg-blue-50/50',
      border: 'hover:border-blue-200'
    },
    {
      icon: <Code className="w-6 h-6 text-indigo-500" />,
      title: 'Web Development',
      desc: 'Pengembangan website kustom dengan teknologi modern, performa tinggi, dan skalabilitas terbaik.',
      bg: 'bg-indigo-50/50',
      border: 'hover:border-indigo-200'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-violet-500" />,
      title: 'SEO Optimasi',
      desc: 'Tingkatkan visibilitas brand Anda di mesin pencari dengan strategi SEO yang tepat sasaran.',
      bg: 'bg-violet-50/50',
      border: 'hover:border-violet-200'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50/40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* About Intro Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 md:mb-24">
          <div data-aos="fade-right" className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">Tentang EDURA</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Partner Terpercaya untuk Pertumbuhan Digital Anda
            </h2>
          </div>
          <div data-aos="fade-left" data-aos-delay="150" className="lg:col-span-7">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              EDURA didirikan dengan visi untuk memberdayakan bisnis dari berbagai skala agar dapat mengoptimalkan potensi penuh mereka di ruang digital. Kami menggabungkan keahlian kreatif, wawasan strategis, dan keunggulan teknis untuk memberikan solusi yang menghasilkan dampak nyata bagi bisnis Anda.
            </p>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className={`glass-card p-8 rounded-2xl border border-gray-100 flex flex-col items-start text-left space-y-5 group cursor-pointer ${item.border}`}
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-xl ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
