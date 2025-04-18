'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BrandSlider = () => {
  const [width, setWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carousel = useRef();

  const brands = [
    { img: 'Apollo.png', name: 'Apollo' },
    { img: 'bf-goodrich-logo.png', name: 'BF Goodrich' },
    { img: 'bridgestone.png', name: 'Bridgestone' },
    { img: 'CENTARA.png', name: 'Centara' },
    { img: 'Continental.png', name: 'Continental' },
    { img: 'Dunlop.png', name: 'Dunlop' },
    { img: 'Falken.png', name: 'Falken' },
    { img: 'Federal-Tires.png', name: 'Federal Tires' },
    { img: 'firestone.png', name: 'Firestone' },
    { img: 'General Tire.png', name: 'General Tire' },
    { img: 'Goodyear.png', name: 'Goodyear' },
    { img: 'GT-Radial-Tires.png', name: 'GT Radial' },
    { img: 'Hankook.png', name: 'Hankook' },
    { img: 'JOYROAD.png', name: 'Joyroad' },
    { img: 'Kapsen.png', name: 'Kapsen' },
    { img: 'Kumho Tyres.png', name: 'Kumho Tyres' },
    { img: 'Maxxis.png', name: 'Maxxis' },
    { img: 'Michelin.png', name: 'Michelin' },
    { img: 'nexen.png', name: 'Nexen' },
    { img: 'Pirelli.png', name: 'Pirelli' },
    { img: 'Toyo-Tires.png', name: 'Toyo Tires' },
    { img: 'Triangle.png', name: 'Triangle' },
    { img: 'wanli.png', name: 'Wanli' },
    { img: 'Yokohama.png', name: 'Yokohama' }
  ];

  // Duplicate the brands to create a seamless loop effect
  const duplicatedBrands = [...brands, ...brands];

  useEffect(() => {
    // Calculate the width of the carousel
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8 text-gray-900"
        >
          Our Premium Brands
        </motion.h2>
        
        <div className="relative mx-auto max-w-6xl overflow-hidden py-6">
          <motion.div
            ref={carousel}
            className="cursor-grab overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              initial={{ x: 0 }}
              animate={{ x: isPaused ? null : [-width/2, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                }
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <motion.div
                  key={`${brand.img}-${index}`}
                  className="flex flex-col items-center min-w-max px-6"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="relative w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mb-3 hover:shadow-lg transition-all duration-300">
                    <Image
                      src={`/tyrebrand/${brand.img}`}
                      alt={brand.name}
                      fill
                      className="object-contain p-4 transition-all duration-300"
                      style={{ filter: 'brightness(0.9)' }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
                      priority={index < 10}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-800">{brand.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Speed Control Buttons */}
        
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;