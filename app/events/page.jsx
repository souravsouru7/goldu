"use client";

import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiCalendar, FiBell, FiClock } from 'react-icons/fi';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
              Exciting Events Coming Soon
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Stay tuned for exclusive automotive events, product launches, and special promotions.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <FiCalendar className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Product Launches
              </h3>
              <p className="text-gray-600">
                Be the first to experience our newest tire and wheel collections at our upcoming launch events.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <FiBell className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Special Promotions
              </h3>
              <p className="text-gray-600">
                Exclusive deals and promotional events for our valued customers coming your way.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <FiClock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Service Days
              </h3>
              <p className="text-gray-600">
                Join us for special service days featuring expert advice and maintenance tips.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Want to be the first to know about our upcoming events? Visit our contact page to get in touch!
            </p>
            <Link
              href="/ConductUs"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
