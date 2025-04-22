'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  showPlaceholder?: boolean;
  placeholderColor?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  showPlaceholder = true,
  placeholderColor = '#f3f4f6', // Default light gray
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Log image loading performance
  React.useEffect(() => {
    const startTime = performance.now();
    return () => {
      if (!isLoading) {
        const loadTime = performance.now() - startTime;
        console.log(`🖼️ Image loaded in ${loadTime.toFixed(2)}ms: ${alt || 'Image'}`);
      }
    };
  }, [isLoading, alt]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    console.error(`❌ Failed to load image: ${src}`);
    setIsError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`} style={{ overflow: 'hidden' }}>
      {/* Image */}
      <Image
        src={isError ? '/placeholder.png' : src}
        alt={alt}
        onLoad={handleLoadingComplete}
        onError={handleError}
        {...props}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />

      {/* Loading Placeholder */}
      <AnimatePresence>
        {showPlaceholder && isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: placeholderColor }}
          >
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Fallback */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-400 text-sm text-center p-4">
            <svg
              className="w-10 h-10 mb-2 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Unable to load image
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;