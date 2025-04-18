"use client";
import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FloatingContactIcons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-4 z-50">
      <motion.a 
        href="mailto:info@goldenextreme.com" 
        className="bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition-colors duration-300"
        aria-label="Email us"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaEnvelope size={24} />
      </motion.a>
      <motion.a 
        href="tel:+97142229799" 
        className="bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition-colors duration-300"
        aria-label="Call us"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPhone size={24} />
      </motion.a>
      <motion.a 
        href="https://wa.me/971586498398" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition-colors duration-300"
        aria-label="WhatsApp us"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp size={24} />
      </motion.a>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition-colors duration-300"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowUp size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default FloatingContactIcons;