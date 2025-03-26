import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiFacebook, FiArrowRight, FiSend, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const LandingFooter: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Links data
  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How it Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Reviews', href: '#reviews' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press', href: '#press' },
      { name: 'Partners', href: '#partners' },
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'API', href: '#api' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
      { name: 'Security', href: '#security' },
    ]
  };
  
  // Social media links
  const socialLinks = [
    { name: 'Facebook', icon: <FiFacebook className="w-5 h-5" />, href: '#' },
    { name: 'Twitter', icon: <FiTwitter className="w-5 h-5" />, href: '#' },
    { name: 'LinkedIn', icon: <FiLinkedin className="w-5 h-5" />, href: '#' },
    { name: 'Instagram', icon: <FiInstagram className="w-5 h-5" />, href: '#' },
    { name: 'GitHub', icon: <FiGithub className="w-5 h-5" />, href: '#' },
  ];
  
  // Contact information
  const contactInfo = [
    { 
      icon: <FiMapPin className="w-5 h-5" />, 
      text: '123 Vehicle Street, Auto City, 400001, India' 
    },
    { 
      icon: <FiPhone className="w-5 h-5" />, 
      text: '+91 123-456-7890' 
    },
    { 
      icon: <FiMail className="w-5 h-5" />, 
      text: 'info@vehicleadda.com' 
    },
  ];
  
  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your API
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
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
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <footer className="bg-white dark:bg-neutral-900 pt-16 pb-8 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
        <svg 
          className="absolute -bottom-1/2 -right-1/2 w-full h-full text-primary-500 dark:text-primary-700" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <circle cx="80" cy="80" r="40" fill="currentColor" opacity="0.2" />
          <circle cx="70" cy="70" r="25" fill="currentColor" opacity="0.2" />
          <circle cx="85" cy="40" r="15" fill="currentColor" opacity="0.2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
                  <span className="text-primary-500">Vehicle</span>Adda
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                  Revolutionizing vehicle management with cutting-edge technology and intuitive interfaces.
                </p>
              </div>
              
              {/* Newsletter Subscription */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                  Subscribe to our newsletter
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Get the latest updates, tips, and industry insights.
                </p>
                
                <form onSubmit={handleSubscribe} className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubscribed}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors duration-200"
                  >
                    {isSubscribed ? (
                      <FiArrowRight className="w-4 h-4" />
                    ) : (
                      <FiSend className="w-4 h-4" />
                    )}
                  </button>
                </form>
                
                {isSubscribed && (
                  <p className="text-green-500 dark:text-green-400 mt-2 text-sm">
                    Thank you for subscribing!
                  </p>
                )}
              </div>
              
              {/* Social Media Links */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                  Follow us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 rounded-full transition-colors duration-200"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Footer Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3"
          >
            {/* Product Links */}
            <div>
              <motion.h3 
                variants={itemVariants}
                className="text-lg font-semibold text-neutral-800 dark:text-white mb-4"
              >
                Product
              </motion.h3>
              <ul className="space-y-2">
                {links.product.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                  >
                    <a 
                      href={link.href} 
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Company Links */}
            <div>
              <motion.h3 
                variants={itemVariants}
                className="text-lg font-semibold text-neutral-800 dark:text-white mb-4"
              >
                Company
              </motion.h3>
              <ul className="space-y-2">
                {links.company.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                  >
                    <a 
                      href={link.href} 
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Resources Links */}
            <div>
              <motion.h3 
                variants={itemVariants}
                className="text-lg font-semibold text-neutral-800 dark:text-white mb-4"
              >
                Resources
              </motion.h3>
              <ul className="space-y-2">
                {links.resources.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                  >
                    <a 
                      href={link.href} 
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Contact & Address */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-600 dark:text-neutral-400">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full mr-3">
                  {info.icon}
                </div>
                <span>{info.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} VehicleAdda. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {links.legal.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        {/* Back to app link */}
        <div className="text-center mt-8">
          <Link 
            to="/app" 
            className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            <span>Back to App Dashboard</span>
            <FiArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter; 