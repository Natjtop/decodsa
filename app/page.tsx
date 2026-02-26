import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white/30 relative">
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
