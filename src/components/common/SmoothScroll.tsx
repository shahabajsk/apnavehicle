import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
  parallaxStrength?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  className = '',
  parallaxStrength = 0.5,
  springConfig = {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll physics
  const smoothY = useSpring(scrollYProgress, springConfig);

  // Parallax effect
  const y = useTransform(smoothY, [0, 1], [0, -100 * parallaxStrength]);

  // Scroll progress indicator
  const progressBarWidth = useTransform(smoothY, [0, 1], ['0%', '100%']);

  useEffect(() => {
    // Disable default scroll behavior
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden" ref={containerRef}>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 z-50"
        style={{ width: progressBarWidth }}
      />

      {/* Main content with parallax */}
      <motion.div
        className={`relative ${className}`}
        style={{ y }}
      >
        {children}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Scroll</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SmoothScroll; 