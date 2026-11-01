-- 1. Tabela de Produtos
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  rating NUMERIC(3, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 1,
  ambient_image TEXT NOT NULL,
  studio_image TEXT NOT NULL,
  description TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  weight TEXT NOT NULL,
  colors JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Acesso
-- Leitura pública para todos os visitantes do site
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Public products are viewable by everyone'
  ) THEN
    CREATE POLICY "Public products are viewable by everyone" 
    ON public.products FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Anyone can insert products for admin'
  ) THEN
    CREATE POLICY "Anyone can insert products for admin" 
    ON public.products FOR ALL USING (true);
  END IF;
END $$;

-- 4. Inserir produtos iniciais caso a tabela esteja vazia
INSERT INTO public.products (id, name, category, category_label, price, rating, reviews_count, ambient_image, studio_image, description, dimensions, weight, colors, featured)
VALUES 
(
  'aether-lamp',
  'Luminária Geométrica Aether',
  'decor',
  'Luminárias & Decoração',
  129.90,
  4.9,
  38,
  'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
  'Luminária com design geométrico moderno que cria um efeito de iluminação aconchegante e suave. Perfeita para quartos, salas e mesas de cabeceira.',
  '24 cm (altura) x 15 cm (diâmetro)',
  '320g',
  '[{"name": "Âmbar Dourado", "hex": "#F59E0B"}, {"name": "Preto Fosco", "hex": "#111827"}, {"name": "Branco Neve", "hex": "#F9FAFB"}]'::jsonb,
  true
),
(
  'sculptural-vase',
  'Vaso Ondas Escultural',
  'decor',
  'Vasos & Cachepots',
  149.90,
  4.8,
  45,
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
  'Vaso decorativo com relevo fluido e elegante. Peça de destaque para mesas de centro, estantes e aparadores modernos.',
  '22 cm (altura) x 14 cm (largura)',
  '280g',
  '[{"name": "Branco Acetinado", "hex": "#F3F4F6"}, {"name": "Terracota", "hex": "#C2410C"}, {"name": "Cinza Grafite", "hex": "#4B5563"}]'::jsonb,
  true
),
(
  'quantum-articulated',
  'Robô Articulado Quantum',
  'articulados',
  'Bonecos & Articulados',
  89.90,
  5.0,
  62,
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  'Figura articulada totalmente móvel com juntas flexíveis. Excelente para colecionadores, decoração de setups gamer ou presente criativo.',
  '18 cm (altura)',
  '190g',
  '[{"name": "Cobre Metálico", "hex": "#B45309"}, {"name": "Azul Ciano", "hex": "#06B6D4"}, {"name": "Roxo Imperial", "hex": "#7C3AED"}]'::jsonb,
  true
),
(
  'headset-stand-hex',
  'Suporte para Fone de Ouvido Hexa',
  'utilidades',
  'Acessórios & Suportes',
  110.00,
  4.7,
  29,
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'Suporte robusto e estável para manter seu headset organizado e protegido na mesa de trabalho ou setup de jogos.',
  '26 cm (altura) x 13 cm (base)',
  '350g',
  '[{"name": "Preto Fosco", "hex": "#18181B"}, {"name": "Cinza Chumbo", "hex": "#374151"}]'::jsonb,
  false
)
ON CONFLICT (id) DO NOTHING;
