"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        className="relative w-32 h-32"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <Image
            src="/logo.png"
            alt="Loading..."
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-lg font-medium"
        >
          Loading...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner; 