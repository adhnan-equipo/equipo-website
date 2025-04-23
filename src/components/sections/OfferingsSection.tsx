'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { OfferingCategory, OfferingItem } from '@/types/database';

interface OfferingsSectionProps {
  categories: OfferingCategory[];
  items: OfferingItem[];
}

const OfferingsSection: React.FC<OfferingsSectionProps> = ({ categories, items }) => {
  // Services to display
  const services = [
    { title: "Workflow Automation", link: "#" },
    { title: "Patient Portal", link: "#" },
    { title: "Data Integration", link: "#" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Advanced blue gradient background with pattern overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800">
        {/* Animated particles effect */}
        <div className="absolute inset-0 opacity-20">
          <div id="particles-js" className="w-full h-full"></div>
        </div>
        
        {/* Wave pattern overlay with animation */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
         <Image
            src="/images/img_group_45.png"
            alt="Background Pattern"
            fill
            className="object-cover opacity-100"
            style={{ mixBlendMode: 'soft-light' }}
            priority
          />
          <Image
            src="/images/img_group_46.png"
            alt="Background Pattern"
            fill
            className="object-cover"
            style={{ mixBlendMode: 'soft-light' }}
            priority
          />
        </motion.div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
          {/* Left Section - Heading */}
          <motion.div 
            className="w-full lg:w-1/3 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              <span className="block text-secondary-500">OUR</span>
              <span className="block text-secondary-500">OFFERINGS</span>
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Explore the Future of Healthcare 
              <br/>with our Advanced Technology
              <br/>Solutions
            </p>
            
            {/* Subtle highlight element */}
            <motion.div 
              className="w-24 h-1 bg-secondary-500 mt-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Right Section - Cards Grid */}
          <motion.div 
            className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Center Logo Card */}
            <motion.div
              className="relative col-span-2 md:col-span-1 p-1 rounded-xl"
              variants={cardVariants}
              animate={floatingAnimation}
            >
              {/* Card with subtle glow */}
              <div className="bg-white rounded-xl p-6 h-48 flex items-center justify-center shadow-lg relative overflow-hidden">
                {/* Subtle glow effect */}
                <div className="absolute -inset-1/2 bg-gradient-to-r from-primary-600/30 to-secondary-500/30 blur-3xl opacity-30 animate-pulse" />
                
                {/* Logo */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/images/img_blue_4.png"
                    alt="Equipo Logo"
                    width={220}
                    height={90}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Service Cards */}
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative p-1 rounded-xl"
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 8 }}
              >
                {/* Card with hover effects */}
                <Link href={service.link} className="block">
                  <div className="bg-primary-600/30 backdrop-blur-sm rounded-xl p-6 h-48 flex flex-col 
                                  justify-between border border-white/10 shadow-lg
                                  hover:bg-primary-500/40 hover:border-white/20 transition-all duration-300">
                    
                    {/* Service name and arrow */}
                    <h3 className="text-xl font-medium text-white mt-auto">
                      {service.title}
                    </h3>
                    
                    {/* Arrow icon with animation */}
                    <div className="self-end mt-4 ">
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <svg className="h-6 w-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;