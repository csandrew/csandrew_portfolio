import React, { useState, useRef, useEffect, useCallback } from 'react';

const SkillMarquee = () => {
  const skills = [
    { name: "React.js", icon: "fab fa-react" },
    { name: "Next.js", icon: "fab fa-nextjs" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "TypeScript", icon: "fab fa-typescript" },
    { name: "Node.js", icon: "fab fa-node" },
    { name: "Python", icon: "fab fa-python" },
    { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "Git", icon: "fab fa-git-alt" },
    { name: "MongoDB", icon: "fas fa-database" },
    { name: "PostgreSQL", icon: "fas fa-database" },
    { name: "WordPress", icon: "fab fa-wordpress" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Docker", icon: "fab fa-docker" },
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Function to create unique IDs for each skill
  const getSkillId = (skill, index) => {
    return `${skill.name}-${index}`;
  };

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Triple the array for smooth infinite scroll (only if not reduced motion)
  const scrollingSkills = prefersReducedMotion 
    ? skills 
    : [...skills, ...skills, ...skills];

  // Toggle animation pause
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Announce motion state to screen readers
  useEffect(() => {
    if (isPaused) {
      const announcement = document.getElementById('marquee-announcement');
      if (announcement) {
        announcement.textContent = 'Skill carousel paused';
      }
    }
  }, [isPaused]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-dark py-12 overflow-hidden mt-16"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center mb-10">
          <h3 id="skills-heading" className="text-3xl font-bold text-white mb-3">
            Technologies I Work With
          </h3>
          <div className="w-24 h-1 bg-accent mx-auto" aria-hidden="true"></div>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Screen reader announcement */}
          <div 
            id="marquee-announcement" 
            className="sr-only" 
            role="status" 
            aria-live="polite"
          >
            {isPaused ? 'Skill carousel paused' : 'Skill carousel scrolling'}
          </div>

          <div 
            ref={trackRef}
            className={`flex ${!prefersReducedMotion ? 'marquee-track' : ''}`}
            style={{ 
              animationPlayState: isPaused || prefersReducedMotion ? 'paused' : 'running',
              width: prefersReducedMotion ? '100%' : 'max-content',
              flexWrap: prefersReducedMotion ? 'wrap' : 'nowrap',
              justifyContent: prefersReducedMotion ? 'center' : 'flex-start',
            }}
            role="marquee"
            aria-label="Scrolling list of technologies"
          >
            {scrollingSkills.map((skill, idx) => {
              // Generate a stable key using skill name and position
              const uniqueKey = `${skill.name}-${idx % skills.length}-${Math.floor(idx / skills.length)}`;
              
              return (
                <div
                  key={uniqueKey}
                  className={`flex-shrink-0 w-36 sm:w-44 ${prefersReducedMotion ? 'm-2' : 'mx-4'}`}
                  role="listitem"
                >
                  <div 
                    className="bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    tabIndex={0}
                    aria-label={`Skill: ${skill.name}`}
                  >
                    <i 
                      className={`${skill.icon} text-4xl sm:text-5xl text-secondary mb-3`} 
                      aria-hidden="true"
                    ></i>
                    <p className="text-dark font-semibold text-sm sm:text-base mt-2">
                      {skill.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pause/Play Controls - Only show if motion is allowed */}
          {!prefersReducedMotion && (
            <button
              onClick={togglePause}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white text-dark rounded-full p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isPaused ? "Play skill carousel" : "Pause skill carousel"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }
          
          .marquee-track {
            animation: marquee 40s linear infinite;
            width: max-content;
          }
          
          .marquee-track:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none !important;
            }
          }
        `}
      </style>
    </section>
  );
};

// About Section with Marquee
const About = () => {
  return (
    <section id="about" className="bg-white py-20" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 id="about-heading" className="inline-block text-center text-3xl font-bold text-dark sm:text-4xl">
            About Me
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-4" aria-hidden="true"></div>

          <div className="text-base leading-8 text-main sm:text-lg m-2">
            <p>
              Hi, I'm <span className="font-semibold text-primary">Andrew Chemiati</span> - a Full-Stack Developer based in Nairobi, Kenya.
              My journey into tech comes from the passion to understand how software can automate tasks and help businesses get advantage.
            </p>
            <p className="mt-4">
              My stack is MongoDB, Express, React, and Node.js, but I'm always learning new technologies and frameworks that can help me build custom solutions.
              I believe that a good system is about functionality, scalability, and real-world impact.
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <figure className="overflow-hidden rounded-[10px] shadow-xl shadow-light">
            <img 
              src="/assets/images/iface.jpg" 
              alt="Andrew Chemiati - Full-Stack Developer based in Nairobi, Kenya" 
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/images/fallback-avatar.jpg'; // Fallback image
              }}
            />
            <figcaption className="sr-only">Portrait of Andrew Chemiati</figcaption>
          </figure>

          <article className="text-base leading-8 text-main sm:text-lg m-2">
            <p className="text-base leading-8 text-main sm:text-lg mt-4">
              <strong className="font-semibold">What drives me:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 m-4" aria-label="Values and motivations">
              <li>I enjoy turning complex ideas into simple, practical solutions that people can actually use.</li>
              <li>I believe technology should solve real problems, not just showcase technical skills.</li>
              <li>I'm constantly exploring new tools, frameworks, and ideas to improve the way I build products.</li>
              <li>I combine development, design, and data-driven thinking to create meaningful user experiences.</li>
              <li>I approach every project as an opportunity to learn, innovate, and create lasting impact.</li>
            </ul>

            <p className="text-base leading-8 text-main sm:text-lg">
              <strong className="font-semibold">What I'm looking for:</strong>
            </p>
            <p className="text-base leading-8 text-main sm:text-lg m-4">
              Opportunities to grow as a developer, collaborate on meaningful projects, and eventually transition into a full-time Software Engineering role where I can solve real problems at scale.
            </p>

            <a 
              href="#contact" 
              className="inline-flex rounded-sm bg-secondary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Contact Andrew Chemiati"
            >
              Get In Touch
            </a>
          </article>
        </div>
      </div>

      {/* Full-Width Skill Marquee */}
      <SkillMarquee />
    </section>
  );
};

export default About;