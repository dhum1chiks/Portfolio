import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Home, Info, Code, Phone } from 'lucide-react';
import { SiPython, SiJavascript, SiReact, SiExpress, SiTailwindcss, SiHtml5, SiCss3, SiGit, SiCplusplus, SiSqlite, SiMongodb, SiPandas, SiNumpy, SiSelenium } from 'react-icons/si';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs and inView hooks for scroll animations
  const mainRef = useRef(null);
  const certsRef = useRef(null);
  const mainInView = useInView(mainRef, { once: false, amount: 0.3 });
  const certsInView = useInView(certsRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/projects', label: 'Projects', icon: Code },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  const skills = [
    { icon: SiPython, label: 'Python' },
    { icon: SiJavascript, label: 'JS' },
    { icon: SiExpress, label: 'Express' },
    { icon: SiReact, label: 'React' },
    { icon: SiSqlite, label: 'SQL' },
    { icon: SiGit, label: 'GitHub' },
    { icon: SiTailwindcss, label: 'Tailwind' },
    { icon: SiHtml5, label: 'HTML' },
    { icon: SiCss3, label: 'CSS' },
    { icon: SiCplusplus, label: 'C++' },
    { icon: SiMongodb, label: 'NoSQL' },
    { icon: SiPandas, label: 'Pandas' },
    { icon: SiNumpy, label: 'NumPy' },
    { icon: SiPython, label: 'BeautifulSoup' },
    { icon: SiSelenium, label: 'Selenium' },
  ];

  // Animation variants for sliding in from left
  const slideInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-950 via-indigo-950 to-blue-950 text-white font-sans relative overflow-hidden">
      {/* Starry Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(173, 216, 230, 0.2), transparent 200px)`
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
            >
              ARS
            </motion.div>
            <div className="hidden md:flex space-x-10">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  className="text-xl px-6 py-2 text-blue-200 hover:text-blue-300 hover:underline underline-offset-8 transition-all duration-300 font-bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={item.href} className="flex items-center">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800"
              whileTap={{ scale: 0.9 }}
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
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    className="text-blue-200 hover:text-blue-400 py-2"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={item.href} className="flex items-center">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>

      {/* Main Content */}
      <motion.main
        ref={mainRef}
        variants={slideInVariants}
        initial="hidden"
        animate={mainInView ? "visible" : "hidden"}
        className="pt-32 pb-16 px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-6"
            variants={slideInVariants}
          >
            Get to know me!
          </motion.h1>

          <motion.p
            className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto"
            variants={slideInVariants}
          >
            Hi, I’m Abdul Rehman Siddiqui
            I’m a passionate Full Stack Developer based in Islamabad, with a strong foundation in Artificial Intelligence, currently pursuing my degree (completed 4 semesters so far).

            I enjoy building responsive, user-friendly websites and solving real-world problems in the most efficient and scalable way possible. From frontend interfaces to backend logic, I love working across the full stack to bring ideas to life.

            I’m always looking for new opportunities where I can contribute, grow, and keep learning.
          </motion.p>

          <motion.h2
            className="text-3xl font-bold text-blue-400 mb-8"
            variants={slideInVariants}
          >
            My Skillset
          </motion.h2>

          <motion.div
            className="grid grid-cols-5 gap-4 mb-12"
            variants={slideInVariants}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-black/50 p-4 rounded-lg border border-blue-800 flex items-center justify-center"
              >
                <skill.icon className="w-8 h-8 text-blue-200" />
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center space-x-4 mb-8"
            variants={slideInVariants}
          >
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#resume"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.main>

      {/* Certifications Section */}
      <motion.section
        ref={certsRef}
        variants={slideInVariants}
        initial="hidden"
        animate={certsInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-blue-400 mb-8">My Certifications</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Full Stack Development',
              provider: 'Meta on Coursera',
              image: '/certs/fullstack-meta.jpg',
              link: '#',
            },
            {
              title: 'Python for Data Science',
              provider: 'IBM',
              image: '/certs/python-ibm.jpg',
              link: '#',
            },
            {
              title: 'JavaScript (Intermediate)',
              provider: 'HackerRank',
              image: '/certs/js-hackerrank.jpg',
              link: '#',
            },
            {
              title: 'Machine Learning Basics',
              provider: 'Google AI',
              image: '/certs/ml-google.jpg',
              link: '#',
            },
            {
              title: 'React Masterclass',
              provider: 'Udemy',
              image: '/certs/react-udemy.jpg',
              link: '#',
            },
          ].map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black/50 border border-blue-800 hover:border-blue-500 transition-all rounded-xl overflow-hidden shadow-lg text-left"
              variants={slideInVariants}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-48 object-cover border-b border-blue-800"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-1">{cert.title}</h3>
                <p className="text-sm text-blue-300">{cert.provider}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-indigo-950 to-blue-950 text-white py-6 px-4 border-t border-blue-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-200">© 2025 Abdul Rehman Siddiqui. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[
              { Icon: Github, href: 'https://github.com/abdulrehmansiddiqui' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/abdulrehmansiddiqui' },
              { Icon: Instagram, href: 'https://instagram.com/abdulrehmansiddiqui' },
              { Icon: Mail, href: 'mailto:abdulrehmansiddiqui@example.com' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;