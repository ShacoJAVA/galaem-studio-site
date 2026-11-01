'use client';

import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Layers } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, setSelectedProductForModal } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Padrão');

  const getMaterialBadgeColor = (type: string) => {
    switch (type) {
      case 'PLA Silk':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/40';
      case 'Resina Ultra':
        return 'bg-red-950/70 text-red-300 border-red-500/40';
      case 'Cerâmica 3D':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/40';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl bg-dark-card border transition-all duration-400 flex flex-col overflow-hidden ${
        isHovered
          ? 'border-brand-coral/80 shadow-xl shadow-brand-coral/10 -translate-y-1'
          : 'border-dark-border hover:border-dark-border/80'
      }`}
    >
      {/* Technical Dimensions Overlay (Active on Hover) */}
      <div
        className={`absolute top-3 left-3 right-3 z-20 flex justify-between items-center text-[11px] font-mono transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="px-2 py-0.5 rounded bg-dark-bg/90 border border-brand-orange/40 text-brand-amber">
          W: {product.widthCm}cm
        </span>
        <span className="px-2 py-0.5 rounded bg-dark-bg/90 border border-brand-magenta/40 text-brand-coral">
          H: {product.heightCm}cm
        </span>
      </div>

      {/* Image Container with Ambient <-> Studio Toggle */}
      <div className="relative w-full aspect-square overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedProductForModal(product)}>
        {/* Ambient View (Default) */}
        <img
          src={product.ambientImage}
          alt={`${product.name} no ambiente`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Studio View (Hover) */}
        <img
          src={product.studioImage}
          alt={`${product.name} em estúdio 3D`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />

        {/* Quick View Button overlay */}
        <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-lg bg-dark-bg/90 border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Detalhes da Peça
          </span>
        </div>

        {/* Material Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border tracking-wide uppercase ${getMaterialBadgeColor(
              product.materialType
            )}`}
          >
            {product.materialType}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="flex items-center text-brand-amber">
              <Star className="w-3.5 h-3.5 fill-brand-amber" />
            </div>
            <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
            <span className="text-gray-500">({product.reviewsCount})</span>
            <span className="text-gray-600">·</span>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-brand-orange" /> {product.layerResolution}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProductForModal(product)}
            className="text-base font-bold text-white hover:text-brand-orange transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-gray-500">Cor:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color.name);
                  }}
                  title={color.name}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === color.name
                      ? 'ring-2 ring-brand-orange scale-110 border-white'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 mt-3 border-t border-dark-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block -mb-0.5 uppercase tracking-wider">
              A partir de
            </span>
            <span className="text-lg font-black text-white">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, selectedColor)}
            className="p-2.5 rounded-xl bg-dark-hover border border-dark-border text-brand-amber hover:text-white hover:bg-gradient-to-r hover:from-brand-coral hover:to-brand-orange hover:border-transparent transition-all duration-200 active:scale-95 shadow-sm"
            title="Adicionar ao Carrinho"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
