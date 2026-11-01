import React from 'react';
import Link from 'next/link';
import { Box, MessageCircle, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-dark-card border-t border-dark-border pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-magenta to-brand-orange p-[2px]">
                <div className="w-full h-full bg-dark-bg rounded-[6px] flex items-center justify-center">
                  <Box className="w-5 h-5 text-brand-orange" />
                </div>
              </div>
              <span className="text-xl font-black text-white">GALAEM</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ateliê especializado em peças decorativas, luminárias modernas e presentes criativos com design autoral e acabamento feito à mão.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span>Vila Velha - ES, Brasil</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="#produtos" className="hover:text-brand-orange transition-colors">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="#produtos" className="hover:text-brand-orange transition-colors">
                  Decoração & Vasos
                </Link>
              </li>
              <li>
                <Link href="#produtos" className="hover:text-brand-orange transition-colors">
                  Bonecos & Articulados
                </Link>
              </li>
              <li>
                <Link href="#encomenda" className="hover:text-brand-orange transition-colors">
                  Peças Sob Encomenda
                </Link>
              </li>
            </ul>
          </div>

          {/* Care & Delivery */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Envios & Pagamentos
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Envio seguro para todo o Brasil</li>
              <li>Pagamento via PIX com desconto</li>
              <li>Parcelamento no cartão</li>
              <li>Embalagens reforçadas para presente</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Atendimento Direto
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5527999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-xs text-gray-200 hover:text-white hover:border-brand-orange transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Falar com o Ateliê no WhatsApp</span>
              </a>
              <p className="text-[11px] text-gray-500">
                Tire dúvidas sobre tamanhos, cores ou encomende uma peça especial com a gente!
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-dark-border/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} GALAEM. Todos os direitos reservados.</p>
          <p className="text-[11px] text-gray-600 flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-brand-coral fill-brand-coral" />
            <span>no Espírito Santo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
