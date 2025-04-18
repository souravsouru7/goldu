"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDown, FiArrowRight, FiPlus, FiExternalLink, FiChevronRight, FiStar, FiAward, FiShield, FiTrendingUp, FiPlay, FiPause, FiVolume2, FiVolumeX, FiChevronUp, FiChevronDown, FiClock, FiMapPin, FiCheckCircle, FiPackage, FiTruck, FiBattery, FiRotateCw, FiCheck } from 'react-icons/fi';

export default function BrandsPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 300], [0, -50]), { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    if (isWheelSpinning) {
      const animate = () => {
        setRotationAngle(prev => (prev + 2) % 360);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isWheelSpinning]);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const storyContent = [
    {
      title: "Wings of Innovation: The Falcon Legacy",
      content: "In the vast, ever-evolving landscape of the Middle East and North Africa, where the scorching sun meets endless highways and the urban sprawls transition into vast deserts, a brand soared high, leaving a trail of innovation and expertise behind. This is the story of Falcon, a beacon of superior quality and specialized engineering, crafted meticulously to cater to the distinct needs of its domain.",
      video: "/new/fal.mp4",
      icon: <FiAward className="w-8 h-8 text-amber-500" />,
      stats: [
        { label: "Years of Excellence", value: "25+", icon: <FiStar /> },
        { label: "Global Presence", value: "50+", icon: <FiShield /> },
        { label: "Products", value: "1000+", icon: <FiTrendingUp /> }
      ]
    },
    {
      title: "The Spirit of the Falcon",
      content: "Founded on the ideals of precision and resilience, Falcon was named in homage to the national bird of the UAE. The falcon, with its sharp vision, swiftness, and majestic flight, symbolized what the brand aspired to be: powerful, agile, and ahead of its competitors.",
      video: "/new/WhatsApp Video 2025-04-08 at 16.58.23_653a0816.mp4",
      icon: <FiShield className="w-8 h-8 text-amber-500" />,
      stats: [
        { label: "Innovation Rate", value: "95%", icon: <FiTrendingUp /> },
        { label: "Customer Satisfaction", value: "98%", icon: <FiStar /> },
        { label: "Market Share", value: "30%", icon: <FiShield /> }
      ]
    },
    {
      title: "The Tyre Trail: Precision and Perception",
      content: "Falcon's journey began with a singular goal: to design and manufacture tyres that could withstand the diverse terrains and climate of the region. The company ventured into crafting PCR (Passenger Car Radial), TBR (Truck and Bus Radial), and LTR (Light Truck Radial) tyres. Each variant was a masterpiece of advanced technology and understanding of the regional demands. Customers revered Falcon tyres for their durability, reliability, and exceptional performance on both sun-scorched sands and bustling city roads.",
      image: "/new/Falcon tyre 77.png",
      icon: <FiTrendingUp className="w-8 h-8 text-amber-500" />,
      stats: [
        { label: "Tyre Types", value: "15+", icon: <FiStar /> },
        { label: "Production Capacity", value: "1M+", icon: <FiTrendingUp /> },
        { label: "Quality Tests", value: "50+", icon: <FiShield /> }
      ]
    },
    {
      title: "Wheels of Steel: A Revolution in Motion",
      content: "As roads interlinked distant lands and connected people, Falcon expanded its horizons to encompass specialized wheels, including both PCR and TBR. These wheels, crafted with the same precision and passion, became synonymous with strength and stability. Falcon wheels were not just components; they became the backbone of vehicles, offering the steadfastness needed in both urban environments and across desert voyages.",
      image: "/new/Falcon Wheel-min.jpg",
      icon: <FiTruck className="w-8 h-8 text-amber-500" />,
      stats: [
        { label: "Wheel Types", value: "20+", icon: <FiPackage /> },
        { label: "Durability Rating", value: "A+", icon: <FiCheckCircle /> },
        { label: "Market Coverage", value: "40+", icon: <FiMapPin /> }
      ]
    },
    {
      title: "Power Unleashed: The Battery Breakthrough",
      content: "Not content with conquering roads, Falcon took a groundbreaking leap into the energy sector, innovating UPS batteries and Bike Batteries. Here, Falcon's ingenuity shined yet again, offering unmatched energy solutions that powered everything from emergency backup systems in towering skyscrapers to motorbike adventures under the open sky. Every Falcon battery was a testament to safety, longevity, and consistent power supply, illuminating and energizing lives across the region.",
      image: "/new/Falcon Battery-min.jpg",
      icon: <FiBattery className="w-8 h-8 text-amber-500" />,
      stats: [
        { label: "Battery Types", value: "10+", icon: <FiBattery /> },
        { label: "Life Span", value: "5+", icon: <FiClock /> },
        { label: "Efficiency", value: "99%", icon: <FiTrendingUp /> }
      ]
    },
    {
      title: "Flight of the Falcon: A Unified Legacy",
      content: "From tyres to wheels, to batteries — Falcon became the embodiment of trust and innovation. Their products weren't just about meeting demands; they were about anticipating them, providing solutions that encapsulated the spirit of a region known for its rich heritage and promising future. Today, Falcon stands not just as a brand but as a legacy, embodying the United Arab Emirates' values — blending tradition with cutting-edge technology. Like the falcon that inspired its name, the brand continues to glide effortlessly across the landscape, a symbol of what's possible when vision meets expertise.",
      image: "/new/img1.jpg",
      icon: <FiStar className="w-8 h-8 text-amber-500" />,
      stats: [
        { label: "Brand Value", value: "$500M+", icon: <FiTrendingUp /> },
        { label: "Future Vision", value: "2030", icon: <FiClock /> },
        { label: "Legacy", value: "50+", icon: <FiStar /> }
      ]
    }
  ];

  const productCategories = [
    {
      title: "Premium Wheels",
      description: "Experience unmatched quality and performance",
      image: "/new/Falcon Wheel-min.jpg",
      icon: <FiTruck className="w-8 h-8" />,
      features: [
        "Forged Alloy Wheels",
        "Flow Formed Wheels",
        "Custom Finishes",
        "Performance Series"
      ],
      stats: [
        { label: "Sizes Available", value: "30+" },
        { label: "Finish Options", value: "20+" },
        { label: "Warranty", value: "5 Years" }
      ]
    },
    {
      title: "Commercial Wheels",
      description: "Built for heavy-duty performance",
      image: "/new/whiteallow.jpg",
      icon: <FiPackage className="w-8 h-8" />,
      features: [
        "Steel Wheels",
        "Alloy Truck Wheels",
        "Heavy Duty Series",
        "Commercial Grade"
      ],
      stats: [
        { label: "Load Rating", value: "4500kg" },
        { label: "Size Range", value: "15-24\"" },
        { label: "Durability", value: "10/10" }
      ]
    },
    {
      title: "Custom Series",
      description: "Personalized to your style",
      image: "/new/OIP.jpeg",
      icon: <FiStar className="w-8 h-8" />,
      features: [
        "Custom Designs",
        "Exclusive Finishes",
        "Limited Editions",
        "Bespoke Options"
      ],
      stats: [
        { label: "Design Options", value: "100+" },
        { label: "Custom Colors", value: "50+" },
        { label: "Exclusivity", value: "100%" }
      ]
    }
  ];

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Dynamic Background Pattern */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f0f0f0_2px,transparent_0)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#00000003_50%,transparent_75%)] bg-[size:20px_20px]" />
        </div>

        {/* Enhanced Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center z-10 overflow-hidden">
          {/* Animated Wheel Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <motion.div
              className="w-[800px] h-[800px] rounded-full border-[2px] border-amber-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full border-[2px] border-orange-500/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border-[2px] border-yellow-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="relative">
                  <motion.h1 
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 text-[#FF6B00]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Our Brands
                  </motion.h1>
                  
                  {/* Animated Underline */}
                  <motion.div
                    className="h-1 bg-[#FF6B00] rounded-full mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>

                <motion.p 
                  className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mt-8 px-4 md:px-0 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Discover our collection of premium wheels and automotive solutions, crafted with precision and engineered for excellence.
                </motion.p>

                {/* Interactive 3D Wheel Preview */}
                <motion.div
                  className="relative mt-16 mb-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="relative w-64 h-64 mx-auto cursor-pointer group"
                       onMouseEnter={() => setIsWheelSpinning(true)}
                       onMouseLeave={() => setIsWheelSpinning(false)}>
                    <motion.div
                      style={{ rotate: rotationAngle }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src="/new/3dtyre.jpg"
                        alt="Premium Wheel"
                        fill
                        className="object-cover rounded-full"
                      />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FiRotateCw className="w-12 h-12 text-amber-500 drop-shadow-lg" />
                    </div>
                  </div>
                  <p className="text-gray-500 mt-4 text-sm">Hover to spin</p>
                </motion.div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-[#FF6B00] text-white font-medium flex items-center gap-2 shadow-lg shadow-[#FF6B00]/30 group"
                    onClick={() => {
                      const element = document.getElementById('brands-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Our Brands
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-500 text-sm">Scroll to explore</p>
              <FiChevronDown className="w-6 h-6 text-amber-500" />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Story Section */}
        <div id="story-section" className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 text-[#FF6B00]">
                Our Legacy
              </h2>
              <div className="w-16 md:w-24 h-1 bg-[#FF6B00] mx-auto mb-8" />
            </motion.div>

            <div className="max-w-7xl mx-auto">
              {storyContent.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="mb-32 last:mb-0"
                >
                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[600px]">
                    {/* Content Side */}
                    <div className={`relative z-10 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} flex`}>
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl w-full flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-4 mb-10">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                            {story.icon}
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {story.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-12 text-lg">
                          {story.content}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mt-auto">
                          {story.stats.map((stat, statIndex) => (
                            <motion.div
                              key={statIndex}
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 + statIndex * 0.1 }}
                              className="relative group"
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-orange-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                              <div className="relative p-4 text-center">
                                <div className="text-amber-500 mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Video/Image Side */}
                    <div className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} flex h-full`}>
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full rounded-[2rem] overflow-hidden group"
                      >
                        {/* Decorative Elements */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 to-orange-500 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300" />
                        
                        {/* Main Media Container */}
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                          {story.video ? (
                            <video
                              src={story.video}
                              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : story.image && (
                            <Image
                              src={story.image}
                              alt={story.title}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                              priority
                            />
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Video Showcase Section */}
        <div className="relative py-20 z-10 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#FF6B00]">
                Experience Excellence
              </h2>
              <div className="w-24 h-1 bg-[#FF6B00] rounded-full mx-auto mb-8" />
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                Witness the perfect blend of innovation, craftsmanship, and performance
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl group"
              >
                {/* Video Background Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300" />
                
                {/* Main Video Container */}
                <div 
                  className="relative h-[300px] w-full rounded-3xl overflow-hidden border border-gray-200"
                  ref={useCallback(node => {
                    if (!node) return;
                    const observer = new IntersectionObserver(
                      ([entry]) => {
                        if (entry.isIntersecting) {
                          node.querySelector('video').play();
                        }
                      },
                      { threshold: 0.5 }
                    );
                    observer.observe(node);
                    return () => observer.disconnect();
                  }, [])}
                >
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/new iamges/golden-2.jpg"
                  >
                    <source src="/new/WhatsApp Video 2025-04-08 at 16.58.23_653a0816.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              {/* Video Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: <FiAward className="w-6 h-6" />,
                    title: "Premium Quality",
                    description: "Every wheel is crafted to perfection"
                  },
                  {
                    icon: <FiShield className="w-6 h-6" />,
                    title: "Tested & Certified",
                    description: "Rigorous quality control standards"
                  },
                  {
                    icon: <FiTrendingUp className="w-6 h-6" />,
                    title: "Performance Driven",
                    description: "Engineered for optimal performance"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Brands Showcase Section */}
        <div id="brands-section" className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#FF6B00]">
                Premium Collections
              </h2>
              <div className="w-24 h-1 bg-[#FF6B00] rounded-full mx-auto mb-4" />
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                Explore our exclusive range of premium wheels, designed for performance and crafted for excellence
              </p>
            </motion.div>

            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-primary-600">{category.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{category.description}</p>
                      <div className="space-y-4 mb-6">
                        {category.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <FiCheck className="text-primary-600" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-auto">
                        {category.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Final CTA Section */}
        <div className="relative py-20 z-10 bg-gray-50">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#00000005_1px,transparent_0)] bg-[size:20px_20px]" />
          </div>
          
          {/* Animated Background Circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0) 70%)',
                top: '10%',
                right: '5%',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0) 70%)',
                bottom: '10%',
                left: '5%',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto text-center"
            >
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-[#FF6B00]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Ready to Transform Your Journey?
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Experience the perfect blend of style, performance, and innovation with our premium wheel collections
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 rounded-xl bg-[#FF6B00] text-white font-medium flex items-center gap-3 shadow-lg shadow-[#FF6B00]/30 overflow-hidden hover:bg-[#FF8533] transition-colors duration-300"
                >
                  <span className="relative z-10">View All Collections</span>
                  <FiArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF8533] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
                
                <motion.a
                  href="/ConductUs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 rounded-xl bg-white text-gray-700 font-medium flex items-center gap-3 border border-gray-200 hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                >
                  Contact Sales Team
                  <FiExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[
                  { value: "10K+", label: "Happy Customers" },
                  { value: "50+", label: "Countries Served" },
                  { value: "100%", label: "Quality Assured" },
                  { value: "24/7", label: "Support Available" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}