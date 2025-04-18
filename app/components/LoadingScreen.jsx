'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="relative w-32 h-32"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Image
          src="/logo.png"
          alt="Golden Extreme Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen; 