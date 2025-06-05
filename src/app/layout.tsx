import '@/app/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Salesforce Consultancy',
    template: '%s | Salesforce Consultancy',
  },
  description: 'Expert Salesforce consultancy services and custom solutions.',
  metadataBase: new URL('https://www.example.com'),
  openGraph: {
    title: 'Salesforce Consultancy',
    description: 'Expert Salesforce consultancy services and custom solutions.',
    url: 'https://www.example.com',
    siteName: 'Salesforce Consultancy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Salesforce Consultancy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salesforce Consultancy',
    description: 'Expert Salesforce consultancy services and custom solutions.',
    images: ['/og-image.png'],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
