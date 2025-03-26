import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiDownload, FiSettings, FiSmartphone, FiTruck } from 'react-icons/fi';
import useResponsive from '../../hooks/useResponsive';

const HowItWorksSection: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeStep, setActiveStep] = useState(0);
  
  // Steps data
  const steps = [
    {
      id: 'signup',
      title: 'Sign Up & Create Account',
      description: 'Register in minutes with just your email. No credit card required to get started.',
      icon: <FiDownload className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600',
      image: '/images/signup.svg', // These would be actual images in your project
      highlights: [
        'Simple email registration',
        'Business verification',
        'Free 14-day trial'
      ]
    },
    {
      id: 'configure',
      title: 'Configure Your Fleet',
      description: 'Add your vehicles and customize settings to match your specific business needs.',
      icon: <FiSettings className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      image: '/images/configure.svg',
      highlights: [
        'Easy vehicle onboarding',
        'Custom field creation',
        'Bulk import option'
      ]
    },
    {
      id: 'track',
      title: 'Install Tracking Devices',
      description: 'Connect our plug-and-play devices or integrate with existing hardware in your vehicles.',
      icon: <FiTruck className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      image: '/images/track.svg',
      highlights: [
        'OBD-II compatible',
        'Self-installation option',
        'Instant connectivity'
      ]
    },
    {
      id: 'monitor',
      title: 'Monitor & Manage',
      description: 'Access real-time data from anywhere using our web dashboard or mobile app.',
      icon: <FiSmartphone className="w-6 h-6" />,
      color: 'from-pink-500 to-red-600',
      image: '/images/monitor.svg',
      highlights: [
        'Real-time tracking',
        'Customizable alerts',
        'Comprehensive reporting'
      ]
    }
  ];
  
  // Animation to progress through steps
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 5000); // Auto-advance every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isInView, steps.length]);
  
  // Animation controls
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const stepLineVariants = {
    hidden: { width: '0%' },
    visible: step => ({
      width: `${(step / (steps.length - 1)) * 100}%`,
      transition: { duration: 0.5, ease: "easeInOut" }
    })
  };
  
  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 dark:opacity-5" width="800" height="800" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="350" stroke="url(#paint0_radial)" strokeWidth="2" strokeDasharray="10 10" />
          <circle cx="400" cy="400" r="250" stroke="url(#paint0_radial)" strokeWidth="2" strokeDasharray="10 10" />
          <circle cx="400" cy="400" r="150" stroke="url(#paint0_radial)" strokeWidth="2" strokeDasharray="10 10" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) rotate(90) scale(400)">
              <stop stopColor="#4f46e5" />
              <stop offset="1" stopColor="#4f46e5" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-primary-500 dark:text-primary-400 font-semibold text-lg mb-3">
            GETTING STARTED IS EASY
          </h3>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-6">
            How <span className="text-primary-500 dark:text-primary-400">Vehicle Adda</span> Works
          </h2>
          
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300 text-lg">
            Our streamlined process gets you up and running in minutes, not days. Follow these simple steps to start managing your vehicles more efficiently.
          </p>
        </motion.div>
        
        {/* Interactive Steps Process Flow */}
        <div className="max-w-5xl mx-auto">
          {/* Steps Navigation */}
          <div className="mb-12 relative">
            {/* Progress Bar */}
            <div className="h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden relative mb-8">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 absolute top-0 left-0"
                custom={activeStep}
                variants={stepLineVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between relative">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  className="flex flex-col items-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveStep(index)}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 transition-all duration-300 ${
                      index <= activeStep 
                        ? `bg-gradient-to-r ${step.color}` 
                        : 'bg-neutral-300 dark:bg-neutral-700'
                    }`}
                    animate={{ 
                      scale: index === activeStep ? [1, 1.1, 1] : 1,
                      boxShadow: index === activeStep 
                        ? '0 0 20px rgba(79, 70, 229, 0.4)' 
                        : '0 0 0px rgba(0, 0, 0, 0)'
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: index === activeStep ? Infinity : 0,
                      repeatType: "reverse",
                      repeatDelay: 1
                    }}
                  >
                    {index < activeStep ? (
                      <FiCheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </motion.div>
                  
                  <motion.span 
                    className={`text-sm font-medium text-center ${
                      index === activeStep 
                        ? 'text-primary-500 dark:text-primary-400' 
                        : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                    animate={{ 
                      opacity: index === activeStep ? 1 : 0.7,
                      y: index === activeStep ? 0 : 5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {!isMobile && step.title}
                    {isMobile && `Step ${index + 1}`}
                  </motion.span>
                </motion.div>
              ))}
              
              {/* Connecting lines between steps (only visible on larger screens) */}
              {!isMobile && (
                <div className="absolute top-6 left-0 right-0 h-px bg-neutral-200 dark:bg-neutral-700 -z-10" />
              )}
            </div>
          </div>
          
          {/* Active Step Content */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Step Content */}
                <div className="p-8 md:w-1/2">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center text-white mb-6`}>
                    {steps[activeStep].icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
                    {steps[activeStep].title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                    {steps[activeStep].description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {steps[activeStep].highlights.map((highlight, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <FiCheckCircle className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-primary-500`} />
                        <span className="text-neutral-700 dark:text-neutral-200">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="flex space-x-4">
                    {activeStep < steps.length - 1 ? (
                      <motion.button
                        className={`px-6 py-3 rounded-lg bg-gradient-to-r ${steps[activeStep].color} text-white font-medium flex items-center`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveStep(activeStep + 1)}
                      >
                        <span>Next Step</span>
                        <FiArrowRight className="ml-2" />
                      </motion.button>
                    ) : (
                      <motion.button
                        className="px-6 py-3 rounded-lg bg-primary-500 text-white font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get Started Now
                      </motion.button>
                    )}
                    
                    <motion.button
                      className="px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
                
                {/* Illustration/Image */}
                <div className="md:w-1/2 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 p-8 flex items-center justify-center">
                  <div className="relative w-full h-60 md:h-80">
                    {/* Placeholder for actual image */}
                    <div className={`absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${steps[activeStep].color}`}>
                      <div className="text-white text-opacity-20 text-5xl font-bold">
                        {steps[activeStep].icon}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white font-medium">Step {activeStep + 1} Illustration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Step Navigation Dots (Mobile) */}
          {isMobile && (
            <div className="flex justify-center mt-6 space-x-2">
              {steps.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === activeStep 
                      ? 'bg-primary-500' 
                      : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.2 }}
                  animate={{ 
                    scale: index === activeStep ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: index === activeStep ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-white mb-6">
            Ready to transform your vehicle management?
          </h3>
          
          <motion.div 
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#" 
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-indigo-600 text-white font-medium rounded-full inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Free Trial
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
          
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 