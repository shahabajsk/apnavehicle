import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';

interface VehicleSearchProps {
  onSearch: (registrationNumber: string) => void;
}

const VehicleSearch: React.FC<VehicleSearchProps> = ({ onSearch }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const validateRegistrationNumber = (number: string): boolean => {
    // Indian vehicle registration number pattern
    const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
    return pattern.test(number.toUpperCase());
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!registrationNumber.trim()) {
      setError('Please enter a vehicle registration number');
      return;
    }

    if (!validateRegistrationNumber(registrationNumber)) {
      setError('Please enter a valid registration number (e.g., MH12AB1234)');
      return;
    }

    setIsLoading(true);
    try {
      await onSearch(registrationNumber.toUpperCase());
    } catch (err) {
      setError('Failed to fetch vehicle details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationNumber(e.target.value.toUpperCase());
    setError(null);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.input
          type="text"
          value={registrationNumber}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter vehicle registration number (e.g., MH12AB1234)"
          className={`w-full px-6 py-4 text-lg rounded-xl border-2 transition-all duration-300
            ${isFocused 
              ? 'border-primary-light dark:border-primary-dark shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20' 
              : 'border-gray-200 dark:border-gray-700'
            }
            ${error ? 'border-error-light dark:border-error-dark' : ''}
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50`}
          animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
        />
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-error-light dark:text-error-dark"
            >
              <FiAlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        className={`mt-8 w-full px-8 py-4 rounded-xl text-lg font-semibold text-white
          bg-gradient-to-r from-primary-light to-primary-dark
          hover:from-primary-dark hover:to-primary-light
          focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Searching...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <FiSearch className="w-5 h-5" />
            <span>Search Vehicle</span>
          </div>
        )}
      </motion.button>
    </motion.form>
  );
};

export default VehicleSearch; 