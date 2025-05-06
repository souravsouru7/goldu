"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers } from 'react-icons/fi';
import { getEvents } from '../../src/utils/api';

export default function EventsPage() {
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
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
        </div>
      </Layout>
    );
  }

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
              Upcoming Events
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Join us for exclusive automotive events, product launches, and special promotions.
            </p>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCalendar className="w-12 h-12 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We're preparing something exciting for you. Stay tuned for our upcoming events and announcements.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => window.location.href = `/events/${event._id}`}
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
                        <FiMapPin className="w-5 h-5 mr-2 text-amber-500" />
                        {event.location}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <FiCalendar className="w-5 h-5 mr-2 text-amber-500" />
                        {new Date(event.dateTime).toLocaleString()}
                      </p>
                      {event.hasTicket && (
                        <p className="flex items-center text-gray-600">
                          <FiDollarSign className="w-5 h-5 mr-2 text-amber-500" />
                          Ticket Price: ${event.ticketPrice}
                        </p>
                      )}
                      {event.sponsoredBy && (
                        <p className="flex items-center text-gray-600">
                          <FiUsers className="w-5 h-5 mr-2 text-amber-500" />
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
        </div>
      </div>
    </Layout>
  );
}
