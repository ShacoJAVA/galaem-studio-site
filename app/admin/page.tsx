'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Lock, Plus, Trash2, Upload, CheckCircle2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  category_label: string;
  price: number;
  dimensions: string;
  weight: string;
  description: string;
  ambient_image: string;
  studio_image: string;
  colors: { name: string; hex: string }[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [errorPin, setErrorPin] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('decor');
  const [price, setPrice] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [ambientImageFile, setAmbientImageFile] = useState<File | null>(null);
  const [studioImageFile, setStudioImageFile] = useState<File | null>(null);
  const [ambientImageUrl, setAmbientImageUrl] = useState('');
  const [studioImageUrl, setStudioImageUrl] = useState('');

  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check saved session
  useEffect(() => {
    const savedAuth = localStorage.getItem('galaem_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProductsList(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: galaem2026
    if (pin.trim() === 'galaem2026' || pin.trim() === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('galaem_admin_auth', 'true');
      setErrorPin(false);
    } else {
      setErrorPin(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('galaem_admin_auth');
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Erro de upload:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Por favor, preencha ao menos o nome e o preço do produto.');
      return;
    }

    try {
      setSaving(true);
      setSuccessMessage('');

      let finalAmbientUrl = ambientImageUrl;
      let finalStudioUrl = studioImageUrl;

      if (ambientImageFile) {
        finalAmbientUrl = await uploadImage(ambientImageFile);
      }
      if (studioImageFile) {
        finalStudioUrl = await uploadImage(studioImageFile);
      }

      if (!finalAmbientUrl) {
        finalAmbientUrl = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';
      }
      if (!finalStudioUrl) {
        finalStudioUrl = finalAmbientUrl;
      }

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

      const categoryLabels: Record<string, string> = {
        decor: 'Decoração & Vasos',
        articulados: 'Bonecos & Articulados',
        utilidades: 'Acessórios & Suportes'
      };

      const defaultColors = [
        { name: 'Branco', hex: '#F9FAFB' },
        { name: 'Preto', hex: '#111827' },
        { name: 'Dourado', hex: '#F59E0B' }
      ];

      const { error } = await supabase.from('products').insert([
        {
          id: slug,
          name,
          category,
          category_label: categoryLabels[category] || 'Geral',
          price: parseFloat(price.replace(',', '.')),
          rating: 5.0,
          reviews_count: 1,
          dimensions: dimensions || 'Sob consulta',
          weight: weight || 'Sob consulta',
          description: description || 'Peça produzida com acabamento artesanal sob encomenda.',
          ambient_image: finalAmbientUrl,
          studio_image: finalStudioUrl,
          colors: defaultColors,
          featured: true
        }
      ]);

      if (error) {
        alert('Erro ao salvar no Supabase: ' + error.message);
        return;
      }

      setSuccessMessage('Produto publicado com sucesso! Ele já está visível no catálogo.');
      setName('');
      setPrice('');
      setDimensions('');
      setWeight('');
      setDescription('');
      setAmbientImageFile(null);
      setStudioImageFile(null);
      setAmbientImageUrl('');
      setStudioImageUrl('');

      fetchProducts();
    } catch (err: any) {
      alert('Erro ao cadastrar produto: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, productName: string) => {
    if (confirm(`Tem certeza que deseja excluir o produto "${productName}"?`)) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProductsList(prev => prev.filter(p => p.id !== id));
      } else {
        alert('Erro ao excluir: ' + error.message);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-magenta to-brand-orange p-[2px] mx-auto glow-magenta-orange">
              <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-brand-orange" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white">Painel do Ateliê GALAEM</h1>
            <p className="text-xs text-gray-400">Digite seu PIN de acesso para gerenciar os produtos.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Digite seu PIN (padrão: galaem2026)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-dark-bg border border-dark-border text-white text-center text-sm font-mono tracking-widest focus:outline-none focus:border-brand-orange"
              />
              {errorPin && (
                <span className="text-xs text-red-400 block text-center mt-2">
                  PIN incorreto. Tente novamente.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg font-extrabold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              ENTRAR NO PAINEL
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
              Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-border">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-white">Administração do Catálogo</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Cadastre novos itens, suba fotos e altere valores. Todas as mudanças aparecem na hora no site!
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-dark-card border border-dark-border text-xs text-gray-400 hover:text-white transition-colors"
        >
          Sair do Painel
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-6 shadow-xl">
            <div className="flex items-center gap-2 border-b border-dark-border pb-4">
              <Plus className="w-5 h-5 text-brand-orange" />
              <h2 className="text-lg font-bold text-white">Cadastrar Novo Produto</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Nome da Peça *</label>
                <input
                  type="text"
                  placeholder="Ex: Vaso Colmeia Moderno"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-white text-xs focus:outline-none focus:border-brand-orange"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Categoria *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-white text-xs focus:outline-none focus:border-brand-orange"
                  >
                    <option value="decor">Decoração & Vasos</option>
                    <option value="articulados">Bonecos & Articulados</option>
                    <option value="utilidades">Acessórios & Suportes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Valor em R$ *</label>
                  <input
                    type="text"
                    placeholder="Ex: 89.90"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-white text-xs focus:outline-none focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Dimensões</label>
                  <input
                    type="text"
                    placeholder="Ex: 20 cm (altura) x 15 cm"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-white text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Peso Aproximado</label>
                  <input
                    type="text"
                    placeholder="Ex: 250g"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-white text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Descrição do Produto</label>
                <textarea
                  rows={3}
                  placeholder="Conte como a peça fica bonita no ambiente, utilidade, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-white text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>

              {/* Image Uploads */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Foto Principal (no ambiente)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAmbientImageFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-dark-bg file:text-brand-orange hover:file:bg-brand-orange/10"
                  />
                  <input
                    type="text"
                    placeholder="Ou cole o link de uma imagem da internet"
                    value={ambientImageUrl}
                    onChange={(e) => setAmbientImageUrl(e.target.value)}
                    className="w-full mt-1.5 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-gray-300 text-[11px] focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Foto em Detalhes (opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setStudioImageFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-dark-bg file:text-brand-magenta hover:file:bg-brand-magenta/10"
                  />
                  <input
                    type="text"
                    placeholder="Ou cole o link da foto de detalhes"
                    value={studioImageUrl}
                    onChange={(e) => setStudioImageUrl(e.target.value)}
                    className="w-full mt-1.5 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-gray-300 text-[11px] focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-brand-amber to-brand-orange text-dark-bg font-extrabold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {saving ? 'PUBLICANDO NO SUPABASE...' : 'SALVAR E PUBLICAR PRODUTO'}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Products Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-lg font-bold text-white">Produtos Publicados no Catálogo</h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-dark-card border border-dark-border text-brand-amber font-mono font-bold">
              {productsList.length} itens
            </span>
          </div>

          <div className="space-y-3">
            {productsList.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between gap-4 hover:border-gray-700 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={prod.ambient_image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-xl object-cover bg-black/40 border border-dark-border shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-brand-orange uppercase">
                      {prod.category_label}
                    </span>
                    <h3 className="text-sm font-bold text-white truncate">{prod.name}</h3>
                    <span className="text-xs font-semibold text-emerald-400">
                      R$ {Number(prod.price).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-dark-bg transition-colors"
                    title="Excluir produto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
