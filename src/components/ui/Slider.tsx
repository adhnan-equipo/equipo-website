'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HeaderSlide } from '@/types/database';
import Button from './Button';

interface SliderProps {
  slides: HeaderSlide[];
  autoRotate?: boolean;
  rotationInterval?: number; // in seconds
  transitionEffect?: 'fade' | 'slide';
}

const Slider: React.FC<SliderProps> = ({
  slides,
  autoRotate = true,
  rotationInterval = 5,
  transitionEffect = 'fade',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Handle auto-rotation
  useEffect(() => {
    if (!autoRotate || slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, rotationInterval * 1000);
    
    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval, slides.length]);
  
  // Navigation handlers
  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);
  
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % slides.length
    );
  }, [slides.length]);
  
  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);
  
  // Animation variants based on transition effect
  const fadeVariants = {
    enter: (direction: number) => ({
      opacity: 0,
    }),
    center: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };
  
  const variants = transitionEffect === 'fade' ? fadeVariants : slideVariants;
  
  if (!slides.length) {
    return null;
  }
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Main slider */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={slides[currentIndex].image_url}
                alt={slides[currentIndex].title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-darkBlue bg-opacity-50" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl">
                  <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
                    {slides[currentIndex].title}
                  </h2>
                  <h3 className="text-secondary-500 text-xl md:text-2xl font-semibold mb-4">
                    {slides[currentIndex].subtitle}
                  </h3>
                  <p className="text-white text-base md:text-lg mb-6">
                    {slides[currentIndex].description}
                  </p>
                  {slides[currentIndex].cta_text && (
                    <Button
                      variant="secondary"
                      size="lg"
                      href={slides[currentIndex].cta_link || '#'}
                    >
                      {slides[currentIndex].cta_text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 z-20 text-white transition-all"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 z-20 text-white transition-all"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
      
      {/* Dots navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-secondary-500 scale-110'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;