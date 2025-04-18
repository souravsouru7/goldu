"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
          background: #fff;
        }

        .text-gold {
          background: linear-gradient(45deg, #FFD700, #DAA520, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          font-weight: 700;
        }

        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .header-container.scrolled {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .main-content {
          margin-top: 80px;
          position: relative;
          z-index: 1;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #FFD700, #DAA520);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #DAA520, #FFD700);
        }

        /* Selection Color */
        ::selection {
          background: rgba(234, 179, 8, 0.2);
          color: #000;
        }
      `}</style>

      <div className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
        <Navbar isScrolled={isScrolled} />
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(234, 179, 8, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(234, 179, 8, 0.15) 0%, transparent 50%)
            `
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      <main className="main-content flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
} 