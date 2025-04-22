'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReasonToChoose } from '@/types/database';
import AnimatedSection from '../ui/AnimatedSection';
import StaggeredList from '../ui/StaggeredList';

interface ReasonsSectionProps {
  reasons: ReasonToChoose[];
}

const WhyChooseUsSection: React.FC<ReasonsSectionProps> = ({ reasons }) => {
  return (
    <section className="relative py-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/img_group_47.png"
          alt="Background Wave"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl">
            <p className="text-primary-500 text-lg mb-2">Why Equipo?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-6">
              Reasons to Choose Us
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We take pride in leveraging our Healthtech expertise for comprehensive technology solutions, seamless care coordination, and forge strategic partnerships for business in Healthtech.
            </p>
          </div>
        </AnimatedSection>

        <StaggeredList
          delay={0.2}
          staggerDelay={0.1}
          containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              className="bg-secondary-500 border-4 border-primary-500 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow h-full"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center relative">
                  {reason.icon_url ? (
                    <Image
                      src={reason.icon_url}
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary-600 mb-3">
                {reason.title}
              </h3>
              <p className="text-darkBlue">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </StaggeredList>

        {/* Additional reason box (might be needed based on the image) */}
        <AnimatedSection delay={0.4} className="mt-8 flex justify-center">
          <motion.div
            className="bg-secondary-500 border-4 border-primary-500 rounded-lg p-6 max-w-xs text-center hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-xl font-bold text-primary-600 mb-2">
              Exceptional<br />Post-implementation Support
            </h3>
          </motion.div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={0.5} className="mt-16 text-center">
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#contact"
              className="inline-block bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-md"
            >
              Talk to Our Experts
            </a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;