"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Layout from '../components/Layout';
import { FiAward, FiUsers, FiTarget, FiTruck, FiMapPin, FiClock, FiCheck, FiArrowRight, FiStar, FiShield, FiTrendingUp, FiPackage, FiDollarSign, FiHeadphones, FiTruck as FiLogistics, FiBookOpen, FiCheckCircle, FiChevronDown, FiChevronUp, FiPlay, FiPause, FiVolume2, FiVolumeX, FiHome, FiInfo, FiMail, FiCalendar } from 'react-icons/fi';

export default function AboutUs() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const isVideoInView = useInView(videoContainerRef, { once: false });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isVideoInView && videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else if (!isVideoInView && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [isVideoInView]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const scrollToStory = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      const offset = 100; // Adjust for header height
      const elementPosition = storySection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const timelineData = [
    { year: '1974', title: 'Taleb Group Founded', description: 'The Taleb Group established with successful ventures in various industries' },
    { year: '2006', title: 'Golden Extreme Journey Begins', description: 'Specializing in high-quality tires to meet diverse customer needs' },
    { year: '2014', title: 'Operations Expansion', description: 'Expanded operations reinforcing commitment to excellence and customer satisfaction' },
    { year: '2023', title: 'Industry Leadership', description: 'Leading the market with over 150,000 sq ft of warehouse space and 120+ sales points' }
  ];

  const features = [
    {
      icon: <FiPackage className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Vast Inventory",
      description: "Extensive selection of tires for passenger cars, trucks, agricultural machinery, and industrial equipment"
    },
    {
      icon: <FiDollarSign className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Competitive Pricing",
      description: "Competitive wholesale pricing with bulk purchase discounts and flexible pricing models"
    },
    {
      icon: <FiUsers className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Dedicated Support",
      description: "Experienced account managers committed to understanding your business needs"
    },
    {
      icon: <FiLogistics className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Efficient Logistics",
      description: "Robust supply chain and dependable logistics for timely delivery"
    },
    {
      icon: <FiBookOpen className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Industry Expertise",
      description: "Exclusive access to industry insights and professional training seminars"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Quality Assurance",
      description: "Premium tire solutions backed by expert technical support"
    }
  ];

  const commitments = [
    {
      icon: <FiDollarSign className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Flexible Payment Solutions",
      description: "Business-friendly payment options that align with your financial plans"
    },
    {
      icon: <FiStar className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Exclusive Offers for Partners",
      description: "Exclusive deals and previews of new product lines available only to our wholesale partners"
    },
    {
      icon: <FiHeadphones className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Post-Purchase Support",
      description: "Dedicated support team always ready to assist with any queries or issues"
    }
  ];

  const stats = [
    { value: "150,000+", label: "Sq Ft Warehouse", icon: <FiPackage className="w-6 h-6" /> },
    { value: "120+", label: "Sales Points", icon: <FiMapPin className="w-6 h-6" /> },
    { value: "1974", label: "Established", icon: <FiStar className="w-6 h-6" /> },
    { value: "100%", label: "Customer Satisfaction", icon: <FiCheckCircle className="w-6 h-6" /> }
  ];

  const navItems = [
    { label: "Story", target: "story" },
    { label: "Journey", target: "journey" },
    { label: "Mission", target: "mission" },
    { label: "Features", target: "features" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Background Effects */}
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] md:h-[80vh] overflow-hidden"
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0"
          >
            <Image
              src="/new/ADM_4501.webp"
              alt="Golden Extreme Showroom"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          </motion.div>
          <div className="relative h-full flex items-center justify-center text-center px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl w-full"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6"
              >
                Welcome to <span className="text-amber-500 relative">
                  Golden Extreme
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                </span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 px-4 md:px-0"
              >
                A distinguished division of the Taleb Group, shaping the future of the tire industry
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-8 md:mt-12"
              >
                <button 
                  onClick={scrollToStory}
                  className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-xl font-medium shadow-lg hover:bg-amber-600 transition-all duration-300 group"
                >
                  Discover Our Story 
                  <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="relative z-10 -mt-16 md:-mt-24 mb-12 md:mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-2 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="sticky top-20 z-50 py-4 bg-white/90 backdrop-blur-md border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.target)}
                  className="relative group px-3 py-2"
                >
                  <span className="text-gray-600 group-hover:text-amber-600 font-medium transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id="story" className="relative py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our <span className="text-amber-600 relative">
                  Story
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 text-gray-700"
              >
                <p className="text-sm md:text-base leading-relaxed">
                  Welcome to Golden Extreme Auto Spare Parts, a distinguished division of the Taleb Group, established with a vision to provide top-tier auto spare parts across the Middle East and Africa. The Taleb Group, founded in 1974, has built a reputable legacy through successful ventures in various industries, and we are proud to be part of this esteemed lineage.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  In 2006, we embarked on a new journey, specializing in high-quality tires, aimed at meeting the diverse needs of our customers. Recognizing the growing demand and the ever-evolving landscape of the automotive industry, we expanded our operations in 2014, reinforcing our commitment to excellence and customer satisfaction.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  At Golden Extreme, we are more than just a tire distributor—we are shaping the future of the tire industry in the UAE and beyond. With over 150,000 sq ft of warehouse space and a robust network of 120+ sales points, we ensure that our customers across the region have access to premium tire solutions. Our dedicated team of experienced salespeople and an in-house engineer for claims handling ensures the highest level of service and technical support.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  We take pride in our premium tire solutions designed for the demanding needs of fleets, tire shops, and dealers. Built on the enduring values of our family-owned enterprise, Golden Extreme continues to follow a path of innovation and service, maintaining a reputation for reliability, performance, and exceptional customer care.
                </p>
              </motion.div>

              <motion.div
                ref={videoContainerRef}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted={isVideoMuted}
                    controls
                    onError={(e) => {
                      console.error('Video error:', e.target.error);
                    }}
                    onCanPlay={() => {
                      console.log('Video can play');
                      if (videoRef.current) {
                        videoRef.current.play().catch(error => {
                          console.error('Error playing video:', error);
                        });
                      }
                    }}
                  >
                    <source src="/new/our story.mov" type="video/mp4" />
                   
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Our Company Profile</h3>
                        <p className="text-sm md:text-base">Experience our journey and commitment to excellence</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={toggleVideoPlayback}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
                        >
                          {isVideoPlaying ? <FiPause className="w-6 h-6" /> : <FiPlay className="w-6 h-6" />}
                        </button>
                        <button
                          onClick={toggleVideoMute}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
                        >
                          {isVideoMuted ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="journey" className="relative py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">Our Journey</h3>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200" />
                <div className="space-y-12">
                  {timelineData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <h4 className="text-lg md:text-xl font-bold text-amber-600 mb-1">{item.title}</h4>
                        <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                      </div>
                      <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-amber-500 rounded-full shadow-lg">
                        <span className="text-white font-bold">{item.year}</span>
                      </div>
                      <div className="w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="relative py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our <span className="text-amber-600 relative">
                  Mission
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <FiTarget className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  To meet today's needs while anticipating the challenges of tomorrow. With a foundation of trust, customer focus, and industry expertise, Golden Extreme is committed to leading the market and creating long-lasting partnerships. We are the future of this market—and we invite you to join us on this journey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <FiCheck className="w-5 h-5 text-amber-500 mr-2" />
                    <span className="text-sm md:text-base text-gray-700">Trust</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="w-5 h-5 text-amber-500 mr-2" />
                    <span className="text-sm md:text-base text-gray-700">Customer Focus</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="w-5 h-5 text-amber-500 mr-2" />
                    <span className="text-sm md:text-base text-gray-700">Industry Expertise</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Our Commitment to Your Business</h3>
                <p className="text-sm md:text-base text-gray-700 mb-8">
                  Our goal is to partner with you for long-term growth and success. At our showroom, you'll find:
                </p>
                <div className="space-y-6">
                  {commitments.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start group"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-amber-200 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors duration-300">{item.title}</h4>
                        <p className="text-sm md:text-base text-gray-700">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our <span className="text-amber-600 relative">
                  Features
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 group-hover:text-amber-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}