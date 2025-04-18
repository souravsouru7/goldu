'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SubcategoryFilter = ({ 
  subcategories, 
  activeSubcategory, 
  onSubcategoryChange,
  category 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter subcategories based on the current category
  const filteredSubcategories = subcategories.filter(sub => {
    if (!category) return true;
    return sub.category === category;
  });

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      >
        <span>{activeSubcategory || 'All Subcategories'}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="py-1">
          <button
            onClick={() => {
              onSubcategoryChange('');
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2 text-left text-sm ${
              !activeSubcategory
                ? 'bg-amber-100 text-amber-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Subcategories
          </button>
          {filteredSubcategories.map((sub) => (
            <button
              key={sub._id}
              onClick={() => {
                onSubcategoryChange(sub.name);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm ${
                activeSubcategory === sub.name
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SubcategoryFilter; 