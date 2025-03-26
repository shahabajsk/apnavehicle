import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiStar, FiAward, FiTruck, FiUsers } from 'react-icons/fi';
import useResponsive from '../../hooks/useResponsive';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
  companyLogo?: string;
}

const ExperienceShowcase: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(showcaseRef, { once: false, amount: 0.2 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 'testimony-1',
      name: 'Rajiv Mehta',
      position: 'Fleet Manager',
      company: 'Swift Logistics',
      quote: 'Vehicle Adda transformed how we track and manage our fleet of 100+ trucks. The real-time tracking and maintenance alerts have reduced our downtime by 35% and improved our delivery efficiency significantly.',
      image: '/images/testimonial-1.jpg',
      rating: 5,
      companyLogo: '/images/company-1.svg'
    },
    {
      id: 'testimony-2',
      name: 'Priya Sharma',
      position: 'Operations Director',
      company: 'Metro Cab Services',
      quote: 'As a taxi service, keeping track of our vehicles is crucial. Vehicle Adda provides us with accurate real-time data that helps us optimize routes and reduce fuel costs. The mobile app is a game-changer for our drivers.',
      image: '/images/testimonial-2.jpg',
      rating: 5,
      companyLogo: '/images/company-2.svg'
    },
    {
      id: 'testimony-3',
      name: 'Arjun Kapoor',
      position: 'CEO',
      company: 'GreenDrive Rentals',
      quote: 'Implementing Vehicle Adda has revolutionized our car rental business. The digital key feature and customer tracking portal have set us apart from competitors, while the analytics help us make data-driven fleet decisions.',
      image: '/images/testimonial-3.jpg',
      rating: 4,
      companyLogo: '/images/company-3.svg'
    }
  ];
  
  // Stats data
  const stats = [
    { value: '15+', label: 'Years Experience', icon: <FiAward className="w-5 h-5" /> },
    { value: '25K+', label: 'Happy Customers', icon: <FiUsers className="w-5 h-5" /> },
    { value: '500K+', label: 'Vehicles Tracked', icon: <FiTruck className="w-5 h-5" /> },
    { value: '99.9%', label: 'Uptime', icon: <FiStar className="w-5 h-5" /> }
  ];
  
  // Trusted by logos - in a real app, these would be actual image paths
  const trustedByLogos = [
    { name: 'Company 1', logo: '/images/logo-1.svg' },
    { name: 'Company 2', logo: '/images/logo-2.svg' },
    { name: 'Company 3', logo: '/images/logo-3.svg' },
    { name: 'Company 4', logo: '/images/logo-4.svg' },
    { name: 'Company 5', logo: '/images/logo-5.svg' },
    { name: 'Company 6', logo: '/images/logo-6.svg' }
  ];
  
  // Change testimonial
  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => 
      (prev + 1) % testimonials.length
    );
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
  
  return (
    <section 
      ref={showcaseRef}
      id="experience" 
      className="py-24 bg-neutral-50 dark:bg-neutral-800 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 80 80" preserveAspectRatio="none">
          <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dots-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h3 
            className="text-primary-500 dark:text-primary-400 font-semibold text-lg mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            TRUSTED BY INDUSTRY LEADERS
          </motion.h3>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience the <span className="text-primary-500 dark:text-primary-400">Vehicle Adda</span> Difference
          </motion.h2>
          
          <motion.p 
            className="text-neutral-600 dark:text-neutral-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of businesses that have transformed their vehicle management with our platform. Here's what our customers have to say.
          </motion.p>
        </div>
        
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-neutral-700 rounded-lg shadow-lg py-6 px-4 text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500 dark:text-primary-400">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div className="mb-20 relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTestimonial}
              className="bg-white dark:bg-neutral-700 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Testimonial Image (hidden on mobile) */}
                {!isMobile && (
                  <div className="md:w-1/3 bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
                    <div className="p-8">
                      {/* Placeholder for actual image */}
                      <div className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center mx-auto overflow-hidden">
                        <FiUsers className="w-24 h-24 text-white/50" />
                        <span className="sr-only">{testimonials[activeTestimonial].name}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Testimonial Content */}
                <div className="md:w-2/3 p-8 md:p-12">
                  <div className="mb-6">
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < testimonials[activeTestimonial].rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-neutral-300 dark:text-neutral-500'
                          }`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl font-medium text-neutral-700 dark:text-white italic mb-8">
                      "{testimonials[activeTestimonial].quote}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      {/* Company Logo Placeholder */}
                      <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-600 flex items-center justify-center mr-4">
                        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-300">
                          {testimonials[activeTestimonial].company.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-300">
                          {testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={handlePrevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-neutral-700 text-neutral-700 dark:text-white shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={handleNextTestimonial}
              className="p-3 rounded-full bg-primary-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Testimonial Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'w-8 bg-primary-500' 
                    : 'bg-neutral-300 dark:bg-neutral-600'
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Trusted By Logos */}
        <div>
          <motion.h3 
            className="text-center text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            TRUSTED BY LEADING COMPANIES
          </motion.h3>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trustedByLogos.map((company, index) => (
              <motion.div 
                key={index}
                className="h-12 w-32 bg-white dark:bg-neutral-700 rounded-lg shadow-md flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                {/* Placeholder for actual company logo */}
                <span className="text-neutral-500 dark:text-neutral-300 font-semibold">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-24 p-8 md:p-12 bg-primary-500/10 dark:bg-primary-500/5 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-4">
            Ready to join our successful customers?
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
            Experience firsthand how Vehicle Adda can transform your vehicle management with our risk-free 14-day trial.
          </p>
          
          <motion.button
            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Free Trial</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceShowcase; 