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
              className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 shadow-lg"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 transform hover:scale-105 transition-transform duration-300">
                <FiCalendar className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                Coming Soon
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                We're preparing something exciting for you. Stay tuned for our upcoming events and announcements.
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => window.location.href = `/events/${event._id}`}
                >
                  {event.image && (
                    <div className="relative h-64">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                        <p className="text-gray-200">{event.location}</p>
                      </div>
                    </div>
                  )}
                  <div className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-700 bg-amber-50 p-3 rounded-xl">
                        <FiCalendar className="w-6 h-6 mr-3 text-amber-500" />
                        <span className="font-medium">{new Date(event.dateTime).toLocaleString()}</span>
                      </div>
                      {event.hasTicket && (
                        <div className="flex items-center text-gray-700 bg-amber-50 p-3 rounded-xl">
                          <FiDollarSign className="w-6 h-6 mr-3 text-amber-500" />
                          <span className="font-medium">Ticket Price: ${event.ticketPrice}</span>
                        </div>
                      )}
                      {event.sponsoredBy && (
                        <div className="flex items-center text-gray-700 bg-amber-50 p-3 rounded-xl">
                          <FiUsers className="w-6 h-6 mr-3 text-amber-500" />
                          <span className="font-medium">Sponsored by: {event.sponsoredBy}</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-6 text-gray-600 text-lg leading-relaxed">{event.description}</p>
                    <div className="mt-6 flex justify-end">
                      <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105">
                        View Details
                      </button>
                    </div>
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
