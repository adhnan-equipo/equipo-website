// To make your site header sticky, wrap your navigation in a <header> tag (outside this HeroSection) with:
//   className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur"

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderSlide, HeaderSettings } from '@/types/database';

interface PartnerLogo {
  name: string;
  src: string;
}

interface HeroSectionProps {
  slides: HeaderSlide[];
  settings: HeaderSettings;
  partnerLogos?: PartnerLogo[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  settings,
  partnerLogos = [
    { name: 'Partner 1', src: '/images/img_logo.svg' },
    { name: 'Partner 2', src: '/images/img_logo_light_blue_A700.svg' },
    { name: 'Partner 3', src: '/images/img_logo_deep_purple_A200.svg' },
    { name: 'Partner 4', src: '/images/img_logo_yellow_900.svg' },
  ],
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides?.[currentSlideIndex] || null;

  useEffect(() => {
    if (!settings.auto_rotate || slides.length <= 1) return;
    const intv = setInterval(() => {
      setCurrentSlideIndex(i => (i === slides.length - 1 ? 0 : i + 1));
    }, (settings.rotation_interval || 5) * 1000);
    return () => clearInterval(intv);
  }, [settings.auto_rotate, settings.rotation_interval, slides]);

  if (!currentSlide) {
    return (
      <section className="relative min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading content...</p>
      </section>
    );
  }

  const KEY_PHRASE = 'Solution for operations?';
  let mainTitle = currentSlide.title || '';
  let highlightedPhrase = '';
  if (currentSlide.title?.includes(KEY_PHRASE)) {
    [mainTitle] = currentSlide.title.split(KEY_PHRASE);
    highlightedPhrase = KEY_PHRASE;
  }

  return (
    <section className="relative overflow-hidden bg-blue-50 min-h-[1vh]">
      {/* Wave background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/img_3798_1.png"
          alt="Wave"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-32 lg:py-40 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl font-bold text-[#0046be] leading-tight">
              {mainTitle.trim()}{' '}
              {highlightedPhrase && (
                <span className="inline-block bg-[#ffd800] -mt-2 leading-tight">
                  «{highlightedPhrase.replace('?', '')}»?
                </span>
              )}
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              {currentSlide.description ||
                "Leverage our industry-leading Equipe Healthcare Operations Delivery platform."}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <Link
                href={currentSlide.cta_link || '/contact'}
                className="px-6 py-3 bg-[#ffd800] text-[#002654] font-medium rounded-full hover:bg-[#ffdd33] transition"
              >
                {currentSlide.cta_text || 'Request a Demo'}
              </Link>
              <button className="flex items-center text-[#002654] hover:underline">
                <span className="mr-2">Watch The Demo</span>
                {/* play icon */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" stroke="currentColor" />
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            {slides.length > 1 && (
              <div className="mt-6 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`w-3 h-3 rounded-full transition ${
                      i === currentSlideIndex ? 'bg-[#0046be]' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block relative w-[400px] h-[400px] ">
            <div className="w-full h-full overflow-hidden rounded-full ">
              <Image
                src={currentSlide.image_url || '/images/healthcare-image.jpg'}
                alt={currentSlide.title}
                fill
                className="object-cover rounded-full shadow-2xl  "
              />
            </div>
            {slides.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlideIndex(i => (i === 0 ? slides.length - 1 : i - 1))}
                  aria-label="Previous slide"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg"
                >
                  <svg className="w-5 h-5 text-[#0046be]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(i => (i === slides.length - 1 ? 0 : i + 1))}
                  aria-label="Next slide"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg"
                >
                  <svg className="w-5 h-5 text-[#0046be]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Partner logos */}
        <div className="mt-12 flex justify-center items-center flex-wrap gap-8">
          {partnerLogos.map((logo, idx) => (
            <div key={idx} className="relative w-40 h-12">
              <Image src={logo.src} alt={logo.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
