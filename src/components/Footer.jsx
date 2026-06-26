import React, { useState, useEffect, useCallback, useRef } from 'react';

// ============================================
// Social Link Component
// ============================================
const SocialLink = ({ href, iconClass, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-light transition-all duration-300 hover:bg-accent hover:scale-110 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className={iconClass} aria-hidden="true"></i>
      {isHovered && (
        <span className="sr-only">Currently viewing {label}</span>
      )}
    </a>
  );
};

// ============================================
// Quick Link Component
// ============================================
const QuickLink = ({ href, text, isActive }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <li>
      <a
        href={href}
        className={`text-sm text-gray-300 transition-colors duration-300 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-1 ${prefersReducedMotion ? '' : 'hover:pl-1'
          } ${isActive ? 'text-accent' : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {text}
      </a>
    </li>
  );
};

// ============================================
// Scroll to Top Button
// ============================================
const ScrollToTopButton = ({ show, onClick }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;

    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [show]);

  return (
    <button
      onClick={onClick}
      className="group relative h-14 w-14 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Scroll to top"
      style={{
        transform: prefersReducedMotion ? 'none' : undefined,
        transition: prefersReducedMotion ? 'none' : undefined,
      }}
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeDasharray={`${progress * 2.83} 283`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dasharray 0.3s ease',
          }}
        />
      </svg>

      <i className="fas fa-arrow-up text-2xl relative z-10" aria-hidden="true"></i>

      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none hidden sm:block">
        Back to top
      </span>
    </button>
  );
};

// ============================================
// WhatsApp Button
// ============================================
const WhatsAppButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <button
      onClick={onClick}
      className={`group relative h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${prefersReducedMotion ? '' : 'animate-bounce-slow'
        }`}
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationPlayState: isHovered || prefersReducedMotion ? 'paused' : 'running',
      }}
    >
      <i className="fab fa-whatsapp text-2xl" aria-hidden="true"></i>

      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none hidden sm:block">
        Let's chat on WhatsApp!
      </span>
    </button>
  );
};

// ============================================
// Main Footer Component
// ============================================
function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const footerRef = useRef(null);

  const socialLinks = [
    {
      href: "https://github.com/csAndrew",
      iconClass: "fab fa-github",
      label: "GitHub Profile",
    },
    {
      href: "https://www.linkedin.com/in/c-s-andrew",
      iconClass: "fab fa-linkedin-in",
      label: "LinkedIn Profile",
    },
    {
      href: "https://www.instagram.com/csandrew_ke",
      iconClass: "fab fa-instagram",
      label: "Instagram Profile",
    },
    {
      href: "https://twitter.com/cs_andrew",
      iconClass: "fab fa-twitter",
      label: "Twitter Profile",
    },
  ];

  const quickLinks = [
    { text: "Home", href: "#home" },
    { text: "About", href: "#about" },
    { text: "Services", href: "#services" },
    { text: "Portfolio", href: "#portfolio" },
    { text: "Contact", href: "#contact" },
  ];

  const legalLinks = [
    { text: "Terms & Conditions", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Cookie Policy", href: "/cookies" },
  ];

  // ============================================
  // Scroll Handler with Debounce
  // ============================================
  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      // Debounce the scroll check
      if (timeoutId) {
        cancelAnimationFrame(timeoutId);
      }

      timeoutId = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        setShowScrollTop(scrollY > 400);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        cancelAnimationFrame(timeoutId);
      }
    };
  }, []);

  // ============================================
  // Scroll to Top with Smooth Behavior
  // ============================================
  const scrollToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, []);

  // ============================================
  // WhatsApp Handler
  // ============================================
  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "254735916581";
    const message = "Hi Andrew, I visited your portfolio and would like to connect!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }, []);

  // ============================================
  // Keyboard Shortcut: Ctrl+Home to scroll to top
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scrollToTop]);

  // ============================================
  // Render
  // ============================================
  return (
    <footer
      ref={footerRef}
      className="bg-dark text-white"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-accent">
              Andrew Chemiati
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              From web design and development to SEO, CRM systems, and E-Commerce platforms,
              I offer a full suite of services to elevate your online presence.
            </p>
            <p className="text-sm text-gray-300">
              Reach out today and let's discuss how I can help you achieve your digital goals.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <div key={social.href} role="listitem">
                  <SocialLink {...social} />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="space-y-4" aria-label="Quick navigation">
            <h4 className="text-lg font-semibold text-accent">Quick Links</h4>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => {
                const isActive = window.location.hash === link.href;
                return (
                  <QuickLink
                    key={link.text}
                    {...link}
                    isActive={isActive}
                  />
                );
              })}
            </ul>
          </nav>

          {/* Column 3: Contact Information */}
          <address className="space-y-4 not-italic">
            <h4 className="text-lg font-semibold text-accent">Reach Out On</h4>

            <div className="space-y-3">
              {/* Location */}
              <div className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-accent mt-1" aria-hidden="true"></i>
                <div>
                  <span className="text-sm font-medium text-gray-400 block">Location</span>
                  <span className="text-sm text-gray-300">Nairobi, Kenya</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <i className="fas fa-phone text-accent mt-1" aria-hidden="true"></i>
                <div>
                  <span className="text-sm font-medium text-gray-400 block">Phone</span>
                  <a
                    href="tel:+254735916581"
                    className="text-sm text-gray-300 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-1"
                    aria-label="Call me at plus 254 735 916 581"
                  >
                    +254 735 916 581
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <i className="fas fa-envelope text-accent mt-1" aria-hidden="true"></i>
                <div>
                  <span className="text-sm font-medium text-gray-400 block">Email</span>
                  <a
                    href="mailto:andreaschemiati@gmail.com"
                    className="text-sm text-gray-300 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-1"
                    aria-label="Send email to andreaschemiati at gmail dot com"
                  >
                    andreaschemiati@gmail.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 pt-2 border-t border-gray-700">
                <i className="fas fa-clock text-accent mt-1" aria-hidden="true"></i>
                <div>
                  <span className="text-sm font-medium text-gray-400 block">Working Hours</span>
                  <span className="text-sm text-gray-300">Mon-Fri: 9:00 AM - 6:00 PM (EAT)</span>
                </div>
              </div>
            </div>
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-xs text-gray-400">
              © {currentYear} Andrew Chemiati. All rights reserved.
            </p>

            <nav className="flex flex-wrap justify-center gap-4 text-xs" aria-label="Legal links">
              {legalLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-gray-400 transition-colors duration-300 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-1"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

        {/* WhatsApp Button */}
        <WhatsAppButton onClick={handleWhatsAppClick} />

        {/* Scroll to Top Button */}
        <ScrollToTopButton
          show={showScrollTop}
          onClick={scrollToTop}
        />

      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-bounce-slow {
              animation: none !important;
            }
            
            .group:hover {
              transform: none !important;
            }
          }

          @media (max-width: 640px) {
            .fixed {
              bottom: 4rem;
            }
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;