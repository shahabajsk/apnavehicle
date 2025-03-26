import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiInfo, FiAlertCircle, FiShield, FiDollarSign, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface VehicleDetails {
  make: string;
  model: string;
  registrationNumber: string;
  year: number;
  status: 'active' | 'pending' | 'expired';
  insurance: {
    provider: string;
    validity: string;
  };
  challans: {
    count: number;
    total: number;
  };
}

const MobileVehicleDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullToRefresh, setPullToRefresh] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs: Tab[] = [
    { id: 'details', label: 'Details', icon: <FiInfo className="w-5 h-5" /> },
    { id: 'challans', label: 'Challans', icon: <FiAlertCircle className="w-5 h-5" /> },
    { id: 'insurance', label: 'Insurance', icon: <FiShield className="w-5 h-5" /> },
    { id: 'payments', label: 'Payments', icon: <FiDollarSign className="w-5 h-5" /> },
  ];

  // Pull to refresh logic
  const y = useMotionValue(0);
  const scale = useTransform(y, [0, 100], [1, 1.2]);
  const rotate = useTransform(y, [0, 100], [0, 180]);
  const opacity = useTransform(y, [0, 100], [1, 0]);

  const handleDragEnd = () => {
    if (pullToRefresh > 100) {
      setIsRefreshing(true);
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        setPullToRefresh(0);
      }, 1500);
    } else {
      setPullToRefresh(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Pull to Refresh Indicator */}
      <motion.div
        style={{ y, scale, rotate, opacity }}
        className="absolute top-0 left-0 right-0 flex items-center justify-center h-20"
      >
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </motion.div>

      {/* Vehicle Header */}
      <div className="relative bg-white dark:bg-gray-800 shadow-sm">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Vehicle Details</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">KA-01-AB-1234</p>
            </div>
          </div>
        </div>

        {/* Vehicle Image */}
        <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
          <img
            src="/vehicles/sedan.svg"
            alt="Vehicle"
            className="w-full h-full object-contain p-4"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4"
        >
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vehicle Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Make & Model</span>
                    <span className="font-medium text-gray-900 dark:text-white">Toyota Camry</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Year</span>
                    <span className="font-medium text-gray-900 dark:text-white">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Registration</span>
                    <span className="font-medium text-gray-900 dark:text-white">KA-01-AB-1234</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm text-green-600 dark:text-green-400">Insurance</div>
                    <div className="text-lg font-semibold text-green-700 dark:text-green-300">Active</div>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-sm text-red-600 dark:text-red-400">Challans</div>
                    <div className="text-lg font-semibold text-red-700 dark:text-red-300">2</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'challans' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Challans</h3>
                  <span className="text-sm text-red-600 dark:text-red-400">₹1,500</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div>
                      <div className="font-medium text-red-700 dark:text-red-300">Over Speeding</div>
                      <div className="text-sm text-red-600 dark:text-red-400">Bangalore, KA</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-700 dark:text-red-300">₹1,000</div>
                      <div className="text-sm text-red-600 dark:text-red-400">Due in 5 days</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div>
                      <div className="font-medium text-red-700 dark:text-red-300">Signal Violation</div>
                      <div className="text-sm text-red-600 dark:text-red-400">Bangalore, KA</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-700 dark:text-red-300">₹500</div>
                      <div className="text-sm text-red-600 dark:text-red-400">Due in 10 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insurance' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Insurance Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Provider</span>
                    <span className="font-medium text-gray-900 dark:text-white">ICICI Lombard</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Policy Number</span>
                    <span className="font-medium text-gray-900 dark:text-white">POL123456789</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Valid Until</span>
                    <span className="font-medium text-gray-900 dark:text-white">Dec 31, 2024</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Coverage Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Third Party</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹7.5L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Own Damage</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹5L</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment History</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Insurance Premium</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Dec 1, 2023</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">₹12,500</div>
                      <div className="text-sm text-green-600 dark:text-green-400">Paid</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Challan Payment</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Nov 15, 2023</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">₹2,000</div>
                      <div className="text-sm text-green-600 dark:text-green-400">Paid</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg font-medium"
          >
            Pay Now
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium"
          >
            Share
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MobileVehicleDetails; 