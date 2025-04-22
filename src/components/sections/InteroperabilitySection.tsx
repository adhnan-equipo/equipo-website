'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  InteroperabilityCenter, 
  InteroperabilityConnection,
  InteroperabilitySettings
} from '@/types/database';
import AnimatedSection from '../ui/AnimatedSection';

interface InteroperabilitySectionProps {
  center: InteroperabilityCenter;
  connections: InteroperabilityConnection[];
  settings: InteroperabilitySettings;
}

const InteroperabilitySection: React.FC<InteroperabilitySectionProps> = ({
  center,
  connections,
  settings
}) => {
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [activeConnection, setActiveConnection] = useState<InteroperabilityConnection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerControls = useAnimation();
  const lineControls = useAnimation();

  useEffect(() => {
    // Animate center hub on mount
    centerControls.start({
      scale: [0, 1.1, 1],
      opacity: [0, 1],
      transition: { duration: 0.8, type: 'spring', stiffness: 100 }
    });

    // Animate connecting lines
    if (settings.animation_enabled) {
      lineControls.start({
        opacity: [0, 1],
        transition: { duration: 0.5, delay: 0.4 }
      });
    }
  }, [centerControls, lineControls, settings.animation_enabled]);

  // Calculate positions for each connection around the center
  const calculatePosition = (angle: number, distance: number, containerSize: number) => {
    const radius = (containerSize / 2) * (distance / 100);
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    
    // Calculate position as percentage from center
    const centerX = containerSize / 2;
    const centerY = containerSize / 2;
    
    return {
      left: `${centerX + x}px`,
      top: `${centerY + y}px`,
    };
  };

  // Handle window resize for responsive positioning
  useEffect(() => {
    const handleResize = () => {
      // Force re-render to recalculate positions
      setHoveredConnection(null);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle connection click
  const handleConnectionClick = (connection: InteroperabilityConnection) => {
    setActiveConnection(connection);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setActiveConnection(null), 300); // Delay to allow animation
  };

  return (
    <section className="py-20 bg-darkBlue text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {center.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {center.subtitle}
          </p>
        </AnimatedSection>

        {/* Interactive Circular Diagram */}
        <div className="flex justify-center">
          <div 
            ref={containerRef}
            className="relative w-full max-w-3xl aspect-square"
          >
            {/* Center Hub */}
            <motion.div 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center z-10 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={centerControls}
            >
              <div className="text-center p-2">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-1">
                  <Image
                    src={center.image_url}
                    alt={center.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 64px, 80px"
                  />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-darkBlue">
                  Interoperability Solutions
                </h3>
              </div>
            </motion.div>

            {/* Connecting lines (as SVG) */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g transform="translate(300, 300)">
                {connections.map((connection, index) => {
                  const radians = (connection.angle * Math.PI) / 180;
                  const distance = (connection.distance / 100) * 240;
                  const endX = distance * Math.cos(radians);
                  const endY = distance * Math.sin(radians);
                  
                  return (
                    <motion.line
                      key={connection.id}
                      x1="0"
                      y1="0"
                      x2={endX}
                      y2={endY}
                      stroke={hoveredConnection === connection.id ? "#44c8f5" : "#4d94ff"}
                      strokeWidth="2"
                      strokeDasharray={settings.animation_enabled ? "5,5" : "0"}
                      initial={{ opacity: 0 }}
                      animate={lineControls}
                      custom={index}
                      transition={{
                        strokeDashoffset: {
                          repeat: settings.animation_enabled ? Infinity : 0,
                          repeatType: "loop",
                          duration: 12,
                          ease: "linear"
                        },
                        delay: 0.2 + (index * 0.1)
                      }}
                      {...(settings.animation_enabled && {
                        strokeDashoffset: [0, -20]
                      })}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Connection Points */}
            {connections.map((connection, index) => {
              const containerSize = containerRef.current?.offsetWidth || 600;
              const position = calculatePosition(
                connection.angle,
                connection.distance,
                containerSize
              );

              return (
                <motion.div
                  key={connection.id}
                  className="absolute"
                  style={position}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  whileHover={{ scale: 1.1 }}
                  onHoverStart={() => settings.highlight_on_hover && setHoveredConnection(connection.id)}
                  onHoverEnd={() => settings.highlight_on_hover && setHoveredConnection(null)}
                  onClick={() => handleConnectionClick(connection)}
                >
                  <div 
                    className={`
                      w-16 h-16 md:w-20 md:h-20 -ml-8 -mt-8 md:-ml-10 md:-mt-10 
                      rounded-full flex items-center justify-center cursor-pointer
                      transition-all duration-300
                      ${hoveredConnection === connection.id 
                        ? 'bg-accent shadow-lg shadow-accent/30' 
                        : 'bg-primary-500 shadow-md'
                      }
                    `}
                  >
                    <div className="text-center p-1">
                      {connection.icon_url ? (
                        <div className="relative w-8 h-8 mx-auto mb-1">
                          <Image
                            src={connection.icon_url}
                            alt={connection.title}
                            fill
                            className="object-contain"
                            sizes="32px"
                          />
                        </div>
                      ) : null}
                      <p className="text-xs font-semibold line-clamp-1">{connection.title}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isModalOpen && activeConnection && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full text-darkBlue relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-darkBlue"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center mb-4">
                {activeConnection.icon_url && (
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Image
                      src={activeConnection.icon_url}
                      alt=""
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold">{activeConnection.title}</h3>
              </div>

              <p className="text-gray-600 mb-6">{activeConnection.description}</p>

              <div className="flex justify-end">
                <button
                  className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600 transition-colors"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteroperabilitySection;