"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiMapPin, FiDollarSign, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import { getEvents } from '../../src/utils/api';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        if (response.success) {
          setEvents(response.data);
        } else {
          setError(response.error || 'Failed to fetch events');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : error ? (
          <div className="max-w-3xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : events.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {event.media && event.media.length > 0 && (
                  <div className="relative h-48">
                    <img
                      src={event.media[0]}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-600">
                      <FiMapPin className="w-5 h-5 mr-2 text-yellow-500" />
                      {event.location}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FiCalendar className="w-5 h-5 mr-2 text-yellow-500" />
                      {new Date(event.dateTime).toLocaleString()}
                    </p>
                    {event.hasTicket && (
                      <p className="flex items-center text-gray-600">
                        <FiDollarSign className="w-5 h-5 mr-2 text-yellow-500" />
                        Ticket Price: ${event.ticketPrice}
                      </p>
                    )}
                    {event.sponsoredBy && (
                      <p className="flex items-center text-gray-600">
                        <FiUsers className="w-5 h-5 mr-2 text-yellow-500" />
                        Sponsored by: {event.sponsoredBy}
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-gray-600 line-clamp-3">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {events.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 group"
              >
                <span>View All Events</span>
                <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;