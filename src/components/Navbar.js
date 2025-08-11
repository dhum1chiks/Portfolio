import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Info, Code, Phone } from 'lucide-react';

const defaultNavItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/about', label: 'About', icon: Info },
  { href: '/projects', label: 'Projects', icon: Code },
  { href: '/contact', label: 'Contact', icon: Phone },
];

function Navbar({ navItems = defaultNavItems, brand = 'ARS' }) {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md backdrop-blur-md ${
        scrollY > 50 ? 'bg-black/80 border-b border-blue-800' : 'bg-black/50'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <motion.div className="text-4xl font-extrabold text-blue-300" whileHover={{ scale: 1.05 }} aria-label="brand">
            {brand}
          </motion.div>
          <div className="hidden md:flex space-x-10">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  className="text-xl px-6 py-2 text-blue-200 hover:text-blue-300 hover:underline underline-offset-8 transition-all duration-300 font-bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={item.href} className="flex items-center">
                    {Icon ? <Icon className="w-4 h-4 mr-2" /> : null}
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </div>
          </motion.button>
        </div>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 py-4 bg-black border-t border-blue-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    className="text-blue-200 hover:text-blue-400 py-2"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={item.href} className="flex items-center">
                      {Icon ? <Icon className="w-4 h-4 mr-2" /> : null}
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

export default Navbar;


