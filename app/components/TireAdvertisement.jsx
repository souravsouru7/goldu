'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '../../src/utils/api';
import Link from 'next/link';
import ProductModal from './ProductModal';
import { useRouter } from 'next/navigation';

const TireAdvertisement = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.success) {
          const featuredProducts = response.data
            .filter(product => product.category === 'tyre')
            .slice(0, 4);
          setProducts(featuredProducts);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleEnquire = (e, product) => {
    e.stopPropagation(); 
    router.push('/ConductUs');
  };

  const staticProducts = [
    {
      id: 'appolo',
      logoSrc: '/new/Apollo.png',
      logoAlt: 'Apollo logo',
      imageSrc: '/new/appolo-min.png',
      imageAlt: 'Apollo Tyre',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'bf-goodrich',
      logoSrc: '/new/bggood.png',
      logoAlt: 'BF Goodrich logo',
      imageSrc: '/new/bf-min.png',
      imageAlt: 'BF Goodrich Tire',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'marshall',
      logoSrc: '/new/Michelin.png',
      logoAlt: 'Michelin logo',
      imageSrc: '/new/marshall-min.png',
      imageAlt: 'Marshall Tire',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'yokohama',
      logoSrc: '/new/y.png',
      logoAlt: 'Yokohama logo',
      imageSrc: '/new/yo-min.png',
      imageAlt: 'Yokohama Tire',
      color: 'from-red-600 to-red-800'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <style jsx global>{`
        @keyframes floatAnimation {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(255, 200, 0, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 200, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 200, 0, 0); }
        }
        
        @keyframes spin3D {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        @keyframes shineEffect {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .glow-effect {
          animation: pulseGlow 2s infinite;
        }
        
        .float-animation {
          animation: floatAnimation 6s ease-in-out infinite;
        }
        
        .spin-animation {
          perspective: 1000px;
        }
        
        .spin-animation:hover .spin-content {
          transform: rotateY(180deg);
          transition: transform 0.8s;
        }
        
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
          transform: skewX(-25deg);
          transition: all 0.75s;
        }
        
        .shine-effect:hover::before {
          animation: shineEffect 0.75s;
        }
        
        .card-gradient {
          background-size: 200% 200%;
          animation: gradientFlow 3s ease infinite;
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .badge-pop {
          transition: all 0.3s ease;
        }
        
        .badge-pop:hover {
          transform: scale(1.1);
        }
        
        .tire-spin:hover {
          animation: spin3D 3s linear infinite;
        }
        
        .flare-effect {
          position: relative;
          overflow: hidden;
        }
        
        .flare-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0;
          transform: rotate(30deg);
          background: rgba(255, 255, 255, 0.13);
          background: linear-gradient(
            to right, 
            rgba(255, 255, 255, 0.13) 0%,
            rgba(255, 255, 255, 0.13) 77%,
            rgba(255, 255, 255, 0.5) 92%,
            rgba(255, 255, 255, 0.0) 100%
          );
          transition: opacity 0.2s;
        }
        
        .flare-effect:hover::after {
          opacity: 1;
          animation: flareEffect 1s ease-out;
        }
        
        @keyframes flareEffect {
          0% { left: -50%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* New enhanced card animations */
        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-3d:hover {
          transform: rotateX(5deg) rotateY(5deg) scale(1.05);
        }
        
        .card-3d:hover .card-content {
          transform: translateZ(20px);
        }
        
        .card-content {
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes tireRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .tire-rotate {
          transition: all 0.5s ease;
        }
        
        .tire-rotate:hover {
          animation: tireRotate 10s linear infinite;
        }
        
        .card-shadow {
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
          transition: box-shadow 0.5s;
        }
        
        .card-shadow:hover {
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.4);
        }
        
        .neon-border {
          position: relative;
        }
        
        .neon-border::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(45deg, #ff8a00, #e52e71, #ff8a00);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s;
        }
        
        .neon-border:hover::after {
          opacity: 1;
          animation: borderRotate 4s linear infinite;
        }
        
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bg-morph {
          background-size: 200% 200%;
          background-position: 0% 0%;
          transition: background-position 0.8s ease;
        }
        
        .bg-morph:hover {
          background-position: 100% 100%;
        }
      `}</style>

      <div className="container mx-auto px-4 lg:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            HOT SELLING PRODUCTS
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            AMAZING NEW TYRES AT AMAZING PRICES
          </motion.p>
          <motion.div 
            className="h-1 bg-gradient-to-r from-amber-400 to-yellow-500 w-24 mx-auto mt-6 glow-effect rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {staticProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg transition-shadow duration-300 overflow-hidden"
              onClick={() => handleProductClick(product)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src={product.imageSrc} 
                  alt={product.imageAlt} 
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                    e.target.className = 'h-24 w-auto object-contain opacity-50';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Brand Logo */}
                <div className="mb-3 flex justify-center">
                  <img 
                    src={product.logoSrc} 
                    alt={product.logoAlt} 
                    className="h-20 w-40 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                      e.target.className = 'h-20 w-40 object-contain opacity-50';
                    }}
                  />
                </div>

                {/* Product Description */}
                <p className="text-gray-600 text-sm text-center mb-3">
                  {product.description}
                </p>

                {/* Category Badge */}
                <div className="flex justify-center mb-4">
                  <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-medium">
                    {product.subcategory}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => handleEnquire(e, product)}
                  className="w-full py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default TireAdvertisement;
