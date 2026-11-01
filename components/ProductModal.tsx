'use client';

import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'ambient' | 'studio'>('ambient');

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const currentColor = selectedColor || product.colors[0]?.name || 'Padrão';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-dark-card border border-dark-border shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-dark-bg/80 border border-dark-border text-gray-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Visual Showcase */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-dark-border">
              <img
                src={activeTab === 'ambient' ? product.ambientImage : product.studioImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* View Toggle */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <button
                  onClick={() => setActiveTab('ambient')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold backdrop-blur-md transition-all ${
                    activeTab === 'ambient'
                      ? 'bg-brand-orange text-dark-bg font-bold shadow-md'
                      : 'bg-dark-bg/80 text-gray-300 hover:text-white border border-dark-border'
                  }`}
                >
                  No Ambiente
                </button>
                <button
                  onClick={() => setActiveTab('studio')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold backdrop-blur-md transition-all ${
                    activeTab === 'studio'
                      ? 'bg-brand-magenta text-white font-bold shadow-md'
                      : 'bg-dark-bg/80 text-gray-300 hover:text-white border border-dark-border'
                  }`}
                >
                  Visão em Detalhes
                </button>
              </div>
            </div>

            {/* Simple Dimensions Box */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-dark-bg/70 border border-dark-border text-center text-xs">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Tamanho</span>
                <span className="font-bold text-white">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Peso Aproximado</span>
                <span className="font-bold text-white">{product.weight}</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-brand-amber uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <div className="flex items-center text-brand-amber">
                  <Star className="w-4 h-4 fill-brand-amber" />
                </div>
                <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
                <span className="text-gray-500">({product.reviewsCount} clientes satisfeitos)</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Delivery & Care info */}
            <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 text-gray-200">
                <Truck className="w-4 h-4 text-brand-orange" />
                <span><strong>Produção sob encomenda:</strong> envio em 2 a 4 dias úteis.</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <Heart className="w-4 h-4 text-brand-coral" />
                <span><strong>Cuidados:</strong> limpar com pano seco ou levemente úmido.</span>
              </div>
            </div>

            {/* Color selection */}
            <div>
              <span className="text-xs font-bold text-gray-300 block mb-2">
                Escolha a cor da sua peça: <strong className="text-brand-orange">{currentColor}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                      currentColor === c.name
                        ? 'border-brand-orange bg-brand-orange/10 text-white ring-1 ring-brand-orange'
                        : 'border-dark-border bg-dark-bg text-gray-400 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="pt-4 border-t border-dark-border flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 block">Valor à vista</span>
                <span className="text-3xl font-black text-white">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-[11px] text-emerald-400 block font-semibold">
                  no PIX ou parcelado no cartão
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(product, currentColor);
                  setSelectedProductForModal(null);
                }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg font-extrabold text-sm tracking-wide shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
