import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { throttle } from 'lodash';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SidebarProfile from './components/SidebarProfile';

//

const Contact = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { name: '', email: '', subject: '', message: '' };
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
    if (!formData.subject.trim()) {
      newErrors.subject = 'Title is required';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      alert('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again later.');
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

      <Navbar />

      {/* Contact Section */}
      <motion.main
        ref={contactRef}
        variants={slideInVariants}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-8">
          <SidebarProfile />
          <div className="text-center">
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

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
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
            className="bg-indigo-900 border-2 border-blue-500 rounded-lg p-4 sm:p-6 shadow-lg"
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
              <label htmlFor="subject" className="block text-blue-200 mb-2">
                Title
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 bg-indigo-800 border border-blue-700 rounded text-white"
                placeholder="How can I help?"
                aria-required="true"
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
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

export default Contact;