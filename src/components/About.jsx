import { useEffect } from 'react';

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

  // Triple the array for smooth infinite scroll
  const scrollingSkills = [...skills, ...skills, ...skills];

  return (
    <div className="w-full bg-dark py-12 overflow-hidden mt-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white mb-3">Technologies I Work With</h3>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex marquee-track">
            {scrollingSkills.map((skill, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-36 sm:w-44 mx-4"
              >
                {/* FIXED: Solid white background with dark text */}
                <div className="bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer">
                  <i className={`${skill.icon} text-4xl sm:text-5xl text-secondary mb-3`}></i>
                  <p className="text-dark font-semibold text-sm sm:text-base mt-2">{skill.name}</p>
                </div>
              </div>
            ))}
          </div>
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
        `}
      </style>
    </div>
  );
};

// About Section with Marquee
const About = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="inline-block text-center text-3xl font-bold text-dark sm:text-4xl hover:border-b-4 hover:border-primary hover:pb-2 transition-all duration-300">
            About Me
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Personal Introduction */}

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="overflow-hidden rounded-[10px] shadow-xl shadow-light">
            <img src="/assets/images/iface.jpg" alt="Andrew Chemiati" className="h-full w-full object-cover" />
          </div>

          <div className="text-base leading-8 text-main sm:text-lg">
            <p>Hi, I'm <span className="font-semibold text-primary">Andrew Chemiati</span> - a Full-Stack Developer based in Nairobi, Kenya.
              My journey into tech comes from the passion to understatnd how software can automate tasks and help businesses get advantage.
              My stack is MongoDB, Express, React, and Node.js, but I'm always eager to learn new technologies and frameworks that can help me build better solutions.
              I believe that good code isn't just about functionality; it's about reliability, scalability, and real-world impact.
            </p>

            <p className="text-base leading-8 text-main sm:text-lg">
              <span className="font-semibold">What drives me:</span>

              Problem-first thinking: I look for workflow inefficiencies and build solutions that eliminate them.

              Growth mindset: I'm always learning.

              User focus: I care about building things people actually enjoy using.
            </p>

            <p className="text-base leading-8 text-main sm:text-lg">
              <span className="font-semibold">What I'm looking for:</span>
              Opportunities to grow as a developer, collaborate on meaningful projects, and eventually transition into a full-time Software Engineering role where I can solve real problems at scale.
            </p>

            <a href="#contact" className="inline-flex rounded-sm bg-secondary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Full-Width Skill Marquee */}
      <SkillMarquee />
    </section>
  );
};

export default About;