import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { prisma } from '@/lib/prisma';
import { leadSchema, type LeadFormData } from '@/lib/validators/leadSchema';

/**
 * Rate limiting storage for simple in-memory rate limiting
 * In production, consider using Redis or external rate limiting service
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiting implementation
 * Limits to 100 requests per IP per minute
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100;

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

/**
 * Get client IP address from request headers
 * Handles various proxy scenarios
 */
function getClientIP(request: NextRequest): string {
  // Check for forwarded IP (common in production with proxies)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  // Check for real IP (some CDNs use this)
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  // Fallback when IP cannot be determined
  return 'unknown';
}

/**
 * POST /api/leads
 * Creates a new lead record in the database
 *
 * @param request - Next.js request object containing lead form data
 * @returns Response with created lead ID or error message
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    // Parse and validate request body
    let requestData: unknown;
    try {
      requestData = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body.' },
        { status: 400 },
      );
    }

    // Validate data against schema
    const validatedData: LeadFormData = leadSchema.parse(requestData);

    // Create lead record in database
    const lead = await prisma.lead.create({
      data: {
        fullName: validatedData.fullName,
        company: validatedData.company,
        email: validatedData.email,
        phone: validatedData.phone || null,
        projectBudget: validatedData.projectBudget,
        message: validatedData.message || null,
      },
      select: {
        id: true, // Only return the ID for security
      },
    });

    // Return success response with created lead ID
    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      const fieldErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: 'Validation failed',
          details: fieldErrors,
        },
        { status: 400 },
      );
    }

    // Handle database errors
    if (error && typeof error === 'object' && 'code' in error) {
      // Prisma unique constraint violation (duplicate email)
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'An account with this email already exists.' },
          { status: 400 },
        );
      }

      // Other database errors
      // eslint-disable-next-line no-console
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error occurred. Please try again.' },
        { status: 500 },
      );
    }

    // Handle unexpected errors
    // eslint-disable-next-line no-console
    console.error('Unexpected error in POST /api/leads:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 },
    );
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create leads.' },
    { status: 405 },
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create leads.' },
    { status: 405 },
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create leads.' },
    { status: 405 },
  );
}
