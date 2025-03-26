import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCommand } from 'react-icons/fi';

interface Shortcut {
  key: string;
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  { key: '⌘ + K', description: 'Open search', category: 'Navigation' },
  { key: '⌘ + N', description: 'Add new vehicle', category: 'Actions' },
  { key: '⌘ + /', description: 'Show keyboard shortcuts', category: 'Help' },
  { key: '⌘ + D', description: 'Toggle dark mode', category: 'Preferences' },
  { key: '⌘ + ←', description: 'Go back', category: 'Navigation' },
  { key: '⌘ + →', description: 'Go forward', category: 'Navigation' },
  { key: '⌘ + R', description: 'Refresh page', category: 'Actions' },
  { key: '⌘ + S', description: 'Save changes', category: 'Actions' },
  { key: '⌘ + E', description: 'Edit current item', category: 'Actions' },
  { key: '⌘ + H', description: 'Go to home', category: 'Navigation' },
];

const KeyboardShortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
      >
        <FiCommand className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {categories.map((category) => (
                  <div key={category} className="mb-8 last:mb-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {shortcuts
                        .filter((s) => s.category === category)
                        .map((shortcut) => (
                          <div
                            key={shortcut.key}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <span className="text-gray-700 dark:text-gray-300">
                              {shortcut.description}
                            </span>
                            <kbd className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md text-sm font-mono text-gray-900 dark:text-white">
                              {shortcut.key}
                            </kbd>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Press <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md text-sm font-mono">⌘ + /</kbd>{' '}
                  to toggle this menu
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts; 