import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';

interface Step {
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  content?: React.ReactNode;
}

interface OnboardingProps {
  steps: Step[];
  onComplete: () => void;
  onSkip: () => void;
  isOpen: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({
  steps,
  onComplete,
  onSkip,
  isOpen,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
    }
  }, [currentStep, isOpen, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getTooltipPosition = () => {
    if (!targetElement) return { top: 0, left: 0 };

    const rect = targetElement.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    switch (steps[currentStep].position) {
      case 'top':
        return {
          top: rect.top + scrollY - 10,
          left: rect.left + scrollX + (rect.width / 2),
        };
      case 'bottom':
        return {
          top: rect.bottom + scrollY + 10,
          left: rect.left + scrollX + (rect.width / 2),
        };
      case 'left':
        return {
          top: rect.top + scrollY + (rect.height / 2),
          left: rect.left + scrollX - 10,
        };
      case 'right':
        return {
          top: rect.top + scrollY + (rect.height / 2),
          left: rect.right + scrollX + 10,
        };
      default:
        return {
          top: rect.top + scrollY,
          left: rect.left + scrollX,
        };
    }
  };

  if (!isOpen || !targetElement) return null;

  const position = getTooltipPosition();

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      />

      {/* Highlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed z-50 border-2 border-primary-500 rounded-lg shadow-lg"
        style={{
          top: targetElement.getBoundingClientRect().top + window.scrollY,
          left: targetElement.getBoundingClientRect().left + window.scrollX,
          width: targetElement.getBoundingClientRect().width,
          height: targetElement.getBoundingClientRect().height,
        }}
      />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
        style={{
          top: position.top,
          left: position.left,
          transform: `translate(${
            steps[currentStep].position === 'left' || steps[currentStep].position === 'right'
              ? '0, -50%'
              : '-50%, 0'
          })`,
        }}
      >
        {/* Arrow */}
        <div
          className="absolute w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45"
          style={{
            left: steps[currentStep].position === 'right' ? '-6px' : steps[currentStep].position === 'left' ? 'auto' : '50%',
            right: steps[currentStep].position === 'left' ? '-6px' : 'auto',
            top: steps[currentStep].position === 'bottom' ? '-6px' : steps[currentStep].position === 'top' ? 'auto' : '50%',
            bottom: steps[currentStep].position === 'top' ? '-6px' : 'auto',
            marginLeft: steps[currentStep].position === 'right' || steps[currentStep].position === 'left' ? '0' : '-6px',
            marginTop: steps[currentStep].position === 'top' || steps[currentStep].position === 'bottom' ? '0' : '-6px',
          }}
        />

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {steps[currentStep].title}
            </h3>
            <button
              onClick={onSkip}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {steps[currentStep].description}
          </p>
          {steps[currentStep].content && (
            <div className="mb-4">{steps[currentStep].content}</div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep
                      ? 'bg-primary-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <span>Finish</span>
                    <FiCheck className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Onboarding; 