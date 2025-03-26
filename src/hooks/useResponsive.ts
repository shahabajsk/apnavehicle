import { useState, useEffect } from 'react';

// Define the breakpoints
export const breakpoints = {
  sm: 640,  // Small screens: mobile phones
  md: 768,  // Medium screens: tablets
  lg: 1024, // Large screens: small laptops
  xl: 1280, // Extra large screens: desktops
  '2xl': 1536, // 2X large screens: large desktops
};

type Breakpoint = keyof typeof breakpoints;

interface ResponsiveResult {
  isMobile: boolean;       // Below 'md' breakpoint
  isTablet: boolean;       // Between 'md' and 'lg' breakpoints
  isDesktop: boolean;      // 'lg' and above
  isLargeDesktop: boolean; // 'xl' and above
  activeBreakpoint: Breakpoint | null;
  width: number;
  height: number;
  isLandscape: boolean;
  devicePixelRatio: number;
  hasTouchScreen: boolean;
}

interface ResponsiveState {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useResponsive = (): ResponsiveState => {
  const [responsive, setResponsive] = useState<ResponsiveState>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 640,
    isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setResponsive({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return responsive;
};

export default useResponsive; 