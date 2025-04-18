'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const router = useRouter();

  const faqs = [
    {
      question: "What types of tires do you offer?",
      answer: "We offer a comprehensive range of tires including performance, all-season, off-road, and commercial vehicle tires from premium brands.",
      icon: "🚗"
    },
    {
      question: "Do you provide tire installation services?",
      answer: "Yes, we provide professional tire installation services with state-of-the-art equipment and experienced technicians.",
      icon: "🔧"
    },
    {
      question: "What is your warranty policy?",
      answer: "Our tires come with manufacturer warranties, and we offer additional coverage options. Specific warranty terms vary by product.",
      icon: "📜"
    },
    {
      question: "How often should I rotate my tires?",
      answer: "We recommend rotating your tires every 5,000-8,000 kilometers to ensure even wear and optimal performance.",
      icon: "🔄"
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we provide international shipping services to select countries. Contact us for specific shipping details and rates.",
      icon: "🌍"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(234, 179, 8, 0)',
        '0 0 40px rgba(234, 179, 8, 0.3)',
        '0 0 20px rgba(234, 179, 8, 0)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 4px 4px, black 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(234, 179, 8, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)
          `
        }}
      >
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
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold tracking-wide">
              FAQ
            </span>
          </motion.div>
          
          <motion.h2 
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
              Frequently Asked
            </span>
            <br />
            <span className="text-gray-900">Questions</span>
          </motion.h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group"
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                whileHover={{ y: -4 }}
                variants={glowVariants}
                animate={hoveredIndex === index ? "animate" : ""}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{faq.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    {activeIndex === index ? (
                      <FiMinus className="w-6 h-6 text-yellow-500" />
                    ) : (
                      <FiPlus className="w-6 h-6 text-yellow-500" />
                    )}
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="mt-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="pl-12 border-l-2 border-yellow-500"
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/ConductUs')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold inline-flex items-center group"
          >
            <span>Contact Support</span>
            <motion.div
              className="ml-2"
              animate={{
                x: hoveredIndex === 'button' ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FaqSection;
