import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogIn, FiTruck, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import useResponsive from '../hooks/useResponsive';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // Close menu when screen size changes from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // Update scroll state
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    ...(isAuthenticated ? [{ name: 'Dashboard', path: '/dashboard' }] : []),
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
              <FiTruck className="w-8 h-8 text-blue-600 dark:text-blue-400 relative z-10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Vehicle Adda
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                    location.pathname === item.path ? 'text-primary-600 dark:text-primary-400 font-medium' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800
                       text-gray-600 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700
                       transition-colors duration-200"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Auth Buttons */}
            {!isMobile && (
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <FiLogIn className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600
                               text-white font-medium
                               hover:from-blue-700 hover:to-purple-700
                               transition-all duration-300
                               shadow-lg hover:shadow-xl
                               flex items-center gap-2"
                    >
                      <FiUser className="w-5 h-5" />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-4 space-y-4 border-t border-gray-200 dark:border-gray-800"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                    location.pathname === item.path ? 'text-primary-600 dark:text-primary-400 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600
                           text-white font-medium
                           hover:from-blue-700 hover:to-purple-700
                           transition-all duration-300
                           shadow-lg hover:shadow-xl
                           flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className="w-5 h-5" />
                  Register
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation; 