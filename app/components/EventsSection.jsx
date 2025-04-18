"use client";

import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const EventsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 4px 4px, black 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold tracking-wide">
              UPCOMING EVENTS
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
          >
            Join Our Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
              Adventure
            </span>
          </motion.h2>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCalendar className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              We're preparing something exciting for you. Stay tuned for our upcoming events and announcements.
            </p>
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 group"
              >
                <span>Get Notified</span>
                <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;