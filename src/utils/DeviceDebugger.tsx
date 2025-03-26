import React, { useState } from 'react';
import useResponsive from '../hooks/useResponsive';

type PositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface DeviceDebuggerProps {
  position?: PositionType;
}

/**
 * DeviceDebugger - A development utility component that displays current screen/device information
 * This component should be used during development to help with responsive design
 */
const DeviceDebugger: React.FC<DeviceDebuggerProps> = ({ position = 'bottom-right' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const responsive = useResponsive();
  
  // Only show in development environment
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  // Position classes
  const positionClasses: Record<PositionType, string> = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };
  
  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 bg-white dark:bg-gray-800 rounded-md shadow-lg text-xs font-mono overflow-hidden transition-all duration-200 border border-gray-200 dark:border-gray-700`}
      style={{ 
        maxWidth: isExpanded ? '300px' : '100px',
        opacity: 0.9
      }}
    >
      {/* Header/Toggle */}
      <div 
        className="bg-gray-100 dark:bg-gray-900 px-2 py-1 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-bold text-gray-700 dark:text-gray-300">
          {isExpanded ? 'Device Info' : 'Dims'}
        </span>
        <span className="text-gray-500">
          {responsive.width}×{responsive.height}
        </span>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-2 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Device:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {responsive.isMobile ? 'Mobile' : responsive.isTablet ? 'Tablet' : 'Desktop'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Width:</span>
            <span className="text-gray-700 dark:text-gray-300">{responsive.width}px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Height:</span>
            <span className="text-gray-700 dark:text-gray-300">{responsive.height}px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Breakpoint:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {responsive.isMobile ? '< 640px' : responsive.isTablet ? '640px - 1024px' : '> 1024px'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDebugger; 