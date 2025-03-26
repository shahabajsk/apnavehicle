import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSmile, FiFrown, FiMessageSquare, FiSend } from 'react-icons/fi';

interface FeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    type: 'positive' | 'negative';
    message: string;
    category: string;
  }) => void;
}

const categories = [
  'Bug Report',
  'Feature Request',
  'UI/UX Improvement',
  'Performance Issue',
  'Other',
];

const Feedback: React.FC<FeedbackProps> = ({ isOpen, onClose, onSubmit }) => {
  const [type, setType] = useState<'positive' | 'negative' | null>(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!type || !category || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ type, category, message: message.trim() });
      onClose();
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Send Feedback
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Feedback Type */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  How was your experience?
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setType('positive')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      type === 'positive'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-500'
                    }`}
                  >
                    <FiSmile
                      className={`w-8 h-8 mx-auto mb-2 ${
                        type === 'positive'
                          ? 'text-green-500'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    />
                    <span
                      className={`block text-center ${
                        type === 'positive'
                          ? 'text-green-500'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      Positive
                    </span>
                  </button>
                  <button
                    onClick={() => setType('negative')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      type === 'negative'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-red-500'
                    }`}
                  >
                    <FiFrown
                      className={`w-8 h-8 mx-auto mb-2 ${
                        type === 'negative'
                          ? 'text-red-500'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    />
                    <span
                      className={`block text-center ${
                        type === 'negative'
                          ? 'text-red-500'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      Negative
                    </span>
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  What's this about?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        category === cat
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-500'
                      }`}
                    >
                      <span
                        className={`block text-center ${
                          category === cat
                            ? 'text-primary-500'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {cat}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Tell us more
                </h3>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full h-32 pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!type || !category || !message.trim() || isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <FiSend className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Feedback; 