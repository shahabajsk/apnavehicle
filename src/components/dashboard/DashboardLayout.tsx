import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSettings, FiUser, FiHome, FiCar, FiBarChart2, FiLogOut } from 'react-icons/fi';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [greeting, setGreeting] = useState('');
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const menuItems = [
    { icon: <FiHome className="w-5 h-5" />, label: 'Overview', href: '/dashboard' },
    { icon: <FiCar className="w-5 h-5" />, label: 'My Vehicles', href: '/dashboard/vehicles' },
    { icon: <FiBarChart2 className="w-5 h-5" />, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: <FiUser className="w-5 h-5" />, label: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Vehicle Adda" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                Vehicle Adda
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.a>
            ))}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <FiUser className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">John Doe</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">john@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {greeting}, John
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back to your dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <FiBell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </motion.button>

              {/* Settings */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <FiSettings className="w-5 h-5" />
              </motion.button>

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <FiLogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 