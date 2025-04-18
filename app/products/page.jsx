"use client"

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowDown } from 'react-icons/fi';
import BrandSlider from '../components/BrandSlider';
import Image from 'next/image';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category') || 'all';
  const searchQueryParam = searchParams?.get('search') || '';
  
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [refreshKey, setRefreshKey] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const tier1Content = {
    description: "By partnering with these industry giants, Golden Extreme guarantees a superior selection, delivering unmatched quality and trust with every purchase.",
    partners: [
      { name: "Michelin", desc: "Renowned for their innovation and premium tyre solutions." },
      { name: "Bridgestone", desc: "Leaders in advanced tyre technology and sustainability." },
      { name: "Goodyear", desc: "Known for their extensive range and cutting-edge designs." },
      { name: "Pirelli", desc: "Famous for their high-performance and luxury vehicle tyres." },
      { name: "Continental", desc: "Experts in safety-focused and durable tyre production." },
      { name: "Sailun Group", desc: "Recognized for producing cost-efficient tires using advanced technology, aiming to balance affordability with performance across global markets." },
      { name: "Double Coin Holdings", desc: "Known for manufacturing reliable and durable commercial truck and bus tires, often preferred for their value and longevity." },
      { name: "Zc Rubber", desc: "One of China's largest tire manufacturers, emphasizing environmental sustainability and advanced engineering in producing a wide range of tire products." }
    ]
  };

  const tier2Content = {
    description: "This partnership allows us to provide quality and variety, ensuring customers find the perfect fit for their needs.",
    partners: [
      { name: "Yokohama Rubber Company", desc: "Offers technologically advanced tyres designed for performance and comfort, with a focus on environmental sustainability." },
      { name: "Kumho Tire", desc: "Offers a wide range of tyres with a focus on safety, performance, and value, suitable for a variety of vehicles including cars and light trucks." },
      { name: "Hankook Tire", desc: "Provides high-quality tyres known for their durability and advanced technology, catering to both commercial and passenger vehicles." },
      { name: "Nexen Tire", desc: "Known for its innovative designs and technology, Nexen provides reliable and high-performance tyres for passenger vehicles, trucks, and SUVs." },
      { name: "Falken Tire", desc: "Specializes in ultra-high-performance tyres, they are popular in motorsports and among enthusiasts looking for superior grip and handling." },
      { name: "Toyo Tire", desc: "Produces durable tyres known for their quiet ride and longevity, suitable for both everyday driving and challenging conditions." },
      { name: "Linglong tire", desc: "A prominent Tier 2 manufacturer known for its affordable and increasingly quality-driven tire options, with expanding research and development efforts." },
      { name: "Aeolus Tyres", desc: "Specializes in producing economical and durable tires for commercial vehicles, focused on offering good performance across diverse driving conditions." },
      { name: "Traingle Tyres", desc: "A versatile Tier 2 manufacturer producing a wide variety of tires, highly regarded for its affordability and commitment to innovation." },
      { name: "Goodride Tires", desc: "Offers a broad range of value-focused tires, recognized for their reliability and balance of performance at competitive prices." },
      { name: "Westltake Tires", desc: "Produced by ZC Rubber, known for delivering budget-friendly, dependable tires with a growing emphasis on technology and global market reach." }
    ]
  };

  const tier3Content = {
    description: "To provide an array of options to suit your driving needs. Whether for everyday use or specific requirements, our tires deliver performance and value you can trust.",
    partners: [
      { name: "Apollo Tyres", desc: "Offers reliable and economical tire solutions, expanding its global footprint with a focus on innovation and sustainability." },
      { name: "Ceat Tyres", desc: "Known for producing cost-effective and durable tires, particularly in the truck and bus segments, emphasizing customer satisfaction." },
      { name: "Tationg Tires", desc: "Provides budget-friendly tire options, focusing on meeting essential performance needs for everyday vehicles." },
      { name: "Doublestar Tyres", desc: "Specializes in affordable tire offerings with increasing investments in intelligent manufacturing and environmentally friendly technology." },
      { name: "Maxxis Tyre", desc: "Delivers trusted, value-oriented tires known for respectable performance and unique design features across various vehicle categories." },
      { name: "Roadone Tyres", desc: "Offers competitively priced tires, focusing on delivering dependable performance and safety for a wide range of vehicle." },
      { name: "Jinjyu Tire", desc: "Recognized for producing economically priced tires with adequate performance, targeting the budget segment of the global tire market." }
    ]
  };

  useEffect(() => {
    const handleRouteChange = () => {
      console.log("Route changed - refreshing products");
      setRefreshKey(prevKey => prevKey + 1);
      
      // Update the search query from URL params when route changes
      const newSearchParams = new URLSearchParams(window.location.search);
      const newSearchQuery = newSearchParams.get('search') || '';
      setSearchQuery(newSearchQuery);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearchQuery(searchQueryParam);
    console.log("Category param updated:", categoryParam);
    console.log("Search query param updated:", searchQueryParam);
    
    // If there's a search query, scroll to the products section
    if (searchQueryParam) {
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
    // Existing code for category scrolling
    else if (categoryParam !== 'all') {
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  }, [categoryParam, searchQueryParam]);

  const handleCategoryClick = (category) => {
    // Redirect to dedicated category pages instead of filtering on the same page
    switch(category) {
      case 'TYRES':
        router.push('/products/tyres');
        break;
      case 'WHEELS':
        router.push('/products/wheels');
        break;
      case 'BATTERIES':
        router.push('/products/batteries');
        break;
      default:
        router.push('/products');
    }
  };

  const isCategoryActive = (displayCategory) => {
    const categoryMapping = {
      'TYRES': 'tyres',
      'WHEELS': 'wheels', 
      'BATTERIES': 'batteries'
    };
    
    return activeCategory === categoryMapping[displayCategory];
  };

  // Update the search input in the products page
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Update URL with search parameter without page reload
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-x-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f0f0f0_2px,transparent_0)] bg-[size:40px_40px]" />
        </div>

        <div className="fixed inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,200,0,0.03) 0%, rgba(255,140,0,0.02) 100%)',
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
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,140,0,0.03) 0%, rgba(255,100,0,0.02) 100%)',
              bottom: '10%',
              right: '20%',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="relative mb-32 md:mb-48 w-full max-w-[100vw] overflow-hidden">
          <div className="w-full relative">
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10 rounded-3xl mx-auto max-w-7xl" />
            <img 
              src="/new/ADM_4502.JPG" 
              alt="Premium Automotive Collection" 
              className="w-full h-[600px] object-cover rounded-3xl mx-auto max-w-7xl shadow-2xl"
              style={{ objectPosition: 'center center' }}
            />
            
            <div className="absolute bottom-[-120px] right-[10%] z-20 hidden md:block">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[300px] w-[400px]">
                <Image
                  src="/new/img2.jpg"
                  alt="Featured Product"
                  width={400}
                  height={300}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLzYvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLz/2wBDAR0dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dHR4dLz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-16 rounded-3xl mx-auto max-w-7xl z-20">
            <div className="max-w-xl w-full">
              <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-white/20 shadow-xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white">
                  Premium Collection
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl max-w-3xl text-white/90 font-medium">
                  Discover Our Range of High-Quality Automotive Products
                </p>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link 
                    href="#products" 
                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg inline-flex items-center group"
                  >
                    View Products
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link 
                    href="/ConductUs" 
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          className="relative z-30 container mx-auto px-4 mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-4 sm:p-8 shadow-xl border border-amber-100/50 overflow-x-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-xl"></div>
                <Image
                  src="/logo.png"
                  alt="Golden Extreme Logo"
                  width={128}
                  height={128}
                  className="object-contain relative z-10"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-2">
                Golden Extreme
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 sm:gap-6 md:gap-12">
              {['TYRES', 'WHEELS', 'BATTERIES'].map((category) => (
                <motion.div
                  key={category}
                  className="cursor-pointer w-full sm:w-auto"
                  onClick={() => handleCategoryClick(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: category === 'TYRES' ? 0.1 : category === 'WHEELS' ? 0.2 : 0.3 }}
                >
                  <div className="rounded-xl px-4 sm:px-8 py-3 sm:py-5 w-full sm:w-40 text-center font-bold shadow-lg transition-all duration-300 bg-white text-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:shadow-xl">
                    {category}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="py-16 md:py-24 px-4 mb-16 md:mb-24 relative overflow-hidden z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-amber-50 to-amber-50/50 z-0" />
          
          <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"></div>
          
          <div className="container mx-auto relative z-10">
            <motion.div
              className="absolute right-0 top-0 md:w-1/2 w-full h-full opacity-20 md:opacity-100 hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image
                src="/new/DSC00923.jpg"
                alt="Battery 3D"
                width={500}
                height={500}
                className="object-contain w-full h-full"
              />
            </motion.div>
            
            <div className="md:max-w-2/3 relative">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                FALCON BATTERIES
              </motion.h2>
              <div className="max-w-xl md:max-w-2xl">
                <motion.p 
                  className="text-gray-600 text-base md:text-xl leading-relaxed mb-6 md:mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Falcon Batteries – Powering Bikes and UPS Systems with Reliability Golden Extreme 
                  Trading offers Falcon Batteries, known for their superior performance and reliability. Our 
                  range includes high-quality bike batteries that deliver consistent starting power and long-lasting 
                  performance, ensuring a smooth ride in all conditions. We also provide Falcon UPS 
                  batteries, designed to offer uninterrupted power supply for critical systems, providing 
                  dependable backup during outages. Whether for bikes or UPS systems, Falcon Batteries are 
                  built to meet your power needs with durability and efficiency.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col md:flex-row justify-start items-stretch space-y-4 md:space-y-0 md:space-x-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href="/products?category=batteries&type=bike"
                    className="w-full md:w-auto bg-gradient-to-r from-amber-600 to-orange-600 px-6 md:px-8 py-4 rounded-xl text-white text-lg md:text-xl font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span className="text-amber-200 mr-3 text-2xl group-hover:mr-4 transition-all duration-300">•</span>
                    BIKE BATTERIES
                  </Link>
                  <Link 
                    href="/products?category=batteries&type=ups"
                    className="w-full md:w-auto bg-gradient-to-r from-amber-600 to-orange-600 px-6 md:px-8 py-4 rounded-xl text-white text-lg md:text-xl font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span className="text-amber-200 mr-3 text-2xl group-hover:mr-4 transition-all duration-300">•</span>
                    UPS BATTERIES
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Mobile Image */}
            <motion.div
              className="mt-8 md:hidden w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/new/DSC00923.jpg"
                alt="Battery 3D"
                width={300}
                height={300}
                className="object-contain rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="py-12 px-4 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white z-0" />
          
          <div className="container mx-auto relative z-10">
            <motion.h2 
              className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              PREMIUM PARTNERSHIPS
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-10 px-4 sm:px-6 md:px-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className={`group relative bg-gradient-to-br from-white to-amber-50/50 rounded-3xl overflow-hidden shadow-xl border border-amber-100/50 backdrop-blur-sm ${expandedCard === 'tier1' ? 'md:col-span-3' : ''}`}
                whileHover={{ 
                  scale: expandedCard === 'tier1' ? 1 : 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">TIER 1</h3>
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    We partner with industry leaders known for their superior quality and innovation in the automotive world.
                  </p>
                  {expandedCard === 'tier1' ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-base text-gray-600 italic border-l-4 border-amber-500 pl-4">{tier1Content.description}</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tier1Content.partners.map((partner, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          >
                            <h4 className="font-bold text-amber-600 mb-2 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                              {partner.name}
                            </h4>
                            <p className="text-gray-600 text-sm">{partner.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <ul className="space-y-4">
                      {tier1Content.partners.slice(0, 3).map((partner, index) => (
                        <li key={index} className="flex items-center space-x-3 group/item hover:bg-amber-50 p-2 rounded-lg transition-all duration-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 group-hover/item:scale-150 transition-transform duration-300"></div>
                          <span className="font-semibold text-amber-600">{partner.name}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-600 line-clamp-1 group-hover/item:line-clamp-none transition-all duration-300">{partner.desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => setExpandedCard(expandedCard === 'tier1' ? null : 'tier1')}
                    className="mt-6 group/btn relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-transform duration-300 group-hover/btn:scale-105"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {expandedCard === 'tier1' ? 'Show Less' : 'Read More'}
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${expandedCard === 'tier1' ? 'rotate-180' : ''} group-hover/btn:translate-x-1`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className={`group relative bg-gradient-to-br from-white to-amber-50/50 rounded-3xl overflow-hidden shadow-xl border border-amber-100/50 backdrop-blur-sm ${expandedCard === 'tier2' ? 'md:col-span-3' : ''}`}
                whileHover={{ 
                  scale: expandedCard === 'tier2' ? 1 : 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">TIER 2</h3>
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Quality-focused manufacturers that balance performance and value for diverse driving needs.
                  </p>
                  {expandedCard === 'tier2' ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-base text-gray-600 italic border-l-4 border-amber-500 pl-4">{tier2Content.description}</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tier2Content.partners.map((partner, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          >
                            <h4 className="font-bold text-amber-600 mb-2 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                              {partner.name}
                            </h4>
                            <p className="text-gray-600 text-sm">{partner.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <ul className="space-y-4">
                      {tier2Content.partners.slice(0, 3).map((partner, index) => (
                        <li key={index} className="flex items-center space-x-3 group/item hover:bg-amber-50 p-2 rounded-lg transition-all duration-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 group-hover/item:scale-150 transition-transform duration-300"></div>
                          <span className="font-semibold text-amber-600">{partner.name}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-600 line-clamp-1 group-hover/item:line-clamp-none transition-all duration-300">{partner.desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => setExpandedCard(expandedCard === 'tier2' ? null : 'tier2')}
                    className="mt-6 group/btn relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-transform duration-300 group-hover/btn:scale-105"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {expandedCard === 'tier2' ? 'Show Less' : 'Read More'}
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${expandedCard === 'tier2' ? 'rotate-180' : ''} group-hover/btn:translate-x-1`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className={`group relative bg-gradient-to-br from-white to-amber-50/50 rounded-3xl overflow-hidden shadow-xl border border-amber-100/50 backdrop-blur-sm ${expandedCard === 'tier3' ? 'md:col-span-3' : ''}`}
                whileHover={{ 
                  scale: expandedCard === 'tier3' ? 1 : 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">TIER 3</h3>
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Reliable manufacturers offering quality products at accessible price points.
                  </p>
                  {expandedCard === 'tier3' ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-base text-gray-600 italic border-l-4 border-amber-500 pl-4">{tier3Content.description}</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tier3Content.partners.map((partner, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          >
                            <h4 className="font-bold text-amber-600 mb-2 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                              {partner.name}
                            </h4>
                            <p className="text-gray-600 text-sm">{partner.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <ul className="space-y-4">
                      {tier3Content.partners.slice(0, 3).map((partner, index) => (
                        <li key={index} className="flex items-center space-x-3 group/item hover:bg-amber-50 p-2 rounded-lg transition-all duration-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 group-hover/item:scale-150 transition-transform duration-300"></div>
                          <span className="font-semibold text-amber-600">{partner.name}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-600 line-clamp-1 group-hover/item:line-clamp-none transition-all duration-300">{partner.desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => setExpandedCard(expandedCard === 'tier3' ? null : 'tier3')}
                    className="mt-6 group/btn relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-transform duration-300 group-hover/btn:scale-105"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {expandedCard === 'tier3' ? 'Show Less' : 'Read More'}
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${expandedCard === 'tier3' ? 'rotate-180' : ''} group-hover/btn:translate-x-1`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/our-brands"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg inline-flex items-center group"
              >
                Explore All Brand Partnerships
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img 
              src="/new/sports12.webp" 
              alt="Performance Tyres" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20">
            <motion.div 
              className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm p-10 rounded-3xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                UNCOMPROMISING <span className="text-amber-400">PERFORMANCE</span>
              </motion.h2>
              
              <motion.p 
                className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                At Golden Extreme, we recognize that every vehicle has unique requirements. Our extensive range of premium products is tailored for optimal performance and safety across all conditions. Our commitment to quality and service means you can trust us to provide the perfect solutions to meet the demands of your journey.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/products/tyres" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600">
                  Explore Tyres
                </Link>
                <Link href="/products/wheels" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600">
                  Discover Wheels
                </Link>
                <Link href="/products/batteries" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600">
                  View Batteries
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Product Categories Overview */}
        <div className="relative z-10 py-12 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Wheels Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="relative group">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative rounded-[2rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-500 group-hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 mix-blend-overlay group-hover:opacity-75 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
                      <Image
                        src="/new/whiteallow.jpg"
                        alt="Premium Wheels"
                        width={300}
                        height={300}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform transition-transform duration-500 group-hover:translate-y-0"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-bold text-white">Premium Alloyee</h3>
                        </div>
                        <p className="text-base sm:text-lg text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Experience the perfect blend of style and performance
                        </p>
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm">
                            High Performance
                          </span>
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm">
                            Premium Quality
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="p-8 bg-gradient-to-br from-white to-amber-50 rounded-[2rem] shadow-xl border border-amber-100/50"
                    >
                      <div className="relative mb-8">
                        <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                          Premium Wheels
                        </h2>
                        <span className="absolute -top-6 left-0 text-8xl font-bold text-amber-100/50 -z-10">
                          WHEELS
                        </span>
                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mt-4" />
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed text-gray-600 mb-8">
                        At Golden Extreme Trading, we offer a curated selection of premium wheels that combine cutting-edge technology with stunning aesthetics. Each wheel is engineered to deliver exceptional performance and elevate your vehicle's appearance.
                      </p>
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        {[
                          {
                            title: "Premium Materials",
                            desc: "Aerospace-grade alloys",
                            icon: "🛡️"
                          },
                          {
                            title: "Enhanced Safety",
                            desc: "Rigorous testing standards",
                            icon: "⚡"
                          },
                          {
                            title: "Superior Durability",
                            desc: "Built to last longer",
                            icon: "💪"
                          },
                          {
                            title: "Optimal Performance",
                            desc: "Maximum efficiency",
                            icon: "🎯"
                          }
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                                {feature.icon}
                              </span>
                              <div>
                                <h3 className="font-semibold text-gray-800 mb-1">
                                  {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {feature.desc}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      >
                        Explore Collection
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Falcon Wheels Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="p-8 bg-gradient-to-br from-white to-amber-50 rounded-[2rem] shadow-xl border border-amber-100/50"
                    >
                      <div className="relative mb-8">
                        <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                          FALCON WHEELS
                        </h2>
                        <span className="absolute -top-6 left-0 text-8xl font-bold text-amber-100/50 -z-10">
                          FALCON
                        </span>
                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mt-4" />
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed text-gray-600 mb-8">
                        Golden Extreme Trading proudly offers Falcon Wheels, renowned for their exceptional quality and performance in both Passenger Car Radial (PCR) and Truck and Bus Radial (TBR) categories.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <motion.div 
                          className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-2">PCR Wheels</h3>
                              <p className="text-gray-600">
                                Deliver a smooth, fuel-efficient, and reliable driving experience for everyday vehicles
                              </p>
                              <ul className="mt-4 space-y-2">
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                                  Enhanced Grip Performance
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                                  Fuel Efficiency Design
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-2">TBR Wheels</h3>
                              <p className="text-gray-600">
                                Built for heavy-duty trucks and buses, offering maximum strength, durability, and load-bearing capacity
                              </p>
                              <ul className="mt-4 space-y-2">
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                                  Maximum Load Capacity
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                                  Extended Durability
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      >
                        <Link href="/products?category=wheels" className="flex items-center gap-2">
                          Explore Falcon Collection
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="order-1 lg:order-2">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative group rounded-[2rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-500 group-hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 mix-blend-overlay group-hover:opacity-75 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
                      <Image
                        src="/new/golden-3.jpg"
                        alt="Falcon Wheels"
                        width={300}
                        height={300}
                        className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform transition-transform duration-500"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-bold text-white">Falcon Wheels</h3>
                        </div>
                        <p className="text-base sm:text-lg text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          High-Performance PCR and TBR Solutions
                        </p>
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm">
                            Premium Quality
                          </span>
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm">
                            Superior Performance
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Batteries Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative group">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative rounded-[2rem] overflow-hidden shadow-2xl transform-gpu transition-all duration-500 group-hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 mix-blend-overlay group-hover:opacity-75 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
                      <Image
                        src="/new/DSC00923.jpg"
                        alt="Falcon Batteries"
                        width={300}
                        height={300}
                        className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform transition-transform duration-500"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-bold text-white">Falcon Batteries</h3>
                        </div>
                        <p className="text-base sm:text-lg text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Powering Your Journey with Reliable Energy Solutions
                        </p>
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm">
                            Superior Performance
                          </span>
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm">
                            Long-lasting Power
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="p-8 bg-gradient-to-br from-white to-amber-50 rounded-[2rem] shadow-xl border border-amber-100/50"
                    >
                      <div className="relative mb-6">
                        <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                          FALCON BATTERIES
                        </h2>
                        <span className="absolute -top-6 left-0 text-8xl font-bold text-amber-100/50 -z-10">
                          POWER
                        </span>
                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mt-4" />
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed text-gray-600 mb-6">
                        Falcon Batteries are engineered for excellence, delivering superior performance and unwavering reliability. Our comprehensive range includes specialized solutions for both automotive and backup power needs.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <motion.div 
                          className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-2">Bike Batteries</h3>
                              <p className="text-gray-600">
                                Consistent starting power and long-lasting performance for a smooth ride in all conditions
                              </p>
                              <ul className="mt-4 space-y-2">
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                                  Quick Start Technology
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                                  Weather Resistant
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-2">UPS Batteries</h3>
                              <p className="text-gray-600">
                                Reliable backup power solutions ensuring uninterrupted operation of critical systems
                              </p>
                              <ul className="mt-4 space-y-2">
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                                  Extended Backup Time
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                                  Low Maintenance
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      >
                        <Link href="/products/batteries" className="flex items-center gap-2">
                          Explore Battery Collection
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div id="products" className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse our collection of premium {activeCategory !== 'all' ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) : 'products'} 
              designed to provide optimal performance and reliability.
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm text-gray-900"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <ProductGrid 
            key={refreshKey}
            activeCategory={activeCategory} 
            searchQuery={searchQuery} 
          />
        </div>

        {/* Add BrandSlider component */}
        <BrandSlider />

      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </Layout>
  );
}