export interface Product {
  id: string;
  name: string;
  category: 'decor' | 'articulados' | 'utilidades';
  categoryLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  ambientImage: string;
  studioImage: string;
  description: string;
  dimensions: string; // Ex: "24 x 15 cm"
  weight: string;     // Ex: "320g"
  colors: { name: string; hex: string }[];
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'aether-lamp',
    name: 'Luminária Geométrica Aether',
    category: 'decor',
    categoryLabel: 'Luminárias & Decoração',
    price: 129.90,
    rating: 4.9,
    reviewsCount: 38,
    ambientImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    description: 'Luminária com design geométrico moderno que cria um efeito de iluminação aconchegante e suave. Perfeita para quartos, salas e mesas de cabeceira.',
    dimensions: '24 cm (altura) x 15 cm (diâmetro)',
    weight: '320g',
    colors: [
      { name: 'Âmbar Dourado', hex: '#F59E0B' },
      { name: 'Preto Fosco', hex: '#111827' },
      { name: 'Branco Neve', hex: '#F9FAFB' }
    ],
    featured: true
  },
  {
    id: 'sculptural-vase',
    name: 'Vaso Ondas Escultural',
    category: 'decor',
    categoryLabel: 'Vasos & Cachepots',
    price: 149.90,
    rating: 4.8,
    reviewsCount: 45,
    ambientImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    description: 'Vaso decorativo com relevo fluido e elegante. Peça de destaque para mesas de centro, estantes e aparadores modernos.',
    dimensions: '22 cm (altura) x 14 cm (largura)',
    weight: '280g',
    colors: [
      { name: 'Branco Acetinado', hex: '#F3F4F6' },
      { name: 'Terracota', hex: '#C2410C' },
      { name: 'Cinza Grafite', hex: '#4B5563' }
    ],
    featured: true
  },
  {
    id: 'quantum-articulated',
    name: 'Robô Articulado Quantum',
    category: 'articulados',
    categoryLabel: 'Bonecos & Articulados',
    price: 89.90,
    rating: 5.0,
    reviewsCount: 62,
    ambientImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    description: 'Figura articulada totalmente móvel com juntas flexíveis. Excelente para colecionadores, decoração de setups gamer ou presente criativo.',
    dimensions: '18 cm (altura)',
    weight: '190g',
    colors: [
      { name: 'Cobre Metálico', hex: '#B45309' },
      { name: 'Azul Ciano', hex: '#06B6D4' },
      { name: 'Roxo Imperial', hex: '#7C3AED' }
    ],
    featured: true
  },
  {
    id: 'headset-stand-hex',
    name: 'Suporte para Fone de Ouvido Hexa',
    category: 'utilidades',
    categoryLabel: 'Acessórios & Suportes',
    price: 110.00,
    rating: 4.7,
    reviewsCount: 29,
    ambientImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Suporte robusto e estável para manter seu headset organizado e protegido na mesa de trabalho ou setup de jogos.',
    dimensions: '26 cm (altura) x 13 cm (base)',
    weight: '350g',
    colors: [
      { name: 'Preto Fosco', hex: '#18181B' },
      { name: 'Cinza Chumbo', hex: '#374151' }
    ],
    featured: false
  }
];
