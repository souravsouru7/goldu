'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProducts, getMockProducts } from '../../src/utils/api';
import ProductCard from './ProductCard';
import Image from 'next/image';
import SubcategoryFilter from './SubcategoryFilter';

const ProductGrid = ({ activeCategory, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await getProducts();
        console.log("API Response:", response);
        
        if (response && response.success) {
          console.log("Products loaded:", response.data);
          setProducts(response.data || []);
          setUsingMockData(false);
          
          // Extract unique subcategories for the current category
          const categoryMapping = {
            'all': 'all',
            'tyres': 'tyre',
            'wheels': 'wheel', 
            'batteries': 'battery'
          };
          
          const mappedCategory = categoryMapping[activeCategory?.toLowerCase()] || activeCategory?.toLowerCase();
          
          const uniqueSubcategories = [...new Set(
            response.data
              .filter(p => mappedCategory === 'all' || p.category === mappedCategory)
              .map(p => p.subcategory)
          )].map(sub => ({
            _id: sub,
            name: sub,
            category: mappedCategory
          }));
          
          setSubcategories(uniqueSubcategories);
        } else {
          console.error("API Error:", response.error || 'Unknown error');
          
          // If backend API fails, use mock data
          console.log("Falling back to mock data");
          const mockResponse = getMockProducts();
          setProducts(mockResponse.data || []);
          setUsingMockData(true);
          
          // Also set subcategories from mock data
          const categoryMapping = {
            'all': 'all',
            'tyres': 'tyre',
            'wheels': 'wheel', 
            'batteries': 'battery'
          };
          
          const mappedCategory = categoryMapping[activeCategory?.toLowerCase()] || activeCategory?.toLowerCase();
          
          const uniqueSubcategories = [...new Set(
            mockResponse.data
              .filter(p => mappedCategory === 'all' || p.category === mappedCategory)
              .map(p => p.subcategory)
          )].map(sub => ({
            _id: sub,
            name: sub,
            category: mappedCategory
          }));
          
          setSubcategories(uniqueSubcategories);
          
          // Still set the error for debugging purposes
          setError(response.error || 'Failed to fetch products');
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        
        // If error occurs, use mock data
        console.log("Falling back to mock data due to error");
        const mockResponse = getMockProducts();
        setProducts(mockResponse.data || []);
        setUsingMockData(true);
        
        const categoryMapping = {
          'all': 'all',
          'tyres': 'tyre',
          'wheels': 'wheel', 
          'batteries': 'battery'
        };
        
        const mappedCategory = categoryMapping[activeCategory?.toLowerCase()] || activeCategory?.toLowerCase();
        
        const uniqueSubcategories = [...new Set(
          mockResponse.data
            .filter(p => mappedCategory === 'all' || p.category === mappedCategory)
            .map(p => p.subcategory)
        )].map(sub => ({
          _id: sub,
          name: sub,
          category: mappedCategory
        }));
        
        setSubcategories(uniqueSubcategories);
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Debug log for active category
  useEffect(() => {
    console.log("Active Category:", activeCategory);
  }, [activeCategory]);

  // Prevent filtering if products array is empty
  if (!products || products.length === 0) {
    if (!loading) {
      return (
        <motion.div 
          className="flex items-center justify-center min-h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg">
            <p className="text-gray-800 text-xl font-semibold mb-2">No products available</p>
            <p className="text-gray-600">Please check back later</p>
          </div>
        </motion.div>
      );
    }
  }

  const filteredProducts = products.filter(product => {
    if (!product) return false;
    
    // Map category names from UI to database values
    const categoryMapping = {
      'all': 'all',
      'tyres': 'tyre',
      'wheels': 'wheel', 
      'batteries': 'battery'
    };
    
    // Get the mapped category value
    const mappedCategory = categoryMapping[activeCategory?.toLowerCase()] || activeCategory?.toLowerCase();
    
    // Check if product matches the selected category
    const matchesCategory = 
      mappedCategory === 'all' || 
      product.category === mappedCategory;
    
    // Check if product matches the selected subcategory
    const matchesSubcategory = 
      !activeSubcategory || 
      product.subcategory === activeSubcategory;
    
    // Check if product matches the search query
    const matchesSearch = 
      !searchQuery || 
      searchQuery === '' || 
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div 
          className="flex flex-col items-center space-y-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="relative w-32 h-32">
            <Image
              src="/logo.png"
              alt="Golden Extreme Logo"
              fill
              className="object-contain animate-pulse"
            />
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading products...</p>
        </motion.div>
      </div>
    );
  }

  if (error && !usingMockData) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center p-8 bg-red-50 rounded-2xl shadow-lg">
          <p className="text-red-600 font-semibold text-lg mb-4">Error: {error}</p>
          <motion.button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg">
          <p className="text-gray-800 text-xl font-semibold mb-2">No products found</p>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-full sm:w-64">
          <SubcategoryFilter
            subcategories={subcategories}
            activeSubcategory={activeSubcategory}
            onSubcategoryChange={setActiveSubcategory}
            category={activeCategory}
          />
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;
