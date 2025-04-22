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
    <section className="relative py-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/img_group_46.png"
          alt="Background Grid"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
            <div className="w-full md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-500 mb-4">
                OUR<br />OFFERINGS
              </h2>
              <p className="text-xl text-white leading-relaxed">
                Explore the Future of Healthcare<br /> 
                with our Advanced Technology<br />
                Solutions
              </p>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Center Logo Card */}
              <div className="bg-white rounded-lg p-8 flex items-center justify-center mb-6 h-40">
                <Image
                  src="/images/img_blue_4.png"
                  alt="Equipo Logo"
                  width={180}
                  height={80}
                  className="h-20 object-contain"
                />
              </div>

              {/* Offering Cards */}
              {filteredItems.slice(0, 3).map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-secondary-500 rounded-lg p-6 flex flex-col items-start justify-center h-40"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <p className="text-base font-semibold text-darkBlue">
                    {item.title}
                  </p>
                  <div className="mt-auto self-end">
                    <Link href={item.link_url || "#"}>
                      <svg className="h-6 w-6 text-darkBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <motion.div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
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
            </motion.div>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
};

export default OfferingsSection;