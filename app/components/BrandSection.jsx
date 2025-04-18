'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const BrandSection = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const generateParticles = (count) => {
      return Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 3 + 1,
      }));
    };

    setParticles(generateParticles(30));
  }, []);

  const features = [
    {
      title: "Premium Quality",
      description: "Engineered for excellence in every terrain",
      icon: "⚡"
    },
    {
      title: "Advanced Technology",
      description: "Cutting-edge innovations for superior performance",
      icon: "🔬"
    },
    {
      title: "Durability",
      description: "Built to withstand the toughest conditions",
      icon: "🛡️"
    }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    animate: {
      backgroundPosition: ['200% 50%', '-200% 50%'],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const rainbowVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const glowVariants = {
    animate: {
      textShadow: [
        '0 0 20px rgba(234, 179, 8, 0)',
        '0 0 40px rgba(234, 179, 8, 0.5)',
        '0 0 20px rgba(234, 179, 8, 0)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const letterVariants = {
    initial: { y: 40, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  return (
    <div className="w-full relative overflow-hidden bg-white">
      <div className="relative py-24 sm:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 4px 4px, black 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(234, 179, 8, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)
            `
          }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Main Title */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <motion.span 
                className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold tracking-wide"
                variants={floatingVariants}
                animate="animate"
              >
                OUR BRAND
              </motion.span>
            </motion.div>
            
            <motion.div 
              className="mt-6 relative"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider relative"
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="relative inline-block">
                  {Array.from("GOLDEN").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="initial"
                      animate="animate"
                      className="inline-block"
                      style={{
                        display: 'inline-block',
                        backgroundImage: 'linear-gradient(90deg, #f59e0b, #eab308, #facc15, #eab308, #f59e0b)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <motion.div
                    className="absolute inset-0"
                    variants={rainbowVariants}
                    animate="animate"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #f59e0b, #eab308, #facc15, #eab308, #f59e0b)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      opacity: 0.8,
                      mixBlendMode: 'overlay'
                    }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    variants={glowVariants}
                    animate="animate"
                  />
                </motion.div>
                <motion.div 
                  className="relative inline-block ml-2"
                  variants={textVariants}
                >
                  {Array.from("EXTREME").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i + 7} // Continue from GOLDEN's length
                      variants={letterVariants}
                      initial="initial"
                      animate="animate"
                      className="inline-block text-gray-900 hover:text-yellow-600 transition-colors duration-300"
                      style={{ display: 'inline-block' }}
                      whileHover={{
                        scale: 1.1,
                        color: '#eab308',
                        transition: { duration: 0.2 }
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Experience the pinnacle of tire technology with our premium brand
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative"
                onHoverStart={() => setHoveredElement(feature.title)}
                onHoverEnd={() => setHoveredElement(null)}
              >
                <div className="relative p-8 rounded-2xl bg-white shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{
                      scale: hoveredElement === feature.title ? 1.2 : 1,
                      rotate: hoveredElement === feature.title ? 5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;