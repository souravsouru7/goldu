"use client";
import React from 'react';
import Layout from './components/Layout';
import HeroBanner from './components/HeroBanner';
import HeroSection from './components/HeroSection';
import TireAdvertisement from './components/TireAdvertisement';
import EventsSection from './components/EventsSection';
import BrandSection from './components/BrandSection';
import FaqSection from './components/FaqSection';

export default function Home() {
  return (
    <Layout>
      <HeroBanner />
      <HeroSection />
      <TireAdvertisement />
      <EventsSection />
      <BrandSection />
      <FaqSection />
    </Layout>
  );
}
