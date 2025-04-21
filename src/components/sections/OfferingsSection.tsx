'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { OfferingCategory, OfferingItem } from '@/types/database';
import AnimatedSection from '../ui/AnimatedSection';
import StaggeredList from '../ui/StaggeredList';

interface OfferingsSectionProps {
  categories: OfferingCategory[];
  items: OfferingItem[];
}

const OfferingsSection: React.FC<OfferingsSectionProps> = ({ categories, items }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );

  const filteredItems = activeCategory
    ? items.filter(item => item.category_id === activeCategory)
    : items;

  return (
    <section className="py-20 bg-lightGray">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-darkBlue mb-3">
              Our Offerings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the future of healthcare with our advanced technology solutions
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        {categories.length > 0 && (
          <AnimatedSection delay={0.2} className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-3 rounded-lg flex items-center transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.icon_url && (
                    <div className="w-6 h-6 relative mr-2">
                      <Image
                        src={category.icon_url}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="24px"
                      />
                    </div>
                  )}
                  <span className="font-medium">{category.title}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Offerings Grid */}
        <StaggeredList
          delay={0.3}
          staggerDelay={0.1}
          containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-secondary-500 text-darkBlue text-xs font-semibold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-darkBlue mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                {item.link_text && (
                  <Link
                    href={item.link_url || '#'}
                    className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center transition-colors"
                  >
                    {item.link_text}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
};

export default OfferingsSection;