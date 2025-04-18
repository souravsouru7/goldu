import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BrandSection from '../components/BrandSection';
import EventsSection from '../components/EventsSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import TireAdvertisement from '../components/TireAdvertisement';

const OffroadWebsite = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const logoControls = useAnimation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Update active section based on scroll position
      const sections = ['home', 'products', 'brands', 'events', 'faq'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle logo hover animation
  const handleLogoHover = () => {
    setIsLogoHovered(true);
    logoControls.start({
      rotateY: [0, 180, 360],
      scale: [1, 1.2, 1.1],
      transition: { 
        duration: 1.2,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    });
  };

  const handleLogoHoverEnd = () => {
    setIsLogoHovered(false);
    logoControls.start({
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.5 }
    });
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Head>
        <title>GOLDEN EXTREME - Premium Off-road Experience</title>
        <meta name="description" content="Experience the ultimate off-road adventure with Golden Extreme. Premium tires, expert service, and unforgettable events." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
          background: #000;
        }

        .logo-container {
          perspective: 1000px;
        }

        .logo-shadow {
          filter: drop-shadow(0 0 20px rgba(234, 179, 8, 0.8));
        }

        .text-3d {
          transition: all 0.3s ease;
        }

        .text-3d:hover {
          transform: translateY(-2px);
        }

        .text-gold {
          background: linear-gradient(45deg, #FFD700, #DAA520, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          font-weight: 700;
        }

        .text-gold:hover {
          background: linear-gradient(45deg, #DAA520, #FFD700, #DAA520);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }

        .section-transition {
          transition: all 0.5s ease;
        }

        .section-active {
          background: rgba(234, 179, 8, 0.1);
          border-left: 4px solid #FFD700;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FFD700;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #DAA520;
        }
      `}</style>

      <motion.header 
        className={`w-full px-8 py-4 flex justify-between items-center fixed top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-effect' : 'bg-transparent'
        }`}
        style={{ opacity }}
      >
        <div className="flex-1"></div>
        <div className="flex items-center justify-center">
          <motion.div 
            className="logo-container relative w-48 h-24"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onHoverStart={handleLogoHover}
            onHoverEnd={handleLogoHoverEnd}
          >
            <motion.div
              animate={logoControls}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className={`absolute inset-0 ${isLogoHovered ? 'logo-shadow' : ''}`}
                animate={isLogoHovered ? {
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.3, 1],
                  transition: { duration: 1.2, repeat: Infinity, repeatType: "loop" }
                } : { opacity: 0 }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo Glow"
                  width={192}
                  height={96}
                  className="object-contain"
                  priority
                />
              </motion.div>
              <Image 
                src="/logo.png"
                alt="Golden Extreme Logo"
                width={192}
                height={96}
                className={`object-contain ${!isLogoHovered ? 'logo-animation' : ''}`}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex-1"></div>
      </motion.header>

      <Navbar activeSection={activeSection} />

      <main className="custom-scrollbar">
        <section id="home" className="min-h-screen">
          <HeroSection />
        </section>

        <section id="products" className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-4xl font-bold text-center mb-12 text-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Premium Products
            </motion.h2>
            <ProductGrid />
          </div>
        </section>

        <section id="brands" className="py-20 bg-black/50">
          <div className="container mx-auto px-4">
            <BrandSection />
          </div>
        </section>

        <section id="events" className="py-20">
          <div className="container mx-auto px-4">
            <EventsSection />
          </div>
        </section>

        <section id="faq" className="py-20 bg-black/50">
          <div className="container mx-auto px-4">
            <FaqSection />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <TireAdvertisement />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OffroadWebsite;