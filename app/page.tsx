'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, Product } from '@/data/products';
import { Filter, Sparkles, Layers, Compass, Cpu, Palette } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'decor', label: 'Decoração & Vasos' },
    { id: 'articulados', label: 'Articulados & Brinquedos' },
    { id: 'tecnicos', label: 'Peças Funcionais' },
  ];

  return (
    <div className="space-y-20">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Pillars (Banners) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border relative overflow-hidden group hover:border-brand-orange/50 transition-all">
            <span className="text-[10px] font-bold tracking-widest text-brand-orange uppercase px-2.5 py-1 rounded bg-brand-orange/10 border border-brand-orange/20 inline-block mb-3">
              ALTA PRECISÃO
            </span>
            <h3 className="text-lg font-bold text-white">Geometria Paramétrica</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Modelos desenvolvidos com algoritmos matemáticos para gerar relevos orgânicos impossíveis na manufatura tradicional.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border relative overflow-hidden group hover:border-brand-magenta/50 transition-all">
            <span className="text-[10px] font-bold tracking-widest text-brand-magenta uppercase px-2.5 py-1 rounded bg-brand-magenta/10 border border-brand-magenta/20 inline-block mb-3">
              ECO & QUALIDADE
            </span>
            <h3 className="text-lg font-bold text-white">Filamentos Selecionados</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Utilização de PLA biodegradável de alta densidade e resinas de engenharia com cura UV milimétrica.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border relative overflow-hidden group hover:border-brand-coral/50 transition-all">
            <span className="text-[10px] font-bold tracking-widest text-brand-coral uppercase px-2.5 py-1 rounded bg-brand-coral/10 border border-brand-coral/20 inline-block mb-3">
              TOQUE ARTESANAL
            </span>
            <h3 className="text-lg font-bold text-white">Pintura & Acabamento</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Tratamento de superfície pós-impressão, lixamento e pintura especializada manual para um resultado impecável.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Catalog Section */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-dark-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Portfólio & Peças Disponíveis</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">
              Catálogo de Projetos
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg shadow-md'
                    : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Custom Projects CTA */}
      <section id="personalizados" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-dark-card via-[#1A1828] to-dark-card border border-brand-magenta/30 glow-magenta-orange">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              SOLUÇÕES CORPORATIVAS & SOB MEDIDA
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Precisa de um projeto exclusivo ou modelagem personalizada?
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Produzimos troféus personalizados, brindes corporativos, protótipos funcionais para empresas e peças decorativas sob medida. Traga sua ideia ou arquivo STL.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/5527999999999?text=Ol%C3%A1%2C%20tenho%20uma%20ideia%20de%20projeto%20personalizado%20para%20impress%C3%A3o%203D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg font-black text-sm tracking-wide shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all"
              >
                SOLICITAR ORÇAMENTO NO WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
