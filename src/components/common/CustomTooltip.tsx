import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';

interface CustomTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.top + scrollY - tooltipRect.height - 8;
        break;
      case 'bottom':
        x = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.bottom + scrollY + 8;
        break;
      case 'left':
        x = triggerRect.left + scrollX - tooltipRect.width - 8;
        y = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        break;
      case 'right':
        x = triggerRect.right + scrollX + 8;
        y = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    x = Math.max(0, Math.min(x, viewportWidth - tooltipRect.width));
    y = Math.max(0, Math.min(y, viewportHeight - tooltipRect.height));

    setTooltipPosition({ x, y });
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
            className="z-50"
          >
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg p-3 max-w-xs">
              <div className="flex items-start gap-2">
                <FiInfo className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-200">{content}</p>
              </div>
              {/* Arrow */}
              <div
                className="absolute w-3 h-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md transform rotate-45"
                style={{
                  left: position === 'right' ? '-6px' : position === 'left' ? 'auto' : '50%',
                  right: position === 'left' ? '-6px' : 'auto',
                  top: position === 'bottom' ? '-6px' : position === 'top' ? 'auto' : '50%',
                  bottom: position === 'top' ? '-6px' : 'auto',
                  marginLeft: position === 'right' || position === 'left' ? '0' : '-6px',
                  marginTop: position === 'top' || position === 'bottom' ? '0' : '-6px',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomTooltip; 