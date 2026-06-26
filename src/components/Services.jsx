import React, { useState, useRef, useEffect } from 'react';

const services = [
  {
    id: 'web-development',
    iconClass: 'fas fa-laptop-code',
    title: 'Web Design & Development',
    description:
      'Custom websites, dynamic landing pages, and fully integrated e-commerce platforms designed to attract and engage customers',
    ctaText: 'View Web Projects',
    ctaLink: '#portfolio',
  },
  {
    id: 'automation-and-crm',
    iconClass: 'fas fa-robot',
    title: 'Automation & CRM',
    description:
      'Features like WhatsApp checkout, automated social media ad feeds, and white-label store management systems that require zero coding',
    ctaText: 'See Automation Process',
    ctaLink: '#portfolio',
  },
  {
    id: 'business-growth-solutions',
    iconClass: 'fas fa-cube',
    title: 'Business Growth Solutions',
    description:
      'End-to-end solutions combining website design, SEO, ad setup, and ongoing support to create automated growth engines',
    ctaText: 'View Business Growth Work',
    ctaLink: '#portfolio',
  },
  {
    id: 'seo-and-analytics',
    iconClass: 'fas fa-chart-line',
    title: 'SEO & Analytics',
    description:
      'Tailored strategies to improve search engine rankings, attract qualified traffic, and convert visitors into clients',
    ctaText: 'Learn About SEO',
    ctaLink: '#contact',
  },
];

// Icon Fallback Component
const IconWithFallback = ({ iconClass, title }) => {
  const [hasError, setHasError] = useState(false);
  
  // Check if icon exists (FontAwesome loaded)
  useEffect(() => {
    const checkIcon = () => {
      const elements = document.querySelectorAll(`.${iconClass.split(' ').join('.')}`);
      if (elements.length === 0) {
        setHasError(true);
      }
    };
    
    // Wait for FontAwesome to load
    const timer = setTimeout(checkIcon, 1000);
    return () => clearTimeout(timer);
  }, [iconClass]);

  if (hasError) {
    // Text fallback if icon fails
    return (
      <span 
        className="text-3xl font-bold text-secondary" 
        aria-hidden="true"
        role="img"
      >
        {title.charAt(0)}
      </span>
    );
  }

  return <i className={`${iconClass} text-2xl`} aria-hidden="true"></i>;
};

// Individual Service Card Component
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Navigate to service detail or scroll to section
      const targetSection = document.querySelector(service.ctaLink);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <article
      ref={cardRef}
      className="group rounded-[10px] bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      style={{
        transform: prefersReducedMotion ? 'none' : undefined,
        transition: prefersReducedMotion ? 'none' : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="listitem"
      aria-labelledby={`service-title-${service.id}`}
      aria-describedby={`service-desc-${service.id}`}
      onKeyDown={handleKeyDown}
    >
      {/* Icon Container */}
      <div 
        className="mb-6 flex mx-auto h-14 w-14 items-center justify-center rounded-3xl bg-accent text-dark transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:rounded-2xl"
        aria-hidden="true"
        style={{
          transition: prefersReducedMotion ? 'none' : undefined,
        }}
      >
        <IconWithFallback iconClass={service.iconClass} title={service.title} />
      </div>

      {/* Service Title */}
      <h3 
        id={`service-title-${service.id}`}
        className="text-xl text-center font-semibold text-dark group-hover:text-primary transition-colors duration-300"
        style={{
          transition: prefersReducedMotion ? 'none' : undefined,
        }}
      >
        {service.title}
      </h3>

      {/* Service Description */}
      <p 
        id={`service-desc-${service.id}`}
        className="mt-4 text-main leading-relaxed"
      >
        {service.description}
      </p>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <a
          href={service.ctaLink}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-1"
          aria-label={`Learn more about ${service.title}`}
        >
          <span>{service.ctaText}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Decorative Indicator (for screen readers) */}
      {isHovered && (
        <div className="sr-only" role="status" aria-live="polite">
          Currently viewing {service.title}
        </div>
      )}
    </article>
  );
};

// Main Services Component
function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Intersection Observer for lazy loading/animations
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="bg-light py-24"
      aria-labelledby="services-heading"
      aria-describedby="services-description"
    >
      <div className="mx-auto text-center max-w-7xl px-6 sm:px-8">
        {/* Heading Section */}
        <div className="mb-12">
          <h2 
            id="services-heading"
            className="mb-4 text-center text-3xl font-bold text-dark sm:text-4xl"
            style={{
              transition: prefersReducedMotion ? 'none' : undefined,
            }}
          >
            What I Do
          </h2>
          
         <div className="w-24 h-1 bg-primary mx-auto mt-4" aria-hidden="true"></div>
          
          <p 
            id="services-description"
            className="text-lg text-main leading-relaxed px-3 py-4 mt-6 max-w-3xl mx-auto"
          >
            My services include website design and development, SEO, CRM development, 
            and business-focused digital solutions.
          </p>
        </div>

        {/* Services Grid */}
        <ul 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="List of services offered"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
            />
          ))}
        </ul>

        {/* Additional CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-main mb-6">
            Looking for a custom solution not listed here?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-sm bg-secondary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Contact me for custom solutions"
          >
            Let's Talk About Your Project
          </a>
        </div>
      </div>

      {/* Add animation styles with reduced motion support */}
      <style>
        {`
          /* Base styles */
          .service-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          
          .service-card.visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .service-card {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
            }
            
            .group:hover {
              transform: none !important;
            }
            
            .group-hover\\:scale-110 {
              transform: none !important;
            }
          }

          /* Focus styles for keyboard navigation */
          .group:focus-visible {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
          }

          /* High contrast mode adjustments */
          @media (prefers-contrast: high) {
            .group {
              border: 2px solid currentColor;
            }
            
            .group:hover {
              border-color: #2563eb;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Services;