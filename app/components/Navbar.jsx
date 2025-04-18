"use client";

// components/Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMenu, FiX, FiHome, FiInfo, FiPackage, FiCalendar, FiMail, FiStar } from 'react-icons/fi';

const Navbar = ({ isScrolled }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: 'home', label: 'HOME', href: '/', icon: <FiHome className="w-5 h-5" /> },
    { id: 'about', label: 'ABOUT US', href: '/about-us', icon: <FiInfo className="w-5 h-5" /> },
    { id: 'brands', label: 'OUR BRANDS', href: '/our-brands', icon: <FiStar className="w-5 h-5" /> },
    { id: 'products', label: 'PRODUCTS', href: '/products', icon: <FiPackage className="w-5 h-5" /> },
    { id: 'events', label: 'EVENTS', href: '/events', icon: <FiCalendar className="w-5 h-5" /> },
    { id: 'contact', label: 'CONTACT', href: '/ConductUs', icon: <FiMail className="w-5 h-5" /> },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <motion.nav 
      className={`w-full transition-all duration-500 fixed top-0 left-0 right-0 z-50 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/95 backdrop-blur-md'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-6 md:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between h-20 md:h-20">
          {/* Mobile Navigation */}
          <div className="relative flex items-center justify-between w-full md:hidden pt-3">
            {/* Mobile Menu Button - Left */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-300"
              >
                {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
              </button>
            </div>

            {/* Logo Section - Center for Mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 pt-1">
              <Link href="/" className="flex items-center justify-center py-1">
                <Image
                  src="/logo.png"
                  alt="Golden Extreme Logo"
                  width={180}
                  height={130}
                  className="h-14 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Mobile Search Button - Right */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-300"
              >
                <FiSearch size={22} />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center pt-1">
            <Link href="/" className="flex items-center justify-center py-1">
              <Image
                src="/logo.png"
                alt="Golden Extreme Logo"
                width={180}
                height={130}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4 md:px-8 space-x-2 md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 md:px-4 py-2 mx-1 md:mx-2 text-sm font-medium transition-all duration-300 relative group ${
                  isActive(item.href) 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  isActive(item.href) 
                    ? 'bg-amber-500 scale-x-100' 
                    : 'bg-amber-500 scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 placeholder-gray-400 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors duration-300"
              >
                <FiSearch />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Search Bar - Show when search is open */}
        <div className={`md:hidden w-full py-2 ${isSearchOpen ? 'block' : 'hidden'}`}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 shadow-lg"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-amber-500 hover:text-amber-600 transition-colors duration-300"
            >
              <FiSearch size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-gradient-to-b from-white via-gray-50 to-white z-[100]"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f0f0f0_2px,transparent_0)] bg-[size:40px_40px]" />
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251,191,36,0.03) 0%, rgba(245,158,11,0.02) 100%)',
                  top: '10%',
                  left: '20%',
                  filter: 'blur(60px)',
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>

            <div className="relative w-full h-full flex flex-col items-center px-4">
              {/* Close button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-600 hover:text-amber-600 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiX size={24} />
              </motion.button>

              {/* Content Container */}
              <div className="flex flex-col items-center justify-between h-full w-full py-8">
                {/* Logo Section */}
                <motion.div 
                  className="mt-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Golden Extreme Logo"
                    width={160}
                    height={120}
                    className="w-auto h-24"
                    priority
                  />
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                  className="w-full px-4 mt-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-5 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 shadow-lg"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-amber-500 hover:text-amber-600 transition-colors duration-300"
                    >
                      <FiSearch size={20} />
                    </button>
                  </form>
                </motion.div>

                {/* Menu Items */}
                <div className="flex flex-col items-center justify-center flex-1 space-y-5 mt-8 w-full px-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 ${
                          isActive(item.href)
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-amber-500/10 hover:text-amber-600 shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={isActive(item.href) ? 'text-white' : 'text-amber-500'}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <motion.span
                          animate={{ x: isActive(item.href) ? 5 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Text */}
                <motion.div
                  className="w-full text-center mt-6 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <p className="text-xs text-gray-500">
                    Driven by Golden Extreme Auto Spare Parts LLC. Powered by{' '}
                    <a 
                      href="https://dimark.ae/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 transition-colors duration-200"
                    >
                      Dimark
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;