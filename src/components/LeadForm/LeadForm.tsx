'use client';

import React from 'react';

import { useLeadForm } from './useLeadForm';

import { PROJECT_BUDGET_OPTIONS } from '@/lib/validators/leadSchema';

/**
 * Lead Generation Form Component
 * Controlled form with validation, loading states, and accessibility features
 * Implements Tailwind v4 utility classes and WCAG 2.2 AA compliance
 */
const LeadForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    canSubmit,
  } = useLeadForm();

  // Show success message after successful submission
  if (isSubmitted) {
    return (
      <section id="lead-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-green-600">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-2">
              We&apos;ve received your information and will be in touch within
              24 hours to schedule your free consultation.
            </p>
            <p className="text-gray-500">
              Check your email for confirmation details.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Your Free Consultation</h2>
          <p className="text-lg text-gray-600">
            Tell us about your Salesforce needs and we&apos;ll provide a custom
            strategy session at no cost.
          </p>
        </div>

        <form
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Lead generation form"
        >
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <span
                id="fullName-error"
                className="text-sm text-red-600 mt-1 block"
                role="alert"
                aria-live="polite"
              >
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company *
            </label>
            <input
              {...register('company')}
              type="text"
              id="company"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your company name"
              aria-describedby={errors.company ? 'company-error' : undefined}
              aria-invalid={!!errors.company}
            />
            {errors.company && (
              <span
                id="company-error"
                className="text-sm text-red-600 mt-1 block"
                role="alert"
                aria-live="polite"
              >
                {errors.company.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span
                id="email-error"
                className="text-sm text-red-600 mt-1 block"
                role="alert"
                aria-live="polite"
              >
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number (optional)"
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <span
                id="phone-error"
                className="text-sm text-red-600 mt-1 block"
                role="alert"
                aria-live="polite"
              >
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Project Budget Field */}
          <div>
            <label htmlFor="projectBudget" className="block text-sm font-semibold text-gray-700 mb-2">
              Project Budget *
            </label>
            <select
              {...register('projectBudget')}
              id="projectBudget"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.projectBudget ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-describedby={
                errors.projectBudget ? 'projectBudget-error' : undefined
              }
              aria-invalid={!!errors.projectBudget}
            >
              <option value="">Select your project budget</option>
              {PROJECT_BUDGET_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.projectBudget && (
              <span
                id="projectBudget-error"
                className="text-sm text-red-600 mt-1 block"
                role="alert"
                aria-live="polite"
              >
                {errors.projectBudget.message}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Message
            </label>
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tell us more about your Salesforce needs (optional)"
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <span
                id="message-error"
                className="text-sm text-red-600 mt-1 block"
                role="alert"
                aria-live="polite"
              >
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-4 px-6 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center ${
              !canSubmit
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isSubmitting
                ? 'bg-blue-500 text-white cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
            aria-describedby="submit-help"
          >
            {isSubmitting ? (
              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Get Free Consultation'
            )}
          </button>

          <p id="submit-help" className="text-sm text-gray-600 text-center">
            * Required fields. We respect your privacy and will never share your
            information.
          </p>
        </form>
      </div>
    </section>
  );
};

export default LeadForm;
