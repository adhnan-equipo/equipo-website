'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-lightGray">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-darkBlue mb-4">Something went wrong</h1>
        <p className="text-lg text-gray-600 mb-6">
          We apologize for the inconvenience. Please try refreshing the page or contact our support team if the issue persists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Link href="/" passHref>
            <Button variant="outline">
              Return Home
            </Button>
          </Link>
        </div>
        
        <div className="text-sm text-gray-500">
          Error Code: {error.digest}
        </div>
      </div>
    </div>
  );
}