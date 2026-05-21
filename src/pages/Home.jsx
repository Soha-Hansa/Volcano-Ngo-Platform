import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Opportunities from '../components/Opportunities';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY || window.pageYOffset;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} id="scroll-progress-indicator"></div>
      
      <Header />
      <main className="main-content">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Opportunities />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
