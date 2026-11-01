import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';

export const metadata: Metadata = {
  title: 'GALAEM 3D Studio | Impressão 3D & Modelagem Paramétrica',
  description: 'Catálogo de peças exclusivas, luminárias geométricas, vasos escultóricos e projetos sob demanda por manufatura aditiva de alta precisão.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen flex flex-col bg-dark-bg text-white selection:bg-brand-orange selection:text-white">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ProductModal />
        </CartProvider>
      </body>
    </html>
  );
}
