import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import useResponsive from '../hooks/useResponsive';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  registrationNumber: string;
  lastService: string;
  status: 'active' | 'maintenance' | 'inactive';
  fuelLevel: number;
}

const VehiclesPage = () => {
  const { isMobile } = useResponsive();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refHeader, inViewHeader] = useInView({ threshold: 0.1 });

  // Mock data for vehicles
  useEffect(() => {
    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        name: 'Toyota Camry',
        type: 'Sedan',
        registrationNumber: 'KA-01-MM-1234',
        lastService: '2023-05-15',
        status: 'active',
        fuelLevel: 75
      },
      {
        id: '2',
        name: 'Honda City',
        type: 'Sedan',
        registrationNumber: 'MH-02-AB-5678',
        lastService: '2023-06-22',
        status: 'active',
        fuelLevel: 45
      },
      {
        id: '3',
        name: 'Mahindra Thar',
        type: 'SUV',
        registrationNumber: 'DL-03-CD-9012',
        lastService: '2023-03-10',
        status: 'maintenance',
        fuelLevel: 20
      },
      {
        id: '4',
        name: 'Tata Nexon',
        type: 'SUV',
        registrationNumber: 'TN-04-EF-3456',
        lastService: '2023-07-05',
        status: 'active',
        fuelLevel: 90
      },
      {
        id: '5',
        name: 'Maruti Suzuki Swift',
        type: 'Hatchback',
        registrationNumber: 'KL-05-GH-7890',
        lastService: '2023-04-18',
        status: 'inactive',
        fuelLevel: 0
      },
      {
        id: '6',
        name: 'Hyundai i20',
        type: 'Hatchback',
        registrationNumber: 'GJ-06-IJ-1234',
        lastService: '2023-08-01',
        status: 'active',
        fuelLevel: 60
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setVehicles(mockVehicles);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter vehicles based on search term and active filter
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && vehicle.status === activeFilter;
  });

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Get status styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'maintenance':
        return 'bg-warning-100 text-warning-800';
      case 'inactive':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="py-8">
      <div className="container">
        <motion.div 
          ref={refHeader}
          variants={headerVariants}
          initial="hidden"
          animate={inViewHeader ? "visible" : "hidden"}
          className="mb-8"
        >
          <h1 className="mb-2">Vehicle Management</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track and manage all your vehicles in one place.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeFilter === 'all' 
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeFilter === 'active' 
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveFilter('active')}
            >
              Active
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeFilter === 'maintenance' 
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveFilter('maintenance')}
            >
              Maintenance
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeFilter === 'inactive' 
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveFilter('inactive')}
            >
              Inactive
            </button>
          </div>

          <div className="flex w-full md:w-auto space-x-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Search vehicles..."
                className="form-input pl-10 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 rounded-md bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <FiFilter />
            </button>
            <button className="btn-primary">
              <FiPlus className="mr-1" />
              Add Vehicle
            </button>
          </div>
        </div>

        {/* Vehicles Table/Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 text-center">
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">No vehicles found matching your criteria.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            {!isMobile && (
              <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="overflow-x-auto rounded-lg shadow"
              >
                <table className="min-w-full bg-white dark:bg-neutral-800">
                  <thead className="bg-neutral-50 dark:bg-neutral-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Reg. Number
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Last Service
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Fuel
                      </th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {filteredVehicles.map((vehicle) => (
                      <motion.tr
                        key={vehicle.id}
                        variants={rowVariants}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-750"
                      >
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-neutral-900 dark:text-white">
                                {vehicle.name}
                              </div>
                              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                {vehicle.type}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                          {vehicle.registrationNumber}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                          {new Date(vehicle.lastService).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusStyles(vehicle.status)}`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                            <div 
                              className="bg-primary-600 h-2.5 rounded-full" 
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">{vehicle.fuelLevel}%</span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-right">
                          <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 mx-1">
                            <FiEdit2 />
                          </button>
                          <button className="text-error-600 hover:text-error-800 dark:text-error-400 dark:hover:text-error-300 mx-1">
                            <FiTrash2 />
                          </button>
                          <button className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 mx-1">
                            <FiMoreVertical />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* Mobile Card View */}
            {isMobile && (
              <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    variants={rowVariants}
                    className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-white">
                          {vehicle.name}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {vehicle.type}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusStyles(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 my-3">
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Reg. Number</p>
                        <p className="text-sm text-neutral-800 dark:text-neutral-200">{vehicle.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Last Service</p>
                        <p className="text-sm text-neutral-800 dark:text-neutral-200">
                          {new Date(vehicle.lastService).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Fuel Level</p>
                        <div className="flex items-center">
                          <div className="flex-grow mr-2">
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                              <div 
                                className="bg-primary-600 h-2.5 rounded-full" 
                                style={{ width: `${vehicle.fuelLevel}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs text-neutral-600 dark:text-neutral-400">{vehicle.fuelLevel}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                      <button className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                        <FiEdit2 size={18} />
                      </button>
                      <button className="p-2 text-error-600 hover:text-error-800 dark:text-error-400 dark:hover:text-error-300">
                        <FiTrash2 size={18} />
                      </button>
                      <button className="p-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300">
                        <FiMoreVertical size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VehiclesPage; 