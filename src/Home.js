import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Info, Code, FileText } from 'lucide-react';
import { throttle } from 'lodash';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SidebarProfile from './components/SidebarProfile';

//

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Ref and inView hook for scroll animation
  const mainRef = useRef(null);
  const mainInView = useInView(mainRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseMove.cancel();
    };
  }, []);

  const actionButtons = [
    { label: 'About Me', icon: Info, href: '/about' },
    { label: 'Resume', icon: FileText, href: '/resume.pdf', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'Portfolio', icon: Code, href: '/projects' },
    { label: 'Contact', icon: Mail, href: '/contact' },
  ];

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
      <Navbar />

      {/* Hero Section Redesigned */}
      <motion.main
        ref={mainRef}
        variants={slideInVariants}
        initial="hidden"
        animate={mainInView ? 'visible' : 'hidden'}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-10 items-start">
          <SidebarProfile />
          <div className="grid grid-cols-1 gap-10 items-center">
            <div>
              <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4 leading-tight" variants={slideInVariants}>
                Hi, I'm <span className="text-blue-400">Abdul Rehman Siddiqui</span>
              </motion.h1>
              <motion.h2 className="text-xl sm:text-2xl text-blue-300 mb-6" variants={slideInVariants}>
                Full Stack Developer | Data Analyst | ML Enthusiast
              </motion.h2>
              <motion.p className="text-lg text-blue-200 max-w-xl" variants={slideInVariants}>
                I specialize in building responsive web applications using MERN stack, and exploring the intersection of AI and user experience. Proficient in C++, Python, JavaScript, React, Node.js, SQL & data analysis.
              </motion.p>

              <div className="flex space-x-4 mt-8">
                {[
                  { Icon: Github, href: 'https://github.com/i23-2082' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/abdul-rehman-1080b2262/' },
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
                    {Icon ? <Icon className="w-6 h-6 text-white" /> : null}
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {actionButtons.map((button) => {
                  const Icon = button.icon;
                  return (
                    <motion.div
                      key={button.label}
                      className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl flex items-center space-x-2"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      variants={slideInVariants}
                    >
                      {Icon ? <Icon className="w-5 h-5" /> : null}
                      {button.label === 'Resume' ? (
                        <a href="/Full_Stack_Abdul_Rehman_Resume.pdf" target="_blank" rel="noopener noreferrer">
                          <span>{button.label}</span>
                        </a>
                      ) : (
                        <Link to={button.href} target={button.target} rel={button.rel}>
                          <span>{button.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer
        links={[
          { Icon: Github, href: 'https://github.com/i23-2082' },
          { Icon: Linkedin, href: 'https://www.linkedin.com/in/abdul-rehman-1080b2262/' },
          { Icon: Mail, href: 'mailto:ar.mazhar005@gmail.com' },
        ]}
      />
    </div>
  );
};

export default Portfolio;