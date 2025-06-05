'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { leadSchema, type LeadFormData } from '@/lib/validators/leadSchema';

/**
 * Custom hook for lead form management
 * Handles form state, validation, submission logic, and loading states
 * Uses react-hook-form with Zod validation for type-safe form handling
 */
export const useLeadForm = () => {
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: 'onChange', // Enable real-time validation
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      projectBudget: '',
      message: '',
    },
  });

  /**
   * Form submission handler
   * Sends lead data to the API endpoint and handles success/error states
   */
  const onSubmit = async (data: LeadFormData): Promise<void> => {
    // Reset previous error state
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // Create AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Submit form data to API endpoint
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      // Clear timeout if request completes
      clearTimeout(timeoutId);

      // Handle HTTP error status codes
      if (!response.ok) {
        if (response.status === 429) {
          setSubmitError(
            'Too many requests. Please try again in a few minutes.',
          );
          return;
        } else if (response.status === 400) {
          const errorData = await response.json().catch(() => ({}));
          setSubmitError(
            errorData.error || 'Please check your form data and try again.',
          );
          return;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // Parse successful response
      const responseData = await response.json();

      // Handle successful submission
      if (responseData.id) {
        setIsSubmitted(true);
        reset(); // Clear form after successful submission
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      // Handle submission errors
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setSubmitError('Request timed out. Please try again.');
        } else if (error.message.includes('Failed to fetch')) {
          setSubmitError(
            'Network error. Please check your connection and try again.',
          );
        } else {
          setSubmitError('Failed to submit form. Please try again later.');
        }
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Reset form to initial state
   * Clears all form data and submission states
   */
  const resetForm = (): void => {
    reset();
    setIsSubmitted(false);
    setSubmitError(null);
  };

  /**
   * Check if form can be submitted
   * Form is submittable when valid and not currently submitting
   */
  const canSubmit = isValid && !isSubmitting;

  /**
   * Get current form values for real-time validation feedback
   */
  const watchedValues = watch();

  return {
    // Form methods
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset: resetForm,

    // Form state
    errors,
    isValid,
    dirtyFields,
    watchedValues,

    // Submission state
    isSubmitting,
    isSubmitted,
    submitError,
    canSubmit,
  };
};

export default useLeadForm;
