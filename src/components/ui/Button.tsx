import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  onClick,
  disabled = false,
  children,
  ariaLabel,
}) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-300',
    secondary: 'bg-secondary-500 text-darkBlue hover:bg-secondary-400 focus:ring-secondary-300',
    outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-200',
    text: 'bg-transparent text-primary-500 hover:underline focus:ring-primary-100',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  // Common styles
  const commonStyles = 'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 inline-flex items-center justify-center';
  
  const buttonStyles = clsx(
    commonStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const buttonMotion = {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
  };

  // If it's a link
  if (href) {
    if (external) {
      return (
        <motion.a 
          href={href}
          className={buttonStyles}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          {...buttonMotion}
        >
          {children}
        </motion.a>
      );
    }
    
    return (
      <Link href={href} passHref>
        <motion.span 
          className={buttonStyles}
          aria-label={ariaLabel}
          {...buttonMotion}
        >
          {children}
        </motion.span>
      </Link>
    );
  }
  
  // If it's a button
  return (
    <motion.button
      type="button"
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...buttonMotion}
    >
      {children}
    </motion.button>
  );
};

export default Button;