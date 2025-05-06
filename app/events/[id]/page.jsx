"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers, FiClock, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { getEventById } from '../../../src/utils/api';
import Image from 'next/image';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEventById(id);
        if (response.success) {
          // Process media URLs to ensure they are absolute
          const processedEvent = {
            ...response.data,
            media: response.data.media?.map(mediaUrl => {
              if (mediaUrl.startsWith('http')) return mediaUrl;
              return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${mediaUrl}`;
            })
          };
          setEvent(processedEvent);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
              >
                <FiArrowLeft className="mr-2" />
                Back to Events
              </motion.button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section with Event Image */}
        <div className="relative h-[60vh] min-h-[400px]">
          {event?.media && event.media.length > 0 ? (
            <div className="relative w-full h-full">
              <Image
                src={event.media[0]}
                alt={event.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                onError={(e) => {
                  e.target.src = '/images/event-placeholder.jpg';
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {event?.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-white">
                  <div className="flex items-center">
                    <FiCalendar className="w-5 h-5 mr-2" />
                    <span>{new Date(event?.dateTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="w-5 h-5 mr-2" />
                    <span>{new Date(event?.dateTime).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="w-5 h-5 mr-2" />
                    <span>{event?.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Event</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">{event?.description}</p>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Event Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FiCalendar className="w-5 h-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-gray-900">{new Date(event?.dateTime).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-5 h-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="text-gray-900">{new Date(event?.dateTime).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="w-5 h-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-900">{event?.location}</p>
                      </div>
                    </div>
                    {event?.sponsoredBy && (
                      <div className="flex items-center">
                        <FiUsers className="w-5 h-5 text-yellow-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Sponsored By</p>
                          <p className="text-gray-900">{event.sponsoredBy}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 