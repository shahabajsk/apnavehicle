import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import useResponsive from '../hooks/useResponsive';

const Footer = () => {
  const { isMobile } = useResponsive();

  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* First column - About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">Vehicle Adda</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              The one-stop solution for all your vehicle management needs. Track, manage, and optimize your 
              vehicle operations with our comprehensive platform.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Instagram"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiInstagram size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiTwitter size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiFacebook size={20} />
              </a>
              <a 
                href="#" 
                aria-label="YouTube"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Second column - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Third column - Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/fleet-management" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Fleet Management
                </Link>
              </li>
              <li>
                <Link to="/services/maintenance" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Maintenance Tracking
                </Link>
              </li>
              <li>
                <Link to="/services/fuel" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Fuel Monitoring
                </Link>
              </li>
              <li>
                <Link to="/services/reports" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Analytics & Reports
                </Link>
              </li>
              <li>
                <Link to="/services/documentation" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth column - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-primary-600 dark:text-primary-400" />
                <span className="text-neutral-600 dark:text-neutral-300">
                  123 Vehicle Street, Automobile District, VH 12345
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-primary-600 dark:text-primary-400" />
                <span className="text-neutral-600 dark:text-neutral-300">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-primary-600 dark:text-primary-400" />
                <span className="text-neutral-600 dark:text-neutral-300">
                  contact@vehicleadda.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center text-neutral-600 dark:text-neutral-400 text-sm">
          <p>© {year} Vehicle Adda. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 