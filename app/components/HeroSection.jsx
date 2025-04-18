"use client";

// components/HeroSection.js
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const HeroSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      // Preload video
      videoRef.current.preload = "auto";
      
      // Try to play the video
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Video autoplay failed:", error);
        });
      }
    }
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload="auto"
          poster="/new/ADM_4614.JPG"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source 
            src="/new/WhatsApp Video 2025-04-08 at 16.58.23_653a0816.mp4" 
            type="video/mp4"
          />
        </video>
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4"
              custom={0}
              variants={textVariants}
            >
              Welcome to
            </motion.h1>
            <motion.h1 
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-yellow-500 mb-8"
              custom={1}
              variants={textVariants}
            >
              Golden Extreme
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12"
              custom={2}
              variants={textVariants}
            >
              Your premier destination for premium tires, wheels, and automotive excellence
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              custom={3}
              variants={textVariants}
            >
              <Link href="/about-us" passHref>
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-lg uppercase tracking-wider rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Us
                    <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </Link>
              <Link href="/ConductUs" passHref>
                <motion.button
                  className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white text-lg uppercase tracking-wider rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;