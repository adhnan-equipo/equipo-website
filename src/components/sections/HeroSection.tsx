import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeaderSlide, HeaderSettings } from '@/types/database';
import Slider from '../ui/Slider';

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
    { name: 'Partner 1', src: '/logos/partner1.svg' },
    { name: 'Partner 2', src: '/logos/partner2.svg' },
    { name: 'Partner 3', src: '/logos/partner3.svg' },
    { name: 'Partner 4', src: '/logos/partner4.svg' },
  ]
}) => {
  return (
    <section className="relative min-h-screen">
      {/* Hero Slider */}
      <div className="h-screen">
        <Slider
          slides={slides}
          autoRotate={settings.auto_rotate}
          rotationInterval={settings.rotation_interval}
          transitionEffect={settings.transition_effect as 'fade' | 'slide'}
        />
      </div>

      {/* Partner Logos */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-white py-4 px-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="h-10 w-28 relative opacity-80 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 112px"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;