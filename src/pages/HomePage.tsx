import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTruck, FiBarChart2, FiMapPin, FiUser, FiShield, FiSettings } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import useResponsive from '../hooks/useResponsive';

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  
  // Animation values for scroll-triggered animations
  const [refHero, inViewHero] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refFeatures, inViewFeatures] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refStats, inViewStats] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const features = [
    {
      icon: <FiTruck />,
      title: 'Vehicle Tracking',
      description: 'Real-time tracking of all your vehicles with advanced GPS technology.'
    },
    {
      icon: <FiBarChart2 />,
      title: 'Performance Analytics',
      description: 'Comprehensive analytics for fuel efficiency, maintenance costs, and more.'
    },
    {
      icon: <FiSettings />,
      title: 'Maintenance Management',
      description: 'Schedule and track maintenance tasks to keep your vehicles in top condition.'
    },
    {
      icon: <FiMapPin />,
      title: 'Route Optimization',
      description: 'Find the most efficient routes to save time and fuel costs.'
    },
    {
      icon: <FiUser />,
      title: 'Driver Management',
      description: 'Track driver performance, schedule assignments, and manage licenses.'
    },
    {
      icon: <FiShield />,
      title: 'Safety & Compliance',
      description: 'Ensure all your vehicles meet safety standards and compliance requirements.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={refHero} className="relative bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950 py-20 md:py-28">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={inViewHero ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h1 className="text-white mb-6">
              Manage Your Vehicle Fleet with Ease
            </h1>
            <p className="text-primary-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              The all-in-one platform for tracking, managing, and optimizing your vehicles. 
              Save time, reduce costs, and improve efficiency.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/signup" 
                className="btn-primary text-base md:text-lg px-6 py-3"
              >
                Get Started Free
              </Link>
              <Link 
                to="/demo" 
                className="btn-outline text-white border-white hover:bg-white/10 text-base md:text-lg px-6 py-3"
              >
                Request a Demo
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
          <svg className="w-full h-full" viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path 
              d="M0 96L60 80C120 64 240 32 360 26.7C480 21.3 600 42.7 720 48C840 53.3 960 42.7 1080 37.3C1200 32 1320 32 1380 32H1440V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" 
              fill={isDarkMode ? "#171717" : "#ffffff"} 
            />
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={refFeatures} className="py-20">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={inViewFeatures ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="mb-4">Powerful Vehicle Management Features</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
              Our comprehensive tools help you manage every aspect of your vehicle fleet, from tracking to maintenance and beyond.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6 flex flex-col"
                initial="hidden"
                animate={inViewFeatures ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-3xl text-primary-600 dark:text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section ref={refStats} className="py-16 bg-neutral-100 dark:bg-neutral-800">
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            animate={inViewStats ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">25K+</p>
              <p className="text-neutral-600 dark:text-neutral-400">Vehicles Managed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">18%</p>
              <p className="text-neutral-600 dark:text-neutral-400">Fuel Savings</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">1.5M</p>
              <p className="text-neutral-600 dark:text-neutral-400">Hours Saved</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">5,000+</p>
              <p className="text-neutral-600 dark:text-neutral-400">Happy Customers</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 