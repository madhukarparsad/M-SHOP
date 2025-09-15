import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, StarHalf, Search, X } from 'lucide-react';



interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'secondary' | 'white';
  ariaLabel?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  color = 'primary',
  ariaLabel = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-t-teal-500',
    secondary: 'border-t-amber-500',
    white: 'border-t-white'
  };

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1, 
          ease: 'linear',
          repeatType: 'loop'
        }}
        aria-hidden="true"
      />
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  lines?: number;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  lines = 3,
  variant = 'text',
  width,
  height
}) => {
  const baseClasses = 'animate-pulse bg-gray-200/70 rounded';
  
  const variantClasses = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  if (variant !== 'text') {
    return (
      <div 
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={{ width, height }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${variantClasses.text} ${index === lines - 1 ? 'w-3/4' : ''}`}
          style={{ width: index === 0 ? '100%' : index === 1 ? '85%' : '70%' }}
        />
      ))}
    </div>
  );
};

interface ProductCardSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ 
  count = 1,
  // className = ''
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md animate-pulse"
          aria-hidden="true"
        >
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-200" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
            <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
            
            {/* Rating skeleton */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
            </div>
            
            {/* Price skeleton */}
            <div className="bg-gray-200 h-5 w-20 rounded"></div>
            
            {/* Button skeleton */}
            <div className="bg-gray-200 h-10 rounded-lg"></div>
          </div>
        </div>
      ))}
    </>
  );
};
