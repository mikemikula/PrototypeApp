import React from 'react';

/**
 * Hero Section Component
 * Marketing hero section with compelling CTA for Salesforce consultancy
 * Implements responsive design with Tailwind v4 utility classes
 */
const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Business with
              <span className="text-blue-600 block mt-2">
                {' '}
                Salesforce Excellence
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Expert Salesforce consulting to streamline operations, boost
              productivity, and accelerate growth. From implementation to
              optimization, we deliver results that matter.
            </p>

            {/* Key benefits */}
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="text-2xl" aria-hidden="true">⚡</span>
                <span className="text-gray-700 font-medium">Rapid Implementation</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-2xl" aria-hidden="true">📈</span>
                <span className="text-gray-700 font-medium">ROI-Focused Solutions</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-2xl" aria-hidden="true">🚀</span>
                <span className="text-gray-700 font-medium">Scalable Architecture</span>
              </li>
            </ul>

            {/* CTA */}
            <div className="space-y-4">
              <a
                href="#lead-form"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Scroll to contact form to get started"
              >
                Get Your Free Consultation
              </a>
              <p className="text-sm text-gray-600">
                No commitment • 30-minute strategy session • Tailored
                recommendations
              </p>
            </div>
          </div>

          {/* Visual element */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 transform lg:rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Ready to Scale?</h3>
                <p className="text-gray-600">
                  Join 500+ companies that trust us with their Salesforce
                  transformation
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-blue-600">98%</span>
                    <span className="text-sm text-gray-600">Client Satisfaction</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-blue-600">150%</span>
                    <span className="text-sm text-gray-600">Avg. ROI Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
