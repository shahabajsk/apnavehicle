import React from 'react';
import { motion } from 'framer-motion';
import { FiCar, FiAlertCircle, FiShield, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Vehicles',
      value: '3',
      change: '+1',
      trend: 'up',
      icon: <FiCar className="w-6 h-6" />,
      color: 'blue',
    },
    {
      title: 'Active Challans',
      value: '2',
      change: '-1',
      trend: 'down',
      icon: <FiAlertCircle className="w-6 h-6" />,
      color: 'red',
    },
    {
      title: 'Insurance Status',
      value: 'Active',
      change: 'Valid',
      trend: 'up',
      icon: <FiShield className="w-6 h-6" />,
      color: 'green',
    },
    {
      title: 'Total Spent',
      value: '₹12,500',
      change: '+₹2,500',
      trend: 'up',
      icon: <FiDollarSign className="w-6 h-6" />,
      color: 'purple',
    },
  ];

  const recentActivity = [
    {
      title: 'Vehicle Added',
      description: 'Added new vehicle KA-01-AB-1234',
      time: '2 hours ago',
      type: 'success',
    },
    {
      title: 'Challan Paid',
      description: 'Paid challan for KA-01-AB-1234',
      time: '1 day ago',
      type: 'success',
    },
    {
      title: 'Insurance Renewal',
      description: 'Insurance renewed for KA-01-AB-1234',
      time: '2 days ago',
      type: 'info',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900 flex items-center justify-center`}>
                  <div className={`text-${stat.color}-600 dark:text-${stat.color}-400`}>
                    {stat.icon}
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.trend === 'up' ? <FiTrendingUp className="w-4 h-4" /> : <FiTrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'
                  }`}>
                    <div className={`${
                      activity.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {activity.type === 'success' ? '✓' : 'i'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{activity.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                <FiCar className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Add Vehicle</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                <FiShield className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Renew Insurance</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                <FiDollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Pay Challan</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                <FiAlertCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">View Reports</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview; 