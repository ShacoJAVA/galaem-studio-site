'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Sparkles, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-radial-gradient">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-magenta/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-card border border-brand-coral/30 text-xs font-bold text-brand-amber">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Design Autoral & Criações Exclusivas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Objetos Únicos para <br />
              <span className="bg-gradient-to-r from-brand-amber via-brand-coral to-brand-magenta bg-clip-text text-transparent">
                Transformar seu Espaço.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Descubra vasos esculturais, luminárias aconchegantes e peças decorativas feitas sob encomenda com atenção aos mínimos detalhes e acabamento artesanal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#produtos"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg font-extrabold text-sm tracking-wide shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <span>VER CATÁLOGO DE PRODUTOS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5527999999999?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20uma%20pe%C3%A7a%20personalizada%20com%20a%20GALAEM"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-dark-card border border-dark-border text-gray-200 hover:text-white hover:border-brand-coral/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                Pedir Peça Personalizada
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-dark-border/60 grid grid-cols-3 gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Truck className="w-4 h-4 text-brand-orange" />
                <span>Envio para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Heart className="w-4 h-4 text-brand-coral" />
                <span>Feito com Cuidado</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-brand-amber" />
                <span>Atendimento Direto</span>
              </div>
            </div>
          </div>

          {/* Hero Showcase Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-1 bg-gradient-to-b from-brand-coral/40 via-brand-magenta/20 to-transparent glow-magenta-orange">
              <div className="w-full h-full rounded-[22px] bg-dark-card overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
                  alt="Vaso Escultural GALAEM"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[11px] font-bold tracking-widest text-brand-amber uppercase">
                    Mais Vendido
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Vaso Ondas Escultural
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Ideal para salas de estar, escritórios e presentes sofisticados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
