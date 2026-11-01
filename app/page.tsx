'use client';

import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, Product } from '@/data/products';
import { supabase } from '@/lib/supabaseClient';
import { Sparkles, MessageCircle } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProductsFromSupabase() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0 && !error) {
          // Map snake_case to camelCase
          const formatted: Product[] = data.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            categoryLabel: item.category_label,
            price: Number(item.price),
            rating: Number(item.rating || 5.0),
            reviewsCount: Number(item.reviews_count || 1),
            ambientImage: item.ambient_image,
            studioImage: item.studio_image,
            description: item.description,
            dimensions: item.dimensions,
            weight: item.weight,
            colors: Array.isArray(item.colors) ? item.colors : [],
            featured: item.featured
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.error('Erro ao buscar produtos do Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProductsFromSupabase();
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'Ver Todos os Produtos' },
    { id: 'decor', label: 'Decoração & Vasos' },
    { id: 'articulados', label: 'Bonecos & Articulados' },
    { id: 'utilidades', label: 'Acessórios & Suportes' },
  ];

  return (
    <div className="space-y-20">
      {/* 1. Hero Principal */}
      <Hero />

      {/* 2. Destaques do Ateliê (Estilo Anelim Ateliê) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border group hover:border-brand-orange/40 transition-all">
            <span className="text-[10px] font-extrabold tracking-widest text-brand-orange uppercase px-2.5 py-1 rounded bg-brand-orange/10 border border-brand-orange/20 inline-block mb-3">
              DESIGN EXCLUSIVO
            </span>
            <h3 className="text-lg font-bold text-white">Peças que Você só Encontra Aqui</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Modelos criados e selecionados para trazer personalidade, beleza e elegância aos seus ambientes favoritos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border group hover:border-brand-magenta/40 transition-all">
            <span className="text-[10px] font-extrabold tracking-widest text-brand-magenta uppercase px-2.5 py-1 rounded bg-brand-magenta/10 border border-brand-magenta/20 inline-block mb-3">
              CORES E TAMANHOS
            </span>
            <h3 className="text-lg font-bold text-white">Personalize com a Sua Cor</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Você pode escolher a combinação de cores perfeita para combinar com a paleta da sua casa ou escritório.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border group hover:border-brand-coral/40 transition-all">
            <span className="text-[10px] font-extrabold tracking-widest text-brand-coral uppercase px-2.5 py-1 rounded bg-brand-coral/10 border border-brand-coral/20 inline-block mb-3">
              DIRETO DO ATELIÊ
            </span>
            <h3 className="text-lg font-bold text-white">Feito Sob Encomenda</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Cada peça é produzida individualmente com muito capricho, lixada e finalizada antes de ser embalada com segurança.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Catálogo de Produtos e Vitrines */}
      <section id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-dark-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Catálogo Completo</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">
              Escolha suas Peças Favoritas
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

      {/* 4. Banner de Encomenda Personalizada */}
      <section id="encomenda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-dark-card via-[#1A1828] to-dark-card border border-brand-magenta/30 glow-magenta-orange">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
              PEDIDOS SOB ENCOMENDA
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Quer uma peça exclusiva, presente especial ou brinde sob medida?
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Nós produzimos troféus, lembranças, suportes e decorações personalizadas na cor e tamanho que você desejar. Fale diretamente conosco pelo WhatsApp para conversarmos sobre a sua ideia!
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/5527999999999?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20uma%20pe%C3%A7a%20personalizada"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg font-black text-sm tracking-wide shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>PEDIR ORÇAMENTO NO WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
