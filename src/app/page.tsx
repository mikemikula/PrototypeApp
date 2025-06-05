import type { Metadata } from 'next';

import Hero from '@/components/Hero/Hero';
import LeadForm from '@/components/LeadForm/LeadForm';

/**
 * Metadata for the home page
 * Optimized for SEO and social media sharing
 */
export const metadata: Metadata = {
  title: 'Salesforce Consultancy - Expert Implementation & Optimization',
  description:
    'Transform your business with expert Salesforce consulting. From implementation to optimization, we deliver ROI-focused solutions that scale with your growth.',
  keywords: [
    'Salesforce consulting',
    'Salesforce implementation',
    'Salesforce optimization',
    'CRM consulting',
    'Salesforce expert',
    'business automation',
  ],
  openGraph: {
    title: 'Salesforce Consultancy - Expert Implementation & Optimization',
    description:
      'Transform your business with expert Salesforce consulting. Get your free consultation today.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salesforce Consultancy - Expert Implementation & Optimization',
    description:
      'Transform your business with expert Salesforce consulting. Get your free consultation today.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Home Page Component
 * Single-page marketing site with hero section and lead generation form
 * Implements responsive design and optimal user experience flow
 */
export default function HomePage(): JSX.Element {
  return (
    <main className="home-page">
      {/* Hero section with compelling marketing content */}
      <Hero />

      {/* Lead generation form for conversions */}
      <LeadForm />
    </main>
  );
}
