"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers, FiArrowLeft, FiClock, FiShare2, FiHeart } from 'react-icons/fi';
import { getEventById } from '../../../src/utils/api';
import Link from 'next/link';

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEventById(id);
        if (response.success) {
          setEvent(response.data);
        } else {
          setError(response.error || 'Failed to fetch event details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

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

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
            <Link href="/events" className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-700">
              <FiArrowLeft className="mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-6"
          >
            <Link href="/events" className="inline-flex items-center text-amber-600 hover:text-amber-700 group">
              <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Events
            </Link>
          </motion.div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {event.image && (
                <div className="relative h-[70vh] w-full">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-6xl font-bold mb-6"
                    >
                      {event.name}
                    </motion.h1>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center space-x-8 text-lg"
                    >
                      <span className="flex items-center">
                        <FiClock className="mr-2" />
                        {new Date(event.dateTime).toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <FiMapPin className="mr-2" />
                        {event.location}
                      </span>
                    </motion.div>
                  </div>
                </div>
              )}

              <div className="px-8 md:px-16 lg:px-24 py-16">
                <div className="flex justify-between items-start mb-16">
                  <div className="flex-1">
                    <div className="flex items-center space-x-6 text-gray-600 mb-8">
                      <span className="flex items-center">
                        <FiClock className="mr-2" />
                        {new Date(event.dateTime).toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <FiMapPin className="mr-2" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <FiShare2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <FiHeart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-amber-50/50 backdrop-blur-sm rounded-3xl p-8 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="bg-amber-100 p-4 rounded-2xl">
                          <FiCalendar className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="ml-6">
                          <h3 className="text-2xl font-semibold text-gray-900">Date & Time</h3>
                          <p className="text-gray-600 mt-2 text-lg">{new Date(event.dateTime).toLocaleString()}</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-amber-50/50 backdrop-blur-sm rounded-3xl p-8 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="bg-amber-100 p-4 rounded-2xl">
                          <FiMapPin className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="ml-6">
                          <h3 className="text-2xl font-semibold text-gray-900">Location</h3>
                          <p className="text-gray-600 mt-2 text-lg">{event.location}</p>
                        </div>
                      </div>
                    </motion.div>

                    {event.hasTicket && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-amber-50/50 backdrop-blur-sm rounded-3xl p-8 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-4 rounded-2xl">
                            <FiDollarSign className="w-8 h-8 text-amber-600" />
                          </div>
                          <div className="ml-6">
                            <h3 className="text-2xl font-semibold text-gray-900">Ticket Price</h3>
                            <p className="text-gray-600 mt-2 text-lg">${event.ticketPrice}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {event.sponsoredBy && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-amber-50/50 backdrop-blur-sm rounded-3xl p-8 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-4 rounded-2xl">
                            <FiUsers className="w-8 h-8 text-amber-600" />
                          </div>
                          <div className="ml-6">
                            <h3 className="text-2xl font-semibold text-gray-900">Sponsored By</h3>
                            <p className="text-gray-600 mt-2 text-lg">{event.sponsoredBy}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gray-50/50 backdrop-blur-sm rounded-3xl p-12"
                  >
                    <h3 className="text-3xl font-semibold text-gray-900 mb-8">About the Event</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>
                  </motion.div>
                </div>

                {event.hasTicket && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16 text-center"
                  >
                    <button 
                      onClick={() => router.push('/ConductUs')}
                      className="px-16 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xl font-semibold rounded-2xl hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Get Tickets Now
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
} 