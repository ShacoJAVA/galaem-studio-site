export interface Product {
  id: string;
  name: string;
  category: 'decor' | 'articulados' | 'tecnicos' | 'stl';
  categoryLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  ambientImage: string;
  studioImage: string;
  reelsVideoUrl?: string;
  description: string;
  heightCm: number;
  widthCm: number;
  weightG: number;
  layerResolution: string;
  materialType: 'PLA Silk' | 'Resina Ultra' | 'Cerâmica 3D';
  colors: { name: string; hex: string }[];
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'aether-lamp',
    name: 'Aether Geometric Lamp',
    category: 'decor',
    categoryLabel: 'Decoração & Iluminação',
    price: 129.90,
    rating: 4.9,
    reviewsCount: 38,
    ambientImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    description: 'Luminária geométrica com padrão orgânico de camadas. Emite uma luz difusa acolhedora ideal para ambientes contemporâneos.',
    heightCm: 24,
    widthCm: 15,
    weightG: 320,
    layerResolution: '0.16mm',
    materialType: 'PLA Silk',
    colors: [
      { name: 'Âmbar Dourado', hex: '#F59E0B' },
      { name: 'Preto Cosmos', hex: '#111827' },
      { name: 'Magenta Néon', hex: '#8A2387' }
    ],
    featured: true
  },
  {
    id: 'sculptural-vase',
    name: 'Vaso Sculptural Wave',
    category: 'decor',
    categoryLabel: 'Cerâmica & Design',
    price: 149.90,
    rating: 4.8,
    reviewsCount: 45,
    ambientImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    description: 'Vaso escultural sinuoso com acabamento fosco e toque cerâmico. Modelagem paramétrica com transição de relevo fluida.',
    heightCm: 22,
    widthCm: 14,
    weightG: 280,
    layerResolution: '0.12mm',
    materialType: 'Cerâmica 3D',
    colors: [
      { name: 'Branco Acetinado', hex: '#F3F4F6' },
      { name: 'Terracota', hex: '#C2410C' },
      { name: 'Cinza Ardósia', hex: '#4B5563' }
    ],
    featured: true
  },
  {
    id: 'quantum-articulated',
    name: 'Figura Articulada Quantum Bot',
    category: 'articulados',
    categoryLabel: 'Brinquedos & Articulados',
    price: 89.90,
    rating: 5.0,
    reviewsCount: 62,
    ambientImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    description: 'Robô articulado impresso em peça única (print-in-place) com mais de 16 pontos de articulação flexíveis. Peça lúdica e decorativa.',
    heightCm: 18,
    widthCm: 10,
    weightG: 190,
    layerResolution: '0.16mm',
    materialType: 'PLA Silk',
    colors: [
      { name: 'Cobre Metálico', hex: '#B45309' },
      { name: 'Ciano Cyber', hex: '#06B6D4' },
      { name: 'Roxo Imperial', hex: '#7C3AED' }
    ],
    featured: true
  },
  {
    id: 'headset-stand-hex',
    name: 'Suporte Headset HexaTech',
    category: 'tecnicos',
    categoryLabel: 'Peças Funcionais',
    price: 110.00,
    rating: 4.7,
    reviewsCount: 29,
    ambientImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    studioImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Suporte estrutural reforçado para fones de ouvido com base hexagonal antiderrapante e guia de cabos integrado.',
    heightCm: 26,
    widthCm: 13,
    weightG: 350,
    layerResolution: '0.20mm',
    materialType: 'Resina Ultra',
    colors: [
      { name: 'Preto Fosco', hex: '#18181B' },
      { name: 'Cinza Militar', hex: '#374151' }
    ],
    featured: false
  }
];
