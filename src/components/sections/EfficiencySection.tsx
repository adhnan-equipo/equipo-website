import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Make sure this import is present
import { EfficiencyHeading, EfficiencyBlock } from '@/types/database';
import AnimatedSection from '../ui/AnimatedSection';
import Button from '../ui/Button';

interface EfficiencySectionProps {
  heading: EfficiencyHeading;
  blocks: EfficiencyBlock[];
}

const EfficiencySection: React.FC<EfficiencySectionProps> = ({ heading, blocks }) => {
  // Function to get blocks by position
  const getBlockByPosition = (position: string) => {
    return blocks.find(block => block.position === position);
  };

  // Get blocks for each position
  const topLeftBlock = getBlockByPosition('top-left');
  const topRightBlock = getBlockByPosition('top-right');
  const bottomLeftBlock = getBlockByPosition('bottom-left');
  const bottomRightBlock = getBlockByPosition('bottom-right');

  return (
    <section className="relative py-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/img_group_15.png"
          alt="Background Wave"
          fill
          className="object-cover opacity-70"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-lg font-medium text-primary-500 mb-2">
              Use Cases
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-3">
              {heading.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {heading.subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Left Block */}
          {topLeftBlock && (
            <AnimatedSection delay={0.1} direction="left">
              <div className="bg-lightGray rounded-lg overflow-hidden shadow-md h-full">
                <div className="relative h-48 md:h-60">
                  <Image
                    src={topLeftBlock.image_url}
                    alt={topLeftBlock.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-darkBlue mb-2">
                    {topLeftBlock.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {topLeftBlock.description}
                  </p>
                  {topLeftBlock.cta_text && (
                    <Button
                      variant="outline"
                      href={topLeftBlock.cta_link || '#'}
                    >
                      {topLeftBlock.cta_text}
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Top Right Block */}
          {topRightBlock && (
            <AnimatedSection delay={0.2} direction="right">
              <div className="bg-secondary-500 rounded-lg overflow-hidden shadow-md h-full">
                <div className="p-6 h-full flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-darkBlue mb-2">
                    {topRightBlock.title}
                  </h3>
                  <p className="text-darkBlue mb-4">
                    {topRightBlock.description}
                  </p>
                  {topRightBlock.cta_text && (
                    <Button
                      variant="primary"
                      href={topRightBlock.cta_link || '#'}
                    >
                      {topRightBlock.cta_text}
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Bottom Left Block */}
          {bottomLeftBlock && (
            <AnimatedSection delay={0.3} direction="left">
              <div className="bg-primary-500 rounded-lg overflow-hidden shadow-md h-full">
                <div className="p-6 h-full flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {bottomLeftBlock.title}
                  </h3>
                  <p className="text-white mb-4">
                    {bottomLeftBlock.description}
                  </p>
                  {bottomLeftBlock.cta_text && (
                    <Button
                      variant="secondary"
                      href={bottomLeftBlock.cta_link || '#'}
                    >
                      {bottomLeftBlock.cta_text}
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Bottom Right Block */}
          {bottomRightBlock && (
            <AnimatedSection delay={0.4} direction="right">
              <div className="bg-lightGray rounded-lg overflow-hidden shadow-md h-full">
                <div className="relative h-48 md:h-60">
                  <Image
                    src={bottomRightBlock.image_url}
                    alt={bottomRightBlock.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-darkBlue mb-2">
                    {bottomRightBlock.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {bottomRightBlock.description}
                  </p>
                  {bottomRightBlock.cta_text && (
                    <Button
                      variant="outline"
                      href={bottomRightBlock.cta_link || '#'}
                    >
                      {bottomRightBlock.cta_text}
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
};

export default EfficiencySection;