import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiArrowLeft, FiInfo, FiShield, FiClock, FiCheckCircle, FiAlertCircle, FiCalendar, FiUser, FiMapPin, FiTag, FiSettings, FiFileText, FiDollarSign, FiFilter, FiArrowUp, FiDownload, FiRefreshCw, FiCreditCard, FiLock, FiCheck, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Vehicle } from '../data/mockVehicles';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onBack: () => void;
  onRetry: () => void;
}

interface TabProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

interface InfoBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  style?: React.CSSProperties;
}

interface PaymentStepProps {
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

const Tab: React.FC<TabProps> = ({ label, icon, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`relative px-6 py-3 flex items-center gap-2 transition-colors duration-200 ${
      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={false}
      />
    )}
  </motion.button>
);

const LoadingTransition: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50"
  >
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
      <div className="relative w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </motion.div>
);

const InfoBadge: React.FC<InfoBadgeProps> = ({
  icon,
  label,
  value,
  style,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    style={style}
  >
    <div className="flex items-center gap-2">
      <div className="text-primary-600 dark:text-primary-400">{icon}</div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className="font-medium text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  </motion.div>
);

const PaymentStep: React.FC<PaymentStepProps> = ({ step, title, description, isActive, isCompleted }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`relative flex items-start gap-4 p-4 rounded-lg ${
      isActive ? 'bg-primary-50 dark:bg-primary-900/20' : 'bg-gray-50 dark:bg-gray-800'
    }`}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      isCompleted ? 'bg-green-500' : isActive ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
    }`}>
      {isCompleted ? (
        <FiCheck className="w-4 h-4 text-white" />
      ) : (
        <span className="text-white font-medium">{step}</span>
      )}
    </div>
    <div>
      <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </motion.div>
);

const ChallanCard: React.FC<{ challan: any; index: number }> = ({ challan, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                challan.status === 'paid' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
              }`}
            >
              {challan.status === 'paid' ? (
                <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              ) : (
                <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              )}
            </motion.div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{challan.description}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{challan.date}</div>
            </div>
          </div>
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className="flex items-center gap-2"
          >
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              challan.status === 'paid'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {challan.status === 'paid' ? 'Paid' : 'Pending'}
            </span>
            <FiDollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">{challan.amount}</span>
          </motion.div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <FiDownload className="w-4 h-4" />
              Download
            </motion.button>
            {challan.status !== 'paid' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg hover:from-primary-600 hover:to-primary-700"
              >
                <FiCreditCard className="w-4 h-4" />
                Pay Now
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InsuranceCard: React.FC<{ insurance: any }> = ({ insurance }) => {
  const [isHovered, setIsHovered] = useState(false);
  const progress = 75; // Example progress value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center"
            >
              <FiShield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </motion.div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{insurance.provider}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Policy #{insurance.policyNumber}</div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg hover:from-primary-600 hover:to-primary-700"
          >
            <FiRefreshCw className="w-4 h-4" />
            Renew
          </motion.button>
        </div>

        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary-500"
              strokeDasharray="377"
              strokeDashoffset={377 - (377 * progress) / 100}
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Coverage</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Start Date</div>
            <div className="font-medium text-gray-900 dark:text-white">Jan 1, 2024</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">End Date</div>
            <div className="font-medium text-gray-900 dark:text-white">Dec 31, 2024</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle, onBack, onRetry }) => {
  if (!vehicle) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] p-8"
      >
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vehicle Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The requested vehicle details could not be found.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <FiRefreshCw className="w-5 h-5" />
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    details: true,
    insurance: false,
    challans: false,
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  if (isLoading) {
    return <LoadingTransition />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Search
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Vehicle Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <FiInfo className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vehicle Information</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Basic details about the vehicle</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSection('details')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {expandedSections.details ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
              </motion.button>
            </div>

            <AnimatePresence>
              {expandedSections.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <FiTag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Registration Number</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.registrationNumber}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Owner Name</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.ownerName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiSettings className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Vehicle Type</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.vehicleType}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiMapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Manufacturer</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.manufacturer}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Year</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.year}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiFileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Model</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.model}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Insurance Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <FiShield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Insurance Information</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current insurance policy details</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSection('insurance')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {expandedSections.insurance ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
              </motion.button>
            </div>

            <AnimatePresence>
              {expandedSections.insurance && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <FiShield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Insurance Provider</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.insurance.provider}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Valid Until</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.insurance.validUntil}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiFileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Policy Number</div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.insurance.policyNumber}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Challan History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <FiDollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Challan History</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Traffic violation records</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSection('challans')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {expandedSections.challans ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
              </motion.button>
            </div>

            <AnimatePresence>
              {expandedSections.challans && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {vehicle.challans.length > 0 ? (
                    vehicle.challans.map((challan, index) => (
                      <ChallanCard key={index} challan={challan} index={index} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">No challans found for this vehicle</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <FiDownload className="w-5 h-5" />
                Download Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
              >
                <FiRefreshCw className="w-5 h-5" />
                Refresh Data
              </motion.button>
            </div>
          </motion.div>

          {/* Insurance Card */}
          <InsuranceCard insurance={vehicle.insurance} />
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleDetails; 