import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiAward, FiActivity, FiSettings, FiBell, FiLock, FiGlobe } from 'react-icons/fi';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'success' | 'info' | 'warning';
}

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Early Adopter',
      description: 'Joined Vehicle Adda in the first month',
      icon: '🎯',
      date: '2024-01-15',
    },
    {
      id: '2',
      title: 'Vehicle Master',
      description: 'Added 3 vehicles to your profile',
      icon: '🏆',
      date: '2024-02-20',
    },
    {
      id: '3',
      title: 'Responsible Driver',
      description: 'No challans for 3 months',
      icon: '🌟',
      date: '2024-03-01',
    },
  ];

  const activities: Activity[] = [
    {
      id: '1',
      title: 'Profile Updated',
      description: 'Updated your profile information',
      date: '2 hours ago',
      type: 'success',
    },
    {
      id: '2',
      title: 'Vehicle Added',
      description: 'Added new vehicle KA-01-AB-1234',
      date: '1 day ago',
      type: 'info',
    },
    {
      id: '3',
      title: 'Insurance Renewal',
      description: 'Insurance renewed for KA-01-AB-1234',
      date: '2 days ago',
      type: 'warning',
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser className="w-5 h-5" /> },
    { id: 'achievements', label: 'Achievements', icon: <FiAward className="w-5 h-5" /> },
    { id: 'activity', label: 'Activity', icon: <FiActivity className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl" />
        <div className="relative p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-800 overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=0D9488&color=fff"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <FiUser className="w-4 h-4" />
              </motion.button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">John Doe</h1>
              <p className="text-primary-100">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <FiUser className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Full Name</div>
                      <div className="font-medium text-gray-900 dark:text-white">John Doe</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <FiMail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="font-medium text-gray-900 dark:text-white">john@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <FiPhone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                      <div className="font-medium text-gray-900 dark:text-white">+91 98765 43210</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <FiMapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Address</div>
                      <div className="font-medium text-gray-900 dark:text-white">123 Main St, Bangalore, KA</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <FiCalendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Member Since</div>
                      <div className="font-medium text-gray-900 dark:text-white">January 15, 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="text-3xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {achievement.description}
                    </p>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                    activity.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                    'bg-blue-100 dark:bg-blue-900'
                  }`}>
                    <div className={`${
                      activity.type === 'success' ? 'text-green-600 dark:text-green-400' :
                      activity.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {activity.type === 'success' ? '✓' :
                       activity.type === 'warning' ? '!' : 'i'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{activity.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <FiBell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Push Notifications</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications for updates</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <FiMail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Email Notifications</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for updates</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <FiLock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Profile Visibility</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile</div>
                      </div>
                    </div>
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <FiGlobe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Activity Status</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Show when you're active</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 