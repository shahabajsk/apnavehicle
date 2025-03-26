import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.main 
        className="flex-grow pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default MainLayout; 