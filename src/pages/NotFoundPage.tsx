import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mt-4 mb-8 text-3xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved to another URL.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center btn-primary px-6 py-3"
        >
          <FiArrowLeft className="mr-2" />
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage; 