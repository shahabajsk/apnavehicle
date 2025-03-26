import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShield, FiClock, FiCheckCircle, FiUser, FiStar, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/Navigation';
import VehicleSearch from '../components/VehicleSearch';
import VehicleDetails from '../components/VehicleDetails';
import { mockVehicles, Vehicle, validateRegistrationNumber } from '../data/mockVehicles';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

// Animated background pattern component
const AnimatedPattern = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
    <div className="absolute inset-0" style={{ 
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', 
      backgroundSize: '40px 40px' 
    }} />
  </div>
);

// Floating gradient orbs
const FloatingOrbs = () => (
  <>
    <motion.div
      className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ top: '10%', left: '10%' }}
    />
    <motion.div
      className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, -100, 0],
        y: [0, -50, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ bottom: '10%', right: '10%' }}
    />
  </>
);

interface AnimatedIconProps {
  Icon: IconType;
  delay?: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ Icon, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
    <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400 relative z-10" />
  </motion.div>
);

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  delay: number;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, gradient }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className={`absolute inset-0 rounded-xl ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <AnimatedIcon Icon={Icon} delay={delay} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: IconType;
  delay: number;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon: Icon, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div className="ml-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, rating, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{content}</p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full relative z-10 flex items-center justify-center">
              <FiUser className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<Vehicle | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const { scrollY } = useScroll();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate input
    if (!registrationNumber.trim()) {
      setError('Please enter a registration number');
      return;
    }

    if (!validateRegistrationNumber(registrationNumber)) {
      setError('Please enter a valid registration number (e.g., MH12AB1234)');
      return;
    }

    setIsSearching(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const vehicle = mockVehicles.find(
        (v) => v.registrationNumber.toLowerCase() === registrationNumber.toLowerCase()
      );

      if (vehicle) {
        setSearchResult(vehicle);
      } else {
        setError('No vehicle found with this registration number');
      }
    } catch (err) {
      setError('Failed to fetch vehicle details. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleBack = () => {
    setSearchResult(null);
    setError(null);
    setRegistrationNumber('');
  };

  const handleRetry = () => {
    if (registrationNumber) {
      handleSearch(new Event('submit') as any);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="relative">
        {!searchResult ? (
          <>
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
              <AnimatedPattern />
              <FloatingOrbs />
              <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                      Your Vehicle Information Hub
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                    >
                      Access comprehensive vehicle details, insurance information, and challan history all in one place.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="w-full max-w-2xl mx-auto lg:mx-0"
                    >
                      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
                          <input
                            type="text"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            placeholder="Enter vehicle registration number (e.g., MH12AB1234)"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                                     text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                     placeholder-gray-500 dark:placeholder-gray-400
                                     transition-all duration-300
                                     shadow-lg hover:shadow-xl"
                          />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={isSearching}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 
                                   bg-gradient-to-r from-blue-600 to-purple-600
                                   text-white rounded-lg
                                   hover:from-blue-700 hover:to-purple-700
                                   focus:outline-none focus:ring-2 focus:ring-primary-500
                                   transition-all duration-300
                                   shadow-lg hover:shadow-xl
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSearching ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Searching...
                            </>
                          ) : (
                            <>
                              <FiSearch className="w-5 h-5" />
                              Search Vehicle
                            </>
                          )}
                        </motion.button>
                      </form>
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-4 p-4 rounded-lg bg-error-light/10 dark:bg-error-dark/10 border border-error-light/20 dark:border-error-dark/20"
                          >
                            <div className="flex items-center gap-2 text-error-light dark:text-error-dark">
                              <FiAlertCircle className="w-5 h-5" />
                              <span>{error}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="hidden lg:block"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full blur-3xl" />
                      <motion.img
                        src="/vehicle-illustration.svg"
                        alt="Vehicle Illustration"
                        className="relative z-10 w-full h-auto"
                        animate={{
                          y: [0, -20, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
              <AnimatedPattern />
              <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
                >
                  Why Choose Vehicle Adda?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto"
                >
                  Experience the future of vehicle information management with our comprehensive platform.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard
                    icon={FiShield}
                    title="Secure Access"
                    description="Your vehicle information is protected with state-of-the-art security measures and end-to-end encryption."
                    delay={0.2}
                    gradient="from-blue-500/20 to-purple-500/20"
                  />
                  <FeatureCard
                    icon={FiClock}
                    title="Real-time Updates"
                    description="Get instant access to the latest vehicle information, insurance status, and challan history."
                    delay={0.4}
                    gradient="from-purple-500/20 to-pink-500/20"
                  />
                  <FeatureCard
                    icon={FiCheckCircle}
                    title="Verified Information"
                    description="All data is verified and sourced directly from official records, ensuring accuracy and reliability."
                    delay={0.6}
                    gradient="from-pink-500/20 to-red-500/20"
                  />
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
                >
                  How It Works
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto"
                >
                  Get started in three simple steps
                </motion.p>
                <div className="max-w-3xl mx-auto space-y-8">
                  <Step
                    number={1}
                    title="Enter Registration Number"
                    description="Input your vehicle's registration number in the search box above"
                    icon={FiSearch}
                    delay={0.2}
                  />
                  <Step
                    number={2}
                    title="Instant Verification"
                    description="Our system instantly verifies your registration number against our database"
                    icon={FiCheckCircle}
                    delay={0.4}
                  />
                  <Step
                    number={3}
                    title="Access Details"
                    description="View comprehensive vehicle information, including ownership, insurance, and challans"
                    icon={FiArrowRight}
                    delay={0.6}
                  />
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
                >
                  What Our Users Say
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto"
                >
                  Join thousands of satisfied users who trust Vehicle Adda
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <TestimonialCard
                    name="Rajesh Kumar"
                    role="Vehicle Owner"
                    content="Vehicle Adda has made it incredibly easy to access my vehicle details. The instant results and secure platform give me peace of mind."
                    rating={5}
                    delay={0.2}
                  />
                  <TestimonialCard
                    name="Priya Sharma"
                    role="Insurance Agent"
                    content="As an insurance agent, I rely on Vehicle Adda for quick and accurate vehicle information. It's a game-changer for our business."
                    rating={5}
                    delay={0.4}
                  />
                  <TestimonialCard
                    name="Amit Patel"
                    role="Car Dealer"
                    content="The verified data and comprehensive information make Vehicle Adda an essential tool for our dealership operations."
                    rating={5}
                    delay={0.6}
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <VehicleDetails vehicle={searchResult} onBack={handleBack} onRetry={handleRetry} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>© 2024 Vehicle Adda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 