"use client";
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { submitContactForm } from '../../src/utils/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setFormStatus('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobileNumber || !formData.message) {
      setFormError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    const mobileNumberRegex = /^[+]?[\d]{10,14}$/;
    if (!mobileNumberRegex.test(formData.mobileNumber)) {
      setFormError('Please enter a valid mobile number');
      setIsSubmitting(false);
      return;
    }

    if (formData.message.length < 10) {
      setFormError('Message must be at least 10 characters long');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setFormStatus('Thank you for your message! We will get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          message: ''
        });
      }
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f0f0f0_2px,transparent_0)] bg-[size:40px_40px]" />
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
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200/20 text-amber-700 text-sm font-medium mb-6"
            >
              Get in Touch
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help transform your automotive experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 border border-amber-100/50 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Get in Touch</h2>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: <FaPhone className="w-6 h-6 text-amber-500" />,
                    title: "Phone",
                    content: "+971 586 498 398",
                    link: "tel:+971586498398"
                  },
                  {
                    icon: <FaEnvelope className="w-6 h-6 text-amber-500" />,
                    title: "Email",
                    content: "info@goldenextreme.com",
                    link: "mailto:info@goldenextreme.com"
                  },
                  {
                    icon: <FaMapMarkerAlt className="w-6 h-6 text-amber-500" />,
                    title: "Location",
                    content: "Dubai, UAE"
                  },
                  {
                    icon: <FaClock className="w-6 h-6 text-amber-500" />,
                    title: "Hours",
                    content: "Mon - Fri: 9:00 AM - 6:00 PM"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="bg-amber-50 p-3 rounded-xl group-hover:bg-amber-100 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-amber-500 transition-colors flex items-center"
                        >
                          {item.content}
                          <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 border border-amber-100/50 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm text-black placeholder-gray-500"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm text-black placeholder-gray-500"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm text-black placeholder-gray-500"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm text-black placeholder-gray-500"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm text-black placeholder-gray-500 min-h-[120px] sm:min-h-[150px]"
                    placeholder="Your Message"
                    required
                  />
                </div>
                {formError && (
                  <div className="text-red-500 text-sm sm:text-base">{formError}</div>
                )}
                {formStatus && (
                  <div className="text-green-500 text-sm sm:text-base">{formStatus}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 max-w-6xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100/50 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-amber-100/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.1234567890123!2d55.12345678901234!3d25.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzI0LjQiTiA1NcKwMDcnMjQuNCJF!5e0!3m2!1sen!2sae!4v1234567890!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
                <a 
                  href="https://maps.app.goo.gl/6QRxDYE2WsqJfJ3L6?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 px-6 py-3 rounded-xl shadow-lg">
                    <span className="text-gray-800 font-medium">Click to open in Google Maps</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
