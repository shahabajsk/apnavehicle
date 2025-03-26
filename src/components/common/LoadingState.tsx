import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton' | 'pulse';
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'spinner',
  message = 'Loading...',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const messageSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const renderSpinner = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <FiLoader className={`${sizeClasses[size]} text-primary-500`} />
      </motion.div>
      <motion.p
        className={`${messageSizeClasses[size]} text-gray-500 dark:text-gray-400`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  );

  const renderSkeleton = () => (
    <div className="space-y-4 w-full">
      <motion.div
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
        initial={{ width: '60%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
        initial={{ width: '80%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.div
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
        initial={{ width: '40%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
    </div>
  );

  const renderPulse = () => (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} rounded-full bg-primary-500`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {type === 'spinner' && renderSpinner()}
      {type === 'skeleton' && renderSkeleton()}
      {type === 'pulse' && renderPulse()}
    </div>
  );
};

export default LoadingState; 