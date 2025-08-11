import { Github, Linkedin, Mail } from 'lucide-react';

function Footer({ links = [
  { Icon: Github, href: 'https://github.com/i23-2082' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/abdul-rehman-1080b2262/' },
  { Icon: Mail, href: 'mailto:ar.mazhar005@gmail.com' },
] }) {
  return (
    <footer className="bg-gradient-to-r from-black via-indigo-950 to-blue-950 text-white py-6 px-4 border-t border-blue-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-blue-200">© {new Date().getFullYear()} Abdul Rehman Siddiqui. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {links.map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              {Icon ? <Icon className="w-5 h-5" /> : null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;


