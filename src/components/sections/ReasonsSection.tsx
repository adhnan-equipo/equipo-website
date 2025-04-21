import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReasonToChoose } from '@/types/database';
import AnimatedSection from '../ui/AnimatedSection';
import StaggeredList from '../ui/StaggeredList';

interface ReasonsSectionProps {
  reasons: ReasonToChoose[];
}

const ReasonsSection: React.FC<ReasonsSectionProps> = ({ reasons }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-darkBlue mb-3">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We take pride in leveraging our healthcare expertise for comprehensive technology solutions to optimize business in healthcare.
            </p>
          </div>
        </AnimatedSection>

        <StaggeredList
          delay={0.2}
          staggerDelay={0.1}
          containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-lightGray rounded-lg p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center relative">
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
              <h3 className="text-xl font-bold text-darkBlue mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}
        </StaggeredList>

        {/* Call to Action */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
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

export default ReasonsSection;