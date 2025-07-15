import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Home, Info, Code, Phone, FileText } from 'lucide-react';
import { throttle } from 'lodash';

// Debug: Log icons to verify they are imported correctly
console.log({ Github, Linkedin, Mail, Home, Info, Code, Phone, FileText });

const Contact = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  // Ref and inView hook for scroll animation
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = throttle((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 100);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseMove.cancel();
    };
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/projects', label: 'Projects', icon: Code },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Form submitted:', formData);
      // TODO: Replace with actual API call or email service
      alert('Message sent successfully!'); // Placeholder for feedback
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-950 via-indigo-950 to-blue-950 text-white font-sans relative overflow-hidden">
      {/* Starry Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(173, 216, 230, 0.2), transparent clamp(150px, 20vw, 250px))`,
        }}
      />

      {/* Header */}
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
            <motion.div
              className="text-4xl font-extrabold text-blue-300"
              whileHover={{ scale: 1.05 }}
              aria-label="Abdul Rehman Siddiqui logo"
            >
              ARS
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
                      {Icon ? <Icon className="w-4 h-4 mr-2" /> : <span>[Icon Missing]</span>}
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
                        {Icon ? <Icon className="w-4 h-4 mr-2" /> : <span>[Icon Missing]</span>}
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

      {/* Contact Section */}
      <motion.main
        ref={contactRef}
        variants={slideInVariants}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        className="pt-32 pb-16 px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-6"
            variants={slideInVariants}
          >
            Get In Touch
          </motion.h1>
          <motion.div
            className="w-16 h-1 bg-blue-400 mx-auto mb-8"
            variants={slideInVariants}
          ></motion.div>

          <div className="flex justify-center space-x-6 mb-12">
            {[
              { Icon: Github, href: 'https://github.com/i23-2082' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/abdul-rehman-1080b2262/' },
              { Icon: Mail, href: 'mailto:ar.mazhar005@gmail.com' },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-xl"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                variants={slideInVariants}
              >
                {Icon ? <Icon className="w-6 h-6 text-white" /> : <span>[Icon Missing]</span>}
              </motion.a>
            ))}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-indigo-900 border-2 border-blue-500 rounded-lg p-6 shadow-lg"
            variants={slideInVariants}
          >
            <div className="mb-4 text-left">
              <label htmlFor="name" className="block text-blue-200 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-indigo-800 border border-blue-700 rounded text-white"
                placeholder="Your name"
                aria-required="true"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block text-blue-200 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-indigo-800 border border-blue-700 rounded text-white"
                placeholder="your.email@example.com"
                aria-required="true"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="message" className="block text-blue-200 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 bg-indigo-800 border border-blue-700 rounded h-32 text-white resize-none"
                placeholder="Tell me about your project..."
                aria-required="true"
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>
            <motion.button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-indigo-950 to-blue-950 text-white py-6 px-4 border-t border-blue-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-200">© {new Date().getFullYear()} Abdul Rehman Siddiqui. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[
              { Icon: Github, href: 'https://github.com/i23-2082' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/abdul-rehman-1080b2262/' },
              { Icon: Mail, href: 'mailto:ar.mazhar005@gmail.com' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                {Icon ? <Icon className="w-5 h-5" /> : <span>[Icon Missing]</span>}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;