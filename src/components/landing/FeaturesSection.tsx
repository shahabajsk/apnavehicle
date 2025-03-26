import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiActivity, FiMap, FiSettings, FiShield, FiSmartphone, FiTruck, FiUsers } from 'react-icons/fi';
import useResponsive from '../../hooks/useResponsive';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
}

const FeaturesSection: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  const featuresRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuresRef, { once: false, amount: 0.2 });
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  // Features data
  const features: Feature[] = [
    {
      id: 'tracking',
      title: 'Real-time Tracking',
      description: 'Monitor your vehicles anywhere, anytime with precision GPS tracking.',
      icon: <FiMap className="w-7 h-7" />,
      color: 'from-blue-500 to-cyan-400',
      details: [
        'Live location updates every 10 seconds',
        'Historical route playback',
        'Geofence alerts and notifications',
        'Traffic-aware routing and ETA'
      ]
    },
    {
      id: 'maintenance',
      title: 'Smart Maintenance',
      description: 'Predictive maintenance alerts and service scheduling to keep your fleet running smoothly.',
      icon: <FiSettings className="w-7 h-7" />,
      color: 'from-amber-500 to-orange-400',
      details: [
        'Service due reminders based on mileage or time',
        'Part replacement predictions',
        'Maintenance history and documentation',
        'Vendor management and service tracking'
      ]
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      description: 'Comprehensive insights on vehicle performance, driver behavior, and efficiency metrics.',
      icon: <FiActivity className="w-7 h-7" />,
      color: 'from-violet-500 to-purple-400',
      details: [
        'Fuel consumption analysis and optimization',
        'Driver safety scoring',
        'Route efficiency metrics',
        'Custom reports and data export'
      ]
    },
    {
      id: 'security',
      title: 'Enhanced Security',
      description: 'Protect your vehicles with advanced security features and real-time alerts.',
      icon: <FiShield className="w-7 h-7" />,
      color: 'from-emerald-500 to-green-400',
      details: [
        'Unauthorized movement alerts',
        'Engine immobilization',
        'Tamper detection',
        'Emergency assistance coordination'
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Control',
      description: 'Manage your entire fleet from the palm of your hand with our intuitive mobile app.',
      icon: <FiSmartphone className="w-7 h-7" />,
      color: 'from-pink-500 to-rose-400',
      details: [
        'Remote vehicle functions',
        'Driver communication',
        'Document scanning and storage',
        'Offline mode for remote areas'
      ]
    },
    {
      id: 'fleet',
      title: 'Fleet Management',
      description: 'Streamline your operations with comprehensive fleet management tools.',
      icon: <FiTruck className="w-7 h-7" />,
      color: 'from-teal-500 to-cyan-400',
      details: [
        'Vehicle assignment and scheduling',
        'Automated compliance reporting',
        'Cost tracking and budget management',
        'Asset lifecycle management'
      ]
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };
  
  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    show: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    }
  };
  
  // Feature card hover effect
  const handleFeatureClick = (id: string) => {
    setActiveFeature(activeFeature === id ? null : id);
  };
  
  return (
    <section id="features" className="py-20 bg-white dark:bg-neutral-900 relative overflow-hidden">
      {/* Background decoration - gradient dots */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
          backgroundSize: '30px 30px' 
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h3 
            className="text-primary-500 dark:text-primary-400 font-semibold text-lg mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            POWERFUL FEATURES
          </motion.h3>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything You Need for <span className="text-primary-500 dark:text-primary-400">Vehicle Management</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our comprehensive suite of tools gives you complete control and visibility over your entire fleet, whether you have one vehicle or hundreds.
          </motion.p>
        </div>
        
        {/* Features Grid */}
        <motion.div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={featureVariants}
              className={`bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                activeFeature === feature.id ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900' : ''
              }`}
              whileHover={{ y: -5 }}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className="p-6 cursor-pointer">
                {/* Feature Icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2 flex items-center">
                  {feature.title}
                  <motion.span 
                    animate={{ rotate: activeFeature === feature.id ? 180 : 0 }} 
                    className="ml-auto text-primary-500"
                  >
                    {activeFeature === feature.id ? '−' : '+'}
                  </motion.span>
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-300">
                  {feature.description}
                </p>
                
                {/* Feature Details - Expandable */}
                <AnimatePresence>
                  {activeFeature === feature.id && (
                    <motion.div
                      variants={detailsVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="mt-4 overflow-hidden"
                    >
                      <ul className="space-y-2">
                        {feature.details.map((detail, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 bg-gradient-to-r ${feature.color}`}></span>
                            <span className="text-neutral-600 dark:text-neutral-300">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.button
                        className={`mt-4 px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r ${feature.color} font-medium`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* "All Features" Button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Features</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
        
        {/* Stats Section */}
        <div className="mt-24 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 dark:from-primary-500/5 dark:to-indigo-500/5 rounded-2xl p-8 md:p-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '15M+', label: 'Kilometers Tracked' },
              { value: '50K+', label: 'Vehicles Managed' },
              { value: '24/7', label: 'Customer Support' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                  {stat.value}
                </span>
                <span className="text-neutral-600 dark:text-neutral-300">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 