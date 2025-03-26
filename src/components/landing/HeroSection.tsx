import React, { forwardRef, useState, useEffect } from 'react';
import { motion, MotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCar, FiTruck, FiBriefcase, FiKey, FiShield, FiSettings } from 'react-icons/fi';
import useResponsive from '../../hooks/useResponsive';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

type VehiclePart = {
  id: string;
  name: string;
  position: { x: string; y: string };
  icon: React.ReactNode;
  description: string;
};

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ onMouseMove, onMouseEnter, onMouseLeave, mouseX, mouseY, timeOfDay }, ref) => {
    const { isDarkMode } = useTheme();
    const { isMobile, isTablet, deviceType } = useResponsive();
    const [activeVehiclePart, setActiveVehiclePart] = useState<string | null>(null);
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    
    // For device orientation tilt effect
    const [tiltX, setTiltX] = useState(0);
    const [tiltY, setTiltY] = useState(0);
    
    // Search suggestions
    const allSuggestions = [
      'car rental', 'truck rental', 'vehicle maintenance', 
      'fleet management', 'driver services', 'car tracking',
      'vehicle insurance', 'maintenance schedule', 'fuel management'
    ];
    
    // Parallax effect values
    const bgX = useTransform(mouseX, [0, window.innerWidth], [10, -10]);
    const bgY = useTransform(mouseY, [0, window.innerHeight], [5, -5]);
    
    const midX = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
    const midY = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
    
    const frontX = useTransform(mouseX, [0, window.innerWidth], [30, -30]);
    const frontY = useTransform(mouseY, [0, window.innerHeight], [15, -15]);
    
    // Smooth spring animation for mouse parallax
    const smoothBgX = useSpring(bgX, { stiffness: 100, damping: 30 });
    const smoothBgY = useSpring(bgY, { stiffness: 100, damping: 30 });
    const smoothMidX = useSpring(midX, { stiffness: 100, damping: 30 });
    const smoothMidY = useSpring(midY, { stiffness: 100, damping: 30 });
    const smoothFrontX = useSpring(frontX, { stiffness: 100, damping: 30 });
    const smoothFrontY = useSpring(frontY, { stiffness: 100, damping: 30 });
    
    // Vehicle parts to highlight
    const vehicleParts: VehiclePart[] = [
      {
        id: 'engine',
        name: 'Engine Monitoring',
        position: { x: '20%', y: '55%' },
        icon: <FiSettings />,
        description: 'Real-time engine diagnostics and maintenance alerts'
      },
      {
        id: 'security',
        name: 'Vehicle Security',
        position: { x: '45%', y: '35%' },
        icon: <FiShield />,
        description: 'Advanced security features with remote monitoring'
      },
      {
        id: 'tracking',
        name: 'GPS Tracking',
        position: { x: '70%', y: '60%' },
        icon: <FiCar />,
        description: 'Live location tracking and route history'
      },
      {
        id: 'dashboard',
        name: 'Smart Dashboard',
        position: { x: '35%', y: '65%' },
        icon: <FiBriefcase />,
        description: 'Comprehensive analytics and reports'
      },
      {
        id: 'key',
        name: 'Digital Key',
        position: { x: '60%', y: '45%' },
        icon: <FiKey />,
        description: 'Secure keyless access and sharing'
      }
    ];
    
    // Filter suggestions based on search query
    useEffect(() => {
      if (searchQuery.length > 0) {
        const filtered = allSuggestions.filter(suggestion => 
          suggestion.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, [searchQuery]);
    
    // Device orientation effect for mobile and tablet
    useEffect(() => {
      if ((isMobile || isTablet) && typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        const handleOrientation = (event: DeviceOrientationEvent) => {
          if (event.beta && event.gamma) {
            // Convert orientation values to tilt ranges
            const x = Math.min(Math.max(event.gamma, -10), 10) * -1; // gamma: left-right tilt
            const y = Math.min(Math.max(event.beta - 45, -10), 10); // beta: front-back tilt
            
            setTiltX(x);
            setTiltY(y);
          }
        };
        
        window.addEventListener('deviceorientation', handleOrientation);
        
        return () => {
          window.removeEventListener('deviceorientation', handleOrientation);
        };
      }
    }, [isMobile, isTablet]);
    
    // Get background gradient based on time of day
    const getTimeBasedBackground = () => {
      switch(timeOfDay) {
        case 'morning':
          return isDarkMode 
            ? 'from-indigo-900 via-blue-800 to-cyan-900' 
            : 'from-blue-400 via-indigo-300 to-cyan-400';
        case 'afternoon':
          return isDarkMode 
            ? 'from-blue-900 via-sky-800 to-cyan-900' 
            : 'from-blue-400 via-sky-300 to-cyan-300';
        case 'evening':
          return isDarkMode 
            ? 'from-violet-900 via-purple-800 to-indigo-900' 
            : 'from-orange-400 via-amber-300 to-red-400';
        case 'night':
          return isDarkMode 
            ? 'from-slate-900 via-gray-800 to-neutral-900' 
            : 'from-slate-700 via-indigo-800 to-gray-800';
        default:
          return isDarkMode 
            ? 'from-blue-900 via-indigo-800 to-purple-900' 
            : 'from-blue-400 via-indigo-300 to-purple-400';
      }
    };
    
    // Ripple effect for search bar
    const searchRippleVariants = {
      hidden: { 
        scale: 0.95, 
        opacity: 0 
      },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      },
      exit: { 
        scale: 1.1, 
        opacity: 0,
        transition: {
          duration: 0.3
        }
      }
    };
    
    // Calculate device-based parallax transform
    const getDeviceBasedTransform = (layerDepth: number) => {
      // Only apply device-based transform on mobile or tablet
      if (isMobile || isTablet) {
        return {
          x: `${tiltX * layerDepth}px`,
          y: `${tiltY * layerDepth}px`
        };
      }
      
      return {};
    };

    return (
      <section 
        ref={ref}
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br"
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Background Gradient Layer */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getTimeBasedBackground()} -z-10`} />
        
        {/* Floating Particles & Shapes - Background Layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            x: isMobile || isTablet ? tiltX * 2 : smoothBgX,
            y: isMobile || isTablet ? tiltY * 2 : smoothBgY,
          }}
        >
          {/* Animated background shapes */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`bg-particle-${i}`}
              className={`absolute rounded-full bg-white dark:bg-primary-400 opacity-${Math.random() > 0.5 ? '10' : '15'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
              }}
              animate={{
                y: [0, Math.random() * 20 - 10, 0],
                opacity: [0.1, Math.random() * 0.2 + 0.1, 0.1],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 5 + 10,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Middle Layer - Glowing orbs */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            x: isMobile || isTablet ? tiltX * 5 : smoothMidX,
            y: isMobile || isTablet ? tiltY * 5 : smoothMidY,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`mid-particle-${i}`}
              className={`absolute rounded-full bg-gradient-to-r ${
                i % 2 === 0 ? 
                'from-primary-400/20 to-cyan-400/20 dark:from-primary-500/15 dark:to-cyan-500/15' : 
                'from-indigo-400/20 to-purple-400/20 dark:from-indigo-500/15 dark:to-purple-500/15'
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                filter: 'blur(20px)',
              }}
              animate={{
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
                scale: [1, Math.random() * 0.3 + 0.9, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 20 + 20,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Front Layer - Content Container */}
        <motion.div 
          className="container mx-auto px-4 md:px-8 py-24 md:py-28 lg:py-32 relative z-10"
          style={{
            x: isMobile || isTablet ? tiltX * 8 : smoothFrontX,
            y: isMobile || isTablet ? tiltY * 8 : smoothFrontY,
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Hero Content */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Revolutionize Your
                <span className="text-primary-300 dark:text-primary-400 block mt-2">Vehicle Management</span>
              </motion.h1>
              
              <motion.p
                className="text-lg md:text-xl text-white/80 mb-8 max-w-lg mx-auto md:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                The all-in-one platform for tracking, managing, and optimizing your vehicles. Take control with our powerful yet simple solution.
              </motion.p>
              
              {/* Search Bar with Ripple Effect */}
              <motion.div 
                className="relative max-w-md mx-auto md:mx-0 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <div 
                  className={`flex items-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                    searchActive ? 'shadow-lg ring-2 ring-primary-400/50' : ''
                  }`}
                >
                  <div className="flex-grow flex items-center">
                    <FiSearch className="ml-4 text-white" size={20} />
                    <input
                      type="text"
                      placeholder="Search for services..."
                      className="bg-transparent flex-grow py-3 px-3 text-white placeholder-white/70 outline-none"
                      onFocus={() => setSearchActive(true)}
                      onBlur={() => setTimeout(() => setSearchActive(false), 200)}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {/* Search Button with Hover Effect */}
                  <button 
                    className="h-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors duration-300"
                  >
                    Search
                  </button>
                </div>
                
                {/* Ripple Effect Animation */}
                <AnimatePresence>
                  {searchActive && (
                    <motion.div
                      className="absolute -inset-1 rounded-full bg-primary-400/20 -z-10"
                      variants={searchRippleVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
                
                {/* Search Suggestions */}
                <AnimatePresence>
                  {searchActive && suggestions.length > 0 && (
                    <motion.div 
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-xl overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
                        {suggestions.map((suggestion, index) => (
                          <motion.li 
                            key={suggestion}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer text-neutral-800 dark:text-neutral-200"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              setSearchActive(false);
                            }}
                          >
                            {suggestion}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Features Buttons */}
              <motion.div 
                className="flex flex-wrap gap-2 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                {['Fleet Management', 'GPS Tracking', 'Maintenance'].map((feature, index) => (
                  <motion.button
                    key={feature}
                    className="px-4 py-2 rounded-full text-sm bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {feature}
                  </motion.button>
                ))}
              </motion.div>
            </div>
            
            {/* Interactive Vehicle Illustration */}
            <div className="w-full md:w-1/2 relative">
              <motion.div
                className="relative mx-auto max-w-md aspect-[4/3]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Car Illustration */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/90 to-indigo-500/90 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Car shape/outline - using inline SVG */}
                  <svg 
                    viewBox="0 0 800 600" 
                    className="w-full h-full z-10 relative"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M100,300 Q150,200 300,180 L500,180 Q650,200 700,300 L700,400 Q600,450 400,450 Q200,450 100,400 Z" 
                      className="fill-white/10 stroke-white/40" 
                      strokeWidth="2"
                    />
                    <path 
                      d="M200,300 L600,300" 
                      className="stroke-white/30" 
                      strokeWidth="2"
                    />
                    <ellipse 
                      cx="200" 
                      cy="400" 
                      rx="60" 
                      ry="60" 
                      className="fill-neutral-200/10 stroke-white/50" 
                      strokeWidth="3"
                    />
                    <ellipse 
                      cx="600" 
                      cy="400" 
                      rx="60" 
                      ry="60" 
                      className="fill-neutral-200/10 stroke-white/50" 
                      strokeWidth="3"
                    />
                    <path 
                      d="M280,180 L280,300" 
                      className="stroke-white/20" 
                      strokeWidth="1"
                    />
                    <path 
                      d="M520,180 L520,300" 
                      className="stroke-white/20" 
                      strokeWidth="1"
                    />
                    <rect 
                      x="320" 
                      y="220" 
                      width="160" 
                      height="80" 
                      rx="10" 
                      className="fill-white/5 stroke-white/30" 
                      strokeWidth="1"
                    />
                  </svg>
                  
                  {/* Interactive hotspots/parts */}
                  {vehicleParts.map((part) => (
                    <motion.div
                      key={part.id}
                      className={`absolute cursor-pointer z-20 ${
                        activeVehiclePart === part.id || !activeVehiclePart 
                          ? 'opacity-100' 
                          : 'opacity-40'
                      }`}
                      style={{
                        left: part.position.x,
                        top: part.position.y,
                        transform: 'translate(-50%, -50%)'
                      }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setActiveVehiclePart(
                        activeVehiclePart === part.id ? null : part.id
                      )}
                    >
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 ${
                          activeVehiclePart === part.id 
                            ? 'border-primary-300 text-primary-300' 
                            : 'border-white/50 text-white'
                        }`}
                        whileHover={{ boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}
                        animate={{ 
                          scale: activeVehiclePart === part.id ? [1, 1.1, 1] : 1
                        }}
                        transition={{ 
                          duration: 0.5, 
                          repeat: activeVehiclePart === part.id ? Infinity : 0,
                          repeatType: 'reverse'
                        }}
                      >
                        {part.icon}
                      </motion.div>
                      
                      {/* Part details popup */}
                      <AnimatePresence>
                        {activeVehiclePart === part.id && (
                          <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white p-3 rounded-lg shadow-xl mt-2 z-30 w-48"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="text-sm font-bold mb-1">{part.name}</div>
                            <div className="text-xs text-neutral-600 dark:text-neutral-300">{part.description}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                  
                  {/* Gradients and lighting effects */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.2),transparent_40%)] pointer-events-none"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Wave decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 overflow-hidden">
          <svg 
            className="absolute bottom-0 w-full h-full" 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
          >
            <path 
              className="fill-white dark:fill-neutral-900" 
              fillOpacity="1" 
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export default HeroSection; 