'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const ProductFilters = ({ 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery 
}) => {
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'tires', label: 'Tires' },
    { id: 'wheels', label: 'Wheels' },
    { id: 'batteries', label: 'Batteries' }
  ];

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const categoryVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      variants={filterVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={categoryVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || activeCategory !== 'all') && (
        <motion.div 
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg"
            >
              <span>Search: {searchQuery}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchQuery('')}
                className="text-yellow-700 hover:text-yellow-900"
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
          {activeCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg"
            >
              <FiFilter className="w-4 h-4" />
              <span>Category: {categories.find(c => c.id === activeCategory)?.label}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveCategory('all')}
                className="text-yellow-700 hover:text-yellow-900"
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductFilters;
