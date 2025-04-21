import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-lightGray">
      <div className="max-w-md w-full text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="/logo.svg"
            alt="Equipe Logo"
            fill
            className="object-contain"
            sizes="128px"
          />
        </div>
        
        <h1 className="text-6xl font-bold text-primary-500 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-darkBlue mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center">
          <Link href="/" passHref>
            <Button variant="primary" size="lg">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}