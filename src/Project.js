import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { throttle } from 'lodash';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SidebarProfile from './components/SidebarProfile';

// Import videos with descriptive names matching project names
import genrePredictorVideo from './videos/genre.mp4';
import nasconVideo from './videos/nascon-demo.mp4';
import playfinityVideo from './videos/playfinity-demo.mp4';

//

const Projects = () => {
  const [scrollY, setScrollY] = useState(0);
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

  const projects = [
    {
      title: 'Task Manager',
      description:
        'A full-stack web application for team collaboration, allowing users to register/login securely, create and manage teams, add members, and assign tasks. Features a responsive dashboard with task filtering by team or assignee, built with a RESTful API and secure authentication.',
      tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL',"JWT","SupaBase"],
      image: '/projects/task-manager.jpg', // Replace with actual image path
      source: 'https://github.com/i23-2082/task-manager', // Replace with actual GitHub repo link
       // Replace with actual video
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
      // Replace with actual video
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
          <div className="bg-indigo-900 border-2 border-blue-500 rounded-lg p-3 sm:p-4 w-[94vw] sm:w-[90vw] max-w-3xl" onClick={(e) => e.stopPropagation()}>
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
                className="videoPlayer w-[90vw] sm:w-[85vw] max-w-3xl h-auto rounded mx-auto"
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

      <Navbar />

      {/* Projects Section */}
      <motion.main
        ref={projectsRef}
        variants={slideInVariants}
        initial="hidden"
        animate="visible"
        className="pt-32 pb-16 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-4 sm:gap-6 md:gap-8">
          <div className="order-1 md:order-1"><SidebarProfile /></div>
          <div className="order-2 md:order-2 text-center min-w-0">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-6"
            variants={slideInVariants}
          >
            My Projects
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 w-full">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-indigo-900 border-2 sm:border-4 border-blue-500 rounded-lg p-3 sm:p-4 text-left flex flex-col overflow-hidden"
                variants={slideInVariants}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-36 sm:h-40 object-cover rounded mb-3 sm:mb-4"
                  loading="lazy"
                />
                {project.featured && (
                  <span className="bg-blue-300 text-black px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold mb-2 inline-block">
                    Featured
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-blue-200 mb-1 sm:mb-2">{project.title}</h3>
                <p className="text-sm sm:text-base text-blue-300 mb-3 sm:mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs sm:text-sm bg-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-1 xs:grid-cols-2 gap-2">
                  <motion.a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex-1 text-center ${
                      project.source === '#' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    whileHover={project.source !== '#' ? { scale: 1.05 } : {}}
                    whileTap={project.source !== '#' ? { scale: 0.95 } : {}}
                    aria-label={`View source code for ${project.title}`}
                  >
                    Source Code
                  </motion.a>
                  {/* Only show Live Demo button for projects without deployed URLs */}
                  {(!project.deployedUrl || project.deployedUrl === '#') && (
                    <motion.button
                      onClick={() => handleDemoClick(project.demo)}
                      className={`px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex-1 text-center ${
                        project.demo === '#' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      whileHover={project.demo !== '#' ? { scale: 1.05 } : {}}
                      whileTap={project.demo !== '#' ? { scale: 0.95 } : {}}
                      disabled={project.demo === '#'}
                      aria-label={`View live demo for ${project.title}`}
                    >
                      Live Demo
                    </motion.button>
                  )}
                  {project.deployedUrl && project.deployedUrl !== '#' && (
                    <motion.a
                      href={project.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex-1 text-center"
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

export default Projects;