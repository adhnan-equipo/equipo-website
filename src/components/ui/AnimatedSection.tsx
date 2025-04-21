import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
  threshold = 0.1,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  const directionVariants = {
    up: {
      hidden: { y: 50, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          ease: 'easeOut',
        },
      },
    },
    down: {
      hidden: { y: -50, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          ease: 'easeOut',
        },
      },
    },
    left: {
      hidden: { x: 50, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          ease: 'easeOut',
        },
      },
    },
    right: {
      hidden: { x: -50, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          ease: 'easeOut',
        },
      },
    },
    none: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          ease: 'easeOut',
        },
      },
    },
  };

  const variant = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variant}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;