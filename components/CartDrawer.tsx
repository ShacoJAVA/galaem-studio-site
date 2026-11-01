'use client';

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, Plus, Minus, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [shippingRegion, setShippingRegion] = useState<'es' | 'outro'>('es');
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');

  if (!isCartOpen) return null;

  const shippingCost = shippingRegion === 'es' ? 15.0 : 35.0; // Estimativa
  const total = subtotal + (cart.length > 0 ? shippingCost : 0);

  const generateWhatsAppLink = () => {
    let message = `*Olá, Gabriel! Gostaria de fechar o pedido do meu carrinho na GALAEM 3D Studio:*\n\n`;

    if (customerName) {
      message += `👤 *Cliente:* ${customerName}\n`;
    }
    if (customerCity) {
      message += `📍 *Cidade/Estado:* ${customerCity} (${shippingRegion === 'es' ? 'Espírito Santo' : 'Outro Estado'})\n\n`;
    }

    message += `📦 *ITENS DO PEDIDO:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Cor: ${item.selectedColor}\n`;
      message += `   - Qtd: ${item.quantity}x (R$ ${item.product.price.toFixed(2).replace('.', ',')})\n`;
      message += `   - Subtotal: R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n💰 *Subtotal dos itens:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    message += `🚚 *Estimativa de Frete (${shippingRegion === 'es' ? 'ES' : 'Brasil'}):* R$ ${shippingCost.toFixed(2).replace('.', ',')}\n`;
    message += `🔥 *TOTAL ESTIMADO:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    message += `Aguardo as instruções para confirmação e dados do PIX!`;

    // WhatsApp URL (Gabriel Nascimento de Freitas)
    return `https://wa.me/5527999999999?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-dark-card border-l border-dark-border shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-dark-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-orange" />
              <h2 className="text-lg font-bold text-white">Seu Carrinho</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-dark-bg text-brand-amber font-mono font-bold">
                {cart.length}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-dark-bg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-dark-bg flex items-center justify-center text-gray-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">Seu carrinho está vazio.</p>
                <p className="text-xs text-gray-500 max-w-xs">
                  Explore nosso catálogo e selecione suas peças e modelos favoritos!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="p-3.5 rounded-xl bg-dark-bg/80 border border-dark-border flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={item.product.studioImage}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-black/40 border border-dark-border"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-brand-amber block">
                      Cor: {item.selectedColor}
                    </span>
                    <span className="text-xs font-semibold text-gray-300">
                      R$ {item.product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1"
                      title="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-dark-card border border-dark-border rounded-lg p-0.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                        }
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                        }
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-dark-border bg-dark-bg/95 space-y-4">
              {/* Shipping Estimator */}
              <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border space-y-2 text-xs">
                <div className="flex items-center justify-between text-gray-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-brand-orange" /> Região de Entrega:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShippingRegion('es')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        shippingRegion === 'es'
                          ? 'bg-brand-orange text-dark-bg'
                          : 'bg-dark-bg text-gray-400'
                      }`}
                    >
                      Espírito Santo
                    </button>
                    <button
                      onClick={() => setShippingRegion('outro')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        shippingRegion === 'outro'
                          ? 'bg-brand-magenta text-white'
                          : 'bg-dark-bg text-gray-400'
                      }`}
                    >
                      Outro Estado
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Seu Nome (opcional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                  <input
                    type="text"
                    placeholder="Sua Cidade / CEP"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Frete Estimado</span>
                  <span className="font-semibold text-white">
                    R$ {shippingCost.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-dark-border">
                  <span>Total Estimado</span>
                  <span className="text-brand-amber">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-sm tracking-wide shadow-lg shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <Send className="w-4 h-4" />
                <span>FINALIZAR NO WHATSAPP</span>
              </a>

              <p className="text-[10px] text-center text-gray-500">
                Você será direcionado para o WhatsApp de Gabriel para confirmação final e dados de entrega.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
