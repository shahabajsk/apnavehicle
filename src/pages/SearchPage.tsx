import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleSearch from '../components/VehicleSearch';
import VehicleDetails from '../components/VehicleDetails';
import { mockVehicles } from '../data/mockVehicles';
import { FiAlertCircle } from 'react-icons/fi';

const SearchPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<typeof mockVehicles[0] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (registrationNumber: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const vehicle = mockVehicles.find(
        (v) => v.registrationNumber.toLowerCase() === registrationNumber.toLowerCase()
      );

      if (vehicle) {
        setSearchResult(vehicle);
      } else {
        setError('No vehicle found with this registration number');
      }
    } catch (err) {
      setError('Failed to fetch vehicle details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setSearchResult(null);
    setError(null);
  };

  const handleRetry = () => {
    if (searchResult) {
      handleSearch(searchResult.registrationNumber);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <AnimatePresence mode="wait">
        {!searchResult ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">
              Search Vehicle Details
            </h1>
            <div className="max-w-3xl mx-auto">
              <VehicleSearch onSearch={handleSearch} />
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-4 rounded-lg bg-error-light/10 dark:bg-error-dark/10 border border-error-light/20 dark:border-error-dark/20"
                  >
                    <div className="flex items-center gap-2 text-error-light dark:text-error-dark">
                      <FiAlertCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <VehicleDetails
              vehicle={searchResult}
              onBack={handleBack}
              onRetry={handleRetry}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchPage; 