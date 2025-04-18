'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
// ...existing imports...
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const quickActionVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Link href={`/products/${product._id}`} className="block">
      <motion.div
        className="group bg-white rounded-2xl shadow-lg overflow-hidden relative"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        onHoverStart={() => {
          setIsHovered(true);
          setShowQuickActions(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setShowQuickActions(false);
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 4px 4px, black 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {!imageError && product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={256}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-gray-400">Image not available</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            variants={overlayVariants}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
              {product.category === 'tyre' ? 'Tyre' : 
               product.category === 'wheel' ? 'Wheel' : 
               product.category === 'battery' ? 'Battery' : product.category}
            </span>
          </div>

          {/* Quick View Indicator */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white rounded-full p-2 shadow-lg flex items-center">
              <span className="text-xs font-medium text-gray-800 mr-1">View</span>
              <FiEye className="w-4 h-4 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold mb-2 text-gray-800 group-hover:text-yellow-600 transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.name}
          </motion.h3>
          <motion.p 
            className="text-gray-600 mb-6 line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.description}
          </motion.p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
