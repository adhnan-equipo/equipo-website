import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StaggeredListProps {
  children: React.ReactNode[];
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  className = '',
  containerClassName = '',
  itemClassName = '',
  delay = 0.1,
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  direction = 'up',
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  const getDirectionVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'down':
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'left':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'right':
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'none':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const directionVariants = getDirectionVariants();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: {
      ...directionVariants.hidden,
    },
    visible: {
      ...directionVariants.visible,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className={containerClassName}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            className={itemClassName}
            variants={itemVariants}
          >
            {child}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StaggeredList;