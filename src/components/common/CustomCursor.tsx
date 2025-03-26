import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiArrowRight, FiCheck, FiX } from 'react-icons/fi';

interface CustomCursorProps {
  isHovering?: boolean;
  isClickable?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  isHovering = false,
  isClickable = false,
  isSuccess = false,
  isError = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Interactive cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-primary-500 rounded-full pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Clickable indicator */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-primary-500 rounded-full pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClickable ? 1.5 : 1,
          opacity: isClickable ? 0.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Success indicator */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-green-500 rounded-full pointer-events-none z-50 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ scale: 0 }}
        animate={{
          scale: isSuccess ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <FiCheck className="w-4 h-4 text-white" />
      </motion.div>

      {/* Error indicator */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-red-500 rounded-full pointer-events-none z-50 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ scale: 0 }}
        animate={{
          scale: isError ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <FiX className="w-4 h-4 text-white" />
      </motion.div>

      {/* Hover indicator */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <FiArrowRight className="w-6 h-6 text-primary-500" />
      </motion.div>
    </>
  );
};

export default CustomCursor; 