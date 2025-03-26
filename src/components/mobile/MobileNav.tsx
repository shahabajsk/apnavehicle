import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiSearch, FiUser, FiMenu, FiX, FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: <FiHome className="w-6 h-6" />, label: 'Home', path: '/' },
    { icon: <FiSearch className="w-6 h-6" />, label: 'Search', path: '/search' },
    { icon: <FiUser className="w-6 h-6" />, label: 'Profile', path: '/profile' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40"
      >
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(item.path);
                // Add haptic feedback
                if ('vibrate' in navigator) {
                  navigator.vibrate(10);
                }
              }}
              className={`flex flex-col items-center justify-center w-full h-full ${
                location.pathname === item.path
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          if ('vibrate' in navigator) {
            navigator.vibrate(10);
          }
        }}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
      >
        <FiMenu className="w-6 h-6 text-gray-900 dark:text-white" />
      </motion.button>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX className="w-6 h-6 text-gray-900 dark:text-white" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  <FiBell className="w-5 h-5" />
                  <span>Notifications</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  <FiSettings className="w-5 h-5" />
                  <span>Settings</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav; 