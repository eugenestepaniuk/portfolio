import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import MarqueeSection from './components/sections/MarqueeSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactsSection from './components/sections/ContactsSection';

export default function App() {
  return (
    <main className="relative bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <Header />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactsSection />
    </main>
  );
}