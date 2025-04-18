"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, getProducts } from '../../../src/utils/api';
import Layout from '../../components/Layout';
import Link from 'next/link';
import ProductModal from '../../components/ProductModal';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowLeft, FiShoppingCart, FiShare2, FiHeart, FiChevronRight, FiChevronLeft, FiEye, FiInfo } from 'react-icons/fi';

export default function ProductDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!params.id) {
          setError('Product ID is required');
          setLoading(false);
          return;
        }

        // Fetch all products first
        const productsResponse = await getProducts();
        if (!productsResponse.success) {
          setError(productsResponse.error || 'Failed to fetch products');
          setLoading(false);
          return;
        }
        
        setAllProducts(productsResponse.data);
        const index = productsResponse.data.findIndex(p => p._id === params.id);
        setCurrentIndex(index);

        // Then fetch the specific product
        const response = await getProductById(params.id);
        if (!response.success) {
          setError(response.error || 'Failed to fetch product details');
          setLoading(false);
          return;
        }

        setProduct(response.data);
      } catch (err) {
        console.error('Error in fetchProduct:', err);
        setError(err.message || 'An error occurred while fetching the product');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we're not in a static export
    if (typeof window !== 'undefined') {
      fetchProduct();
    }
  }, [params.id]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevProduct = allProducts[currentIndex - 1];
      router.push(`/products/${prevProduct._id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < allProducts.length - 1) {
      const nextProduct = allProducts[currentIndex + 1];
      router.push(`/products/${nextProduct._id}`);
    }
  };

  const handleViewDetails = () => {
    if (product) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              {error ? 'Error' : 'Product Not Found'}
            </h2>
            <p className="text-red-700">
              {error || 'The requested product could not be found.'}
            </p>
          </div>
          <Link 
            href="/products" 
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/products" 
                className="inline-flex items-center text-gray-700 hover:text-amber-600 transition-colors group"
              >
                <FiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Products</span>
              </Link>
              <div className="flex items-center space-x-4">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'} hover:bg-gray-100 transition-colors`}
                >
                  <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <FiShare2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 relative group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Navigation Arrows */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevious}
                    disabled={currentIndex <= 0}
                    className={`p-3 rounded-full bg-white/90 backdrop-blur shadow-lg ${
                      currentIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-50'
                    }`}
                  >
                    <FiChevronLeft className="w-6 h-6 text-gray-700" />
                  </motion.button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    disabled={currentIndex >= allProducts.length - 1}
                    className={`p-3 rounded-full bg-white/90 backdrop-blur shadow-lg ${
                      currentIndex >= allProducts.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-50'
                    }`}
                  >
                    <FiChevronRight className="w-6 h-6 text-gray-700" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Product Info Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col space-y-8"
              >
                {/* Product Header */}
                <div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-sm font-medium mb-4"
                  >
                    {product.category}
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-4xl font-bold text-gray-900 mb-2"
                  >
                    {product.name}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-lg text-gray-500"
                  >
                    {product.subcategory}
                  </motion.p>
                </div>

                {/* Product Description */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="prose prose-gray max-w-none"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About this product</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </motion.div>

                {/* Specifications */}
                {product.specifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-gray-50 rounded-2xl p-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="bg-white p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">{key}</p>
                          <p className="font-medium text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewDetails}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 px-8 rounded-2xl shadow-lg transition-colors duration-300 flex items-center justify-center space-x-2 font-medium text-lg"
                  >
                    <FiInfo className="w-5 h-5" />
                    <span>View Full Details</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Product Modal */}
        {isModalOpen && (
          <ProductModal
            product={product}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </Layout>
  );
}