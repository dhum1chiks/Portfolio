import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { SiPython, SiJavascript, SiReact, SiExpress, SiTailwindcss, SiHtml5, SiCss3, SiGit, SiCplusplus, SiSqlite, SiMongodb, SiPandas, SiNumpy, SiSelenium } from 'react-icons/si';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SidebarProfile from './components/SidebarProfile';
// Certificates added in src/
import dsmlPdf from './Abdul Rehman Siddiqui - DSML 36.pdf.pdf';
import mernPdf from './Abdul Rehman_MERN_Certificate.pdf';
import coursera1Pdf from './Coursera H7SPKFSSZVRL.pdf';
import coursera2Pdf from './Coursera KT99US46YT5P.pdf';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
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

  const skills = [
    { icon: SiPython, label: 'Python', level: 90 },
    { icon: SiJavascript, label: 'JavaScript', level: 85 },
    { icon: SiExpress, label: 'Express', level: 70 },
    { icon: SiReact, label: 'React', level: 85 },
    { icon: SiSqlite, label: 'SQL', level: 75 },
    { icon: SiGit, label: 'Git & GitHub', level: 80 },
    { icon: SiTailwindcss, label: 'Tailwind CSS', level: 80 },
    { icon: SiHtml5, label: 'HTML', level: 95 },
    { icon: SiCss3, label: 'CSS', level: 85 },
    { icon: SiCplusplus, label: 'C++', level: 75 },
    { icon: SiMongodb, label: 'MongoDB (NoSQL)', level: 70 },
    { icon: SiPandas, label: 'Pandas', level: 70 },
    { icon: SiNumpy, label: 'NumPy', level: 75 },
    { icon: SiPython, label: 'BeautifulSoup', level: 65 },
    { icon: SiSelenium, label: 'Selenium', level: 65 },
  ];

  const certificates = [
    {
      title: 'Data Science & ML',
      provider: 'Dice Analytics',
      href: dsmlPdf,
      image: '/data science and ml.png',
    },
    {
      title: 'MERN Certification',
      provider: 'Course/Bootcamp',
      href: mernPdf,
      image: '/mern stack.png',
    },
    {
      title: 'Supervised Machine Learning: Regression and Classification',
      provider: 'Coursera / DeepLearning.ai',
      href: coursera1Pdf,
      image: '/Supervised Machine Learning: Regression and Classification.png',
    },
    {
      title: 'Advanced Learning Algorithms',
      provider: 'Coursera / DeepLearning.ai',
      href: coursera2Pdf,
      image: '/advance learning algorithm.png',
    },
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

      <Navbar />

      
      {/* Main Content with left sidebar */}
      <motion.main
        ref={mainRef}
        variants={slideInVariants}
        initial="hidden"
        animate={mainInView ? "visible" : "hidden"}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 sm:gap-6 md:gap-16">
          <div className="order-2 md:order-1"><SidebarProfile /></div>
          <div className="order-1 md:order-2 text-center md:text-left">
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
            className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-10"
            variants={slideInVariants}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative bg-black/50 p-3 sm:p-4 rounded-lg border border-blue-800 flex items-center justify-center overflow-hidden"
                title={`${skill.label}: ${skill.level}%`}
                aria-label={`${skill.label}: ${skill.level}%`}
              >
                <skill.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-200 transition-transform duration-300 group-hover:scale-110" />

                <div className="pointer-events-none absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div className="text-blue-100 text-sm font-semibold">{skill.label}</div>
                  <div className="mt-1 text-blue-300 text-xs">{skill.level}%</div>
                  <div className="mt-2 w-10/12 h-2 bg-blue-950 rounded-full overflow-hidden border border-blue-900">
                    <div className="h-full bg-blue-500" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          

          <motion.div
            className="flex justify-center space-x-4 mb-8"
            variants={slideInVariants}
          >
            <motion.a
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="/Full_Stack_Abdul_Rehman_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
          </div>
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
          {certificates.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black/50 border border-blue-800 hover:border-blue-500 transition-all rounded-xl overflow-hidden shadow-lg text-left"
              variants={slideInVariants}
            >
              <div className="w-full h-48 border-b border-blue-800 bg-gradient-to-br from-blue-950 to-indigo-900 relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    // Hide image if it fails to load so gradient background remains
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-200 mb-1">{cert.title}</h3>
                <p className="text-sm text-blue-300">{cert.provider}</p>
                <p className="text-xs text-blue-400 mt-1">Click to view PDF</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      <Footer
        links={[
          { Icon: Github, href: 'https://github.com/abdulrehmansiddiqui' },
          { Icon: Linkedin, href: 'https://linkedin.com/in/abdulrehmansiddiqui' },
          { Icon: Instagram, href: 'https://instagram.com/abdulrehmansiddiqui' },
          { Icon: Mail, href: 'mailto:abdulrehmansiddiqui@example.com' },
        ]}
      />
    </div>
  );
};

export default About;