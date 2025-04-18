"use client";

// components/HeroBanner.jsx
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

const HeroBanner = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const slides = [
    {
      id: 1,
      image: "/new/ADM_4614.webp",
      alt: 'Premium Performance Tires',
      title: 'ENGINEERED FOR\nPERFORMANCE',
      subtitle: 'Discover our range of high-performance tires for ultimate road grip and control',
      cta: 'Shop Now',
      link: '/products',
      color: 'from-blue-600/20 to-purple-600/20'
    },
    {
      id: 2,
      image: "/new/ADM_4501.webp",
      alt: 'All-Season Tires',
      title: 'ALL-SEASON\nRELIABILITY',
      subtitle: 'Drive confidently in any weather condition with our versatile tire collection',
      cta: 'Learn More',
      link: '/about-us',
      color: 'from-emerald-600/20 to-teal-600/20'
    },
    {
      id: 3,
      image: "/new/ADM_4620.webp",
      alt: 'Off-Road Tires',
      title: 'CONQUER ANY\nTERRAIN',
      subtitle: 'Built tough for your off-road adventures with superior traction and durability',
      cta: 'Explore Series',
      link: '/products/off-road-tires',
      color: 'from-orange-600/20 to-red-600/20'
    }
  ];

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach(slide => {
        const img = document.createElement('img');
        img.src = slide.image;
      });
    };

    if (typeof window !== 'undefined') {
      preloadImages();
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => {
        const nextSlide = prev === slides.length - 1 ? 0 : prev + 1;
        return nextSlide;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isMounted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 1000); // Reduced loading time

    return () => clearTimeout(timer);
  }, []);

  const handleSlideChange = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const imageVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  if (!isContentLoaded) {
    return (
      <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] overflow-hidden"
      style={{ y, opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"
        animate={{
          background: [
            `linear-gradient(45deg, ${slides[currentSlide].color})`,
            `linear-gradient(135deg, ${slides[currentSlide].color})`,
            `linear-gradient(45deg, ${slides[currentSlide].color})`
          ]
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              style={{ objectFit: "cover" }}
              className="brightness-75"
              quality={75}
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCD/2wBDARUXFy4eHhsUHS4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              onLoadingComplete={() => setIsLoading(false)}
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-[2] text-white text-center px-4">
              <div className="max-w-4xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wider"
                >
                  {slides[currentSlide].title.split('\n').map((line, i) => (
                    <span key={i} className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
                      {line}
                    </span>
                  ))}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-yellow-500' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HeroBanner;