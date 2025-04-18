'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts } from '../../../src/utils/api';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiEye } from 'react-icons/fi';
import Image from 'next/image';

export default function BatteriesPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        console.log("Batteries API Response:", response);
        
        if (response && response.success) {
          // Filter only battery products
          const batteryProducts = response.data.filter(product => product.category === 'battery');
          setProducts(batteryProducts);
          // Set initial displayed products
          setDisplayedProducts(batteryProducts.slice(0, productsPerPage));
          
          // Extract unique subcategories from products
          const uniqueSubCategories = [...new Set(batteryProducts.map(product => product.subcategory))];
          setCategories(uniqueSubCategories);
        } else {
          setError(response?.error || 'Failed to fetch products');
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected categories
  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.subcategory === selectedCategory;
  });

  // Update displayed products when category changes
  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
    setCurrentPage(1);
  }, [selectedCategory]);

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * productsPerPage;
    setDisplayedProducts(filteredProducts.slice(0, endIndex));
    setCurrentPage(nextPage);
  };

  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  return (
    <Layout>
      <div className="relative min-h-screen bg-white">
        {/* Header Section */}
        <div className="relative py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-4">
                <Link 
                  href="/products" 
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 group"
                >
                  <FiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium">Back to All Products</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  <Link 
                    href="/products/tyres"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  >
                    Tires
                  </Link>
                  <Link 
                    href="/products/wheels"
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  >
                    Wheels
                  </Link>
                  <Link 
                    href="/products/batteries"
                    className="block px-4 py-2 bg-amber-50 text-amber-600 rounded-lg"
                  >
                    Batteries
                  </Link>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Subcategories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-amber-600 text-white'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                    }`}
                  >
                    All Batteries
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Products Grid */}
              <div className="pb-24">
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-red-600">{error}</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-600">No battery products found in this category.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {displayedProducts.map((product) => (
                        <div 
                          key={product._id}
                          className="flex flex-col items-center group relative"
                        >
                          <div className="relative w-full aspect-square">
                            <Image 
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain group-hover:opacity-90 transition-opacity"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                              unoptimized
                            />
                          </div>
                          <div className="mt-2 text-center">
                            <p className="text-xs text-gray-900 group-hover:text-amber-600 transition-colors">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.subcategory}</p>
                          </div>
                          <Link 
                            href={`/products/${product._id}`}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
                          >
                            <button className="bg-amber-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-amber-700 transition-colors">
                              <FiEye className="w-4 h-4" />
                              <span className="text-sm">View Details</span>
                            </button>
                          </Link>
                        </div>
                      ))}
                    </div>
                    {hasMoreProducts && (
                      <div className="mt-8 flex justify-center">
                        <button
                          onClick={loadMoreProducts}
                          className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 