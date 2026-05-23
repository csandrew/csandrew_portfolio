
// Projects.jsx
import React from 'react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imageUrl: '/images/project1.jpg',
    liveUrl: 'https://your-live-project.com',
    githubUrl: 'https://github.com/csAndrew/project-name',
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'Decent Humans Website',
    description: 'Organisational website with responsive design and smooth animations.',
    techStack: ['JavaScript', 'Tailwind CSS', 'Python'],
    imageUrl: 'assets/images/decenthumans.png',
    liveUrl: 'https://decenthumans.netlify.app',
    githubUrl: 'https://github.com/csandrew/decent_humans.git',
    category: 'Frontend',
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates.',
    techStack: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    imageUrl: '/images/project3.jpg',
    liveUrl: 'https://task-app.com',
    githubUrl: 'https://github.com/csAndrew/task-manager',
    category: 'Full Stack',
  },
  
];

function Projects() {
  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark sm:text-4xl inline-block hover:border-b-4 hover:border-primary hover:pb-2 transition-all duration-300">
            My Projects
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group rounded-[10px] bg-white overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gray-800">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient from-primary to-secondary">
                    <i className="fas fa-code text-4xl text-white opacity-50"></i>
                  </div>
                )}
                
                {/* Category Badge */}
                <span className="absolute top-4 right-4 bg-accent text-dark text-xs font-semibold px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark mb-2">
                  {project.title}
                </h3>
                <p className="text-main text-sm mb-4">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="bg-light text-dark text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-secondary text-white px-3 py-2 rounded text-sm font-semibold transition hover:bg-primary"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center border border-primary text-dark px-3 py-2 rounded text-sm font-semibold transition hover:bg-primary hover:text-white"
                    >
                      <i className="fab fa-github mr-1"></i> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;