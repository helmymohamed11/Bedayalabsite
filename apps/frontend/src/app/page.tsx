import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedTests } from '@/components/FeaturedTests';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedTests />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}