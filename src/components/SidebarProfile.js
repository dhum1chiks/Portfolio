import { Github, Linkedin, Mail } from 'lucide-react';

function SidebarProfile({
  name = 'Abdul Rehman Siddiqui',
  title = 'Full Stack Developer',
  email = 'ar.mazhar005@gmail.com',
  location = 'Islamabad, Pakistan',
  // Place this file in public/: public/developer-image.png
  avatarSrc = '/developer image.png',
}) {
  return (
    <aside className="w-full md:w-80 bg-gradient-to-b from-black via-indigo-950 to-blue-950 border border-blue-900 rounded-2xl p-6 md:sticky md:top-24 h-max shadow-xl">
      <div className="flex flex-col items-center text-center">
        <img
          src={avatarSrc}
          alt={name}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.dataset.fallback !== '1') {
              e.currentTarget.src = '/logo192.png';
              e.currentTarget.dataset.fallback = '1';
            }
          }}
          className="w-44 h-56 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
        />
        <h2 className="mt-4 text-2xl font-bold text-blue-200">{name}</h2>
        <div className="mt-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-100 text-sm">
          {title}
        </div>

        <div className="mt-6 w-full space-y-3 text-left">
          <div className="flex items-center gap-3 bg-black/40 border border-blue-900 rounded-xl p-3">
            <Mail className="w-4 h-4 text-blue-300" />
            <a href={`mailto:${email}`} className="text-blue-200 hover:text-blue-300 truncate">
              {email}
            </a>
          </div>
          <div className="flex items-center gap-3 bg-black/40 border border-blue-900 rounded-xl p-3">
            <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-blue-200">{location}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <a
            href="https://github.com/i23-2082"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/abdul-rehman-1080b2262/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default SidebarProfile;


