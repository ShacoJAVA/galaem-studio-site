import React from 'react';
import Link from 'next/link';
import { Box, Instagram, MessageCircle, MapPin } from 'lucide-react';

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
              <span className="text-xl font-black text-white">GALAEM 3D</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Estúdio de impressão 3D de alta precisão e modelagem paramétrica. Transformando polímeros e resinas em peças exclusivas para decoração e tecnologia.
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
                <Link href="#catalogo" className="hover:text-brand-orange transition-colors">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="#categorias" className="hover:text-brand-orange transition-colors">
                  Linha de Decoração
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="hover:text-brand-orange transition-colors">
                  Sobre a Manufatura
                </Link>
              </li>
              <li>
                <Link href="#personalizados" className="hover:text-brand-orange transition-colors">
                  Peças Sob Encomenda
                </Link>
              </li>
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Materiais & Tecnologia
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>PLA Silk e Filamentos Especiais</li>
              <li>Resina UV de Alta Definição</li>
              <li>Modelagem 3D Paramétrica</li>
              <li>Acabamento e Pintura Artesanal</li>
            </ul>
          </div>

          {/* Contact */}
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
                <span>WhatsApp Oficial</span>
              </a>
              <p className="text-[11px] text-gray-500">
                Segunda a sexta das 08h às 18h. Atendimento de encomendas e orçamentos personalizados.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-dark-border/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} GALAEM 3D Studio. Todos os direitos reservados.</p>
          <p className="text-[11px] text-gray-600">
            Parte do ecossistema GALAEM (GALAEM Flow & Gabriel Freitas Criação Digital).
          </p>
        </div>
      </div>
    </footer>
  );
}
