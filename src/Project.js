import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Home, Info, Code, Phone, FileText } from 'lucide-react';
import { throttle } from 'lodash';

// Import videos from src/assets/videos/
import taskManagerVideo from './videos/v2.mp4'; // Placeholder, replace with actual video
import resumeTailorAiVideo from './videos/v2.mp4'; // Placeholder, replace with actual video
import genrePredictorVideo from './videos/v2.mp4'; // Placeholder, replace with actual video
import nasconVideo from './videos/v2.mp4'; // Placeholder, replace with actual video
import playfinityVideo from './videos/v2.mp4'; // Placeholder, replace with actual video

// Debug: Log icons to verify they are imported correctly
console.log({ Github, Linkedin, Mail, Home, Info, Code, Phone, FileText });

const Projects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState('');
  const [videoError, setVideoError] = useState('');

  // Ref and inView hook for scroll animation
  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: false, amount: 0.3 });

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

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/projects', label: 'Projects', icon: Code },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  const projects = [
    {
      title: 'Task Manager',
      description:
        'A full-stack web application for team collaboration, allowing users to register/login securely, create and manage teams, add members, and assign tasks. Features a responsive dashboard with task filtering by team or assignee, built with a RESTful API and secure authentication.',
      tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL',"JWT","SupaBase"],
      image: '/projects/task-manager.jpg', // Replace with actual image path
      source: 'https://github.com/i23-2082/task-manager', // Replace with actual GitHub repo link
      demo: taskManagerVideo, // Replace with actual video
      deployedUrl: 'https://task-frontend-gf8v.vercel.app/', // Replace with actual deployed URL
      featured: true,
      category: 'Web',
    },
    {
      title: 'Resume Tailor AI',
      description:
        'A full-stack web application that helps job seekers tailor their resumes to job descriptions in seconds. Features include resume/JD upload, LLM-powered skill comparison, tailored bullet point suggestions, match scoring, and auto-generated cover letters.',
      tech: ['React', 'Tailwind CSS', 'FastAPI',"LLAMA","SupaBase"],
      image: '/projects/resume-tailor-ai.jpg', // Replace with actual image path
      source: 'https://github.com/i23-2082/resume-tailor-ai', // Replace with actual GitHub repo link
      demo: resumeTailorAiVideo, // Replace with actual video
      deployedUrl: 'https://resume-analyzer-frontend-ten.vercel.app/', // Replace with actual deployed URL
      featured: true,
      category: 'Web',
    },
    {
      title: 'Genre Predictor & Translator',
      description:
        'A full-stack web application that predicts genres from text input, translates text into over 50 languages, and generates audio output using text-to-speech. Features a responsive UI, machine learning for genre classification, and integration with Google Translate and gTTS APIs.',
      tech: ['React', 'Flask', 'scikit-learn', 'Google Translate', 'gTTS'],
      image: '/projects/genre-predictor.jpg', // Replace with actual image path
      source: 'https://github.com/i23-2082/genre-predictor-translator', // Replace with actual GitHub repo link
      demo: genrePredictorVideo, // Replace with actual video
      deployedUrl: '#', // Replace with actual deployed URL
      featured: true,
      category: 'Web',
    },
    {
      title: 'NASCON',
      description:
        'A full-stack Database Management System for the NASCON event, automating user management, event and venue scheduling, sponsorships, accommodations, payments, and judging. Features role-based access with DCL, advanced SQL queries, and a responsive UI for seamless event management.',
      tech: ['React', 'Node.js', 'Express', 'MySQL'],
      image: '/projects/nascon.jpg', // Replace with actual image path
      source: 'https://github.com/i23-2082/nascon', // Replace with actual GitHub repo link
      demo: nasconVideo, // Replace with actual video
      deployedUrl: '#', // Replace with actual deployed URL
      featured: true,
      category: 'Web',
    },
    {
      title: 'Playfinity',
      description:
        'A game purchase website for gaming enthusiasts, offering a sleek, user-friendly interface to explore trending games like Call of Duty: Modern Warfare 2, Minecraft, and Elden Ring, alongside game Description.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: '/projects/playfinity.jpg', // Replace with actual image path
      source: 'https://github.com/i23-2082/playfinity', // Replace with actual GitHub repo link
      demo: playfinityVideo, // Replace with actual video
      deployedUrl: '#', // Replace with actual deployed URL
      featured: true,
      category: 'Web',
    },
  ];

  // Filter projects based on active category
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) =>
        project.category === activeFilter ||
        (activeFilter === 'React' && project.tech.includes('React')) ||
        (activeFilter === 'Node.js' && project.tech.includes('Node.js')) ||
        (activeFilter === 'FastAPI' && project.tech.includes('FastAPI')) ||
        (activeFilter === 'Flask' && project.tech.includes('Flask')) ||
        (activeFilter === 'MySQL' && project.tech.includes('MySQL'))
      );

  const handleDemoClick = (demoUrl) => {
    if (demoUrl && demoUrl !== '#') {
      console.log('Opening video:', demoUrl); // Debug log
      setModalVideoUrl(demoUrl);
      setVideoError('');
      setIsModalOpen(true);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 1:
        return 'Video loading was aborted.';
      case 2:
        return 'Network error occurred while loading the video.';
      case 3:
        return 'Video decoding error. The file may be corrupted.';
      case 4:
        return 'Video format not supported or file not found.';
      default:
        return 'Failed to load video. Please check if the file exists or try again.';
    }
  };

  // Animation variants for sliding in from left
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

      {/* Video Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
        >
          <div className="bg-indigo-900 border-2 border-blue-500 rounded-lg p-4 max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="text-blue-200 hover:text-blue-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close video modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            {modalVideoUrl ? (
              <video
                controls
                width="70%"
                className="videoPlayer w-full h-auto rounded mx-auto"
                onError={(e) => {
                  const errorCode = e.target.error ? e.target.error.code : 'Unknown';
                  console.error('Video error code:', errorCode);
                  console.error('Attempted video URL:', modalVideoUrl);
                  setVideoError(getErrorMessage(errorCode));
                }}
              >
                <source src={modalVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="text-blue-200 text-center">Video not available</p>
            )}
            {videoError && <p className="text-red-400 text-center mt-2">{videoError}</p>}
          </div>
        </motion.div>
      )}

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

      {/* Projects Section */}
      <motion.main
        ref={projectsRef}
        variants={slideInVariants}
        initial="hidden"
        animate={projectsInView ? "visible" : "hidden"}
        className="pt-32 pb-16 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-6"
            variants={slideInVariants}
          >
            My Projects
          </motion.h1>

          <div className="flex justify-center space-x-4 mb-8">
            {['All', 'Web', 'React', 'Node.js', 'FastAPI', 'Flask', 'MySQL'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === category ? 'bg-blue-400 text-white' : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-indigo-900 border-4 border-blue-500 rounded-lg p-4 text-left"
                variants={slideInVariants}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded mb-4"
                  loading="lazy"
                />
                {project.featured && (
                  <span className="bg-blue-300 text-black px-2 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                    Featured
                  </span>
                )}
                <h3 className="text-xl font-semibold text-blue-200 mb-2">{project.title}</h3>
                <p className="text-blue-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-sm bg-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <motion.a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex-1 text-center ${
                      project.source === '#' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    whileHover={project.source !== '#' ? { scale: 1.05 } : {}}
                    whileTap={project.source !== '#' ? { scale: 0.95 } : {}}
                    aria-label={`View source code for ${project.title}`}
                  >
                    Source Code
                  </motion.a>
                  <motion.button
                    onClick={() => handleDemoClick(project.demo)}
                    className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex-1 text-center ${
                      project.demo === '#' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    whileHover={project.demo !== '#' ? { scale: 1.05 } : {}}
                    whileTap={project.demo !== '#' ? { scale: 0.95 } : {}}
                    disabled={project.demo === '#'}
                    aria-label={`View live demo for ${project.title}`}
                  >
                    Live Demo
                  </motion.button>
                  {project.deployedUrl && project.deployedUrl !== '#' && (
                    <motion.a
                      href={project.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex-1 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View deployed version of ${project.title}`}
                    >
                      View Deployed
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
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

export default Projects;