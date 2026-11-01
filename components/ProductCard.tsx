'use client';

import React, { useState } from 'react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, setSelectedProductForModal } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Padrão');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl bg-dark-card border transition-all duration-300 flex flex-col overflow-hidden ${
        isHovered
          ? 'border-brand-coral/70 shadow-xl shadow-brand-coral/10 -translate-y-1'
          : 'border-dark-border hover:border-gray-700'
      }`}
    >
      {/* Image Container with Ambient <-> Isolated hover */}
      <div
        className="relative w-full aspect-square overflow-hidden bg-black/40 cursor-pointer"
        onClick={() => setSelectedProductForModal(product)}
      >
        <img
          src={product.ambientImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        <img
          src={product.studioImage}
          alt={`${product.name} visão detalhada`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-dark-bg/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-lg bg-dark-bg/90 border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Ver Detalhes
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-dark-bg/85 backdrop-blur-md text-gray-200 border border-dark-border">
            {product.categoryLabel}
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
            <span className="text-[11px] text-gray-400 font-medium">
              {product.dimensions}
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
            <span className="text-[11px] text-gray-500 font-medium">Cor:</span>
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
            <span className="text-[10px] text-gray-400 ml-1">{selectedColor}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 mt-3 border-t border-dark-border flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-white block leading-tight">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              à vista no PIX
            </span>
          </div>

          <button
            onClick={() => addToCart(product, selectedColor)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg font-bold text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
