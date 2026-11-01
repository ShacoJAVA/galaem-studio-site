'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Box, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-dark-bg/85 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-magenta via-brand-coral to-brand-orange p-[2px] transition-transform duration-300 group-hover:scale-105 glow-magenta-orange">
            <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
              <Box className="w-6 h-6 text-brand-orange animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-wider text-white">
              GALAEM
            </span>
            <span className="text-[10px] tracking-widest text-brand-amber font-semibold uppercase -mt-1">
              3D Studio
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#catalogo" className="hover:text-brand-orange transition-colors">
            Catálogo
          </Link>
          <Link href="#categorias" className="hover:text-brand-orange transition-colors">
            Categorias
          </Link>
          <Link href="#sobre" className="hover:text-brand-orange transition-colors">
            Sobre o Studio
          </Link>
          <Link href="#personalizados" className="hover:text-brand-orange transition-colors">
            Sob Encomenda
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir carrinho"
            className="relative p-2.5 rounded-xl bg-dark-card border border-dark-border text-gray-200 hover:text-white hover:border-brand-coral/50 transition-all duration-200 flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 text-brand-amber" />
            <span className="hidden sm:inline text-xs font-semibold">Carrinho</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-brand-coral to-brand-orange text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
