import React from 'react';
import { motion } from 'framer-motion';
import { FiInbox, FiSearch, FiAlertCircle, FiPlus } from 'react-icons/fi';

interface EmptyStateProps {
  type?: 'no-data' | 'no-results' | 'error' | 'no-vehicles';
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-data',
  title,
  message,
  action,
  className = '',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'no-data':
        return <FiInbox className="w-16 h-16 text-gray-400" />;
      case 'no-results':
        return <FiSearch className="w-16 h-16 text-gray-400" />;
      case 'error':
        return <FiAlertCircle className="w-16 h-16 text-red-500" />;
      case 'no-vehicles':
        return <FiPlus className="w-16 h-16 text-gray-400" />;
      default:
        return <FiInbox className="w-16 h-16 text-gray-400" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'no-data':
        return 'No Data Available';
      case 'no-results':
        return 'No Results Found';
      case 'error':
        return 'Something Went Wrong';
      case 'no-vehicles':
        return 'No Vehicles Added';
      default:
        return 'No Data Available';
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'no-data':
        return 'There is no data to display at the moment.';
      case 'no-results':
        return "We couldn't find any results matching your search.";
      case 'error':
        return 'An error occurred while loading the data. Please try again.';
      case 'no-vehicles':
        return "You haven't added any vehicles yet. Add your first vehicle to get started.";
      default:
        return 'There is no data to display at the moment.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {getIcon()}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 text-xl font-semibold text-gray-900 dark:text-white"
      >
        {title || getDefaultTitle()}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm"
      >
        {message || getDefaultMessage()}
      </motion.p>

      {action && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={action.onClick}
          className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState; 