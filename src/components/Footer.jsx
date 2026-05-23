import React, { useState, useEffect } from "react";

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const socialLinks = [
    {
      href: "https://github.com/csAndrew",
      iconClass: "fab fa-github",
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/c-s-andrew",
      iconClass: "fab fa-linkedin-in",
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/csandrew_ke",
      iconClass: "fab fa-instagram",
      label: "Instagram",
    },
    {
      href: "https://twitter.com/cs_andrew",
      iconClass: "fab fa-twitter",
      label: "Twitter",
    },
  ];

  const quickLinks = [
    { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
    { text: "Contact", href: "#contact" },
    { text: "Resume", href: "/resume.pdf" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "254735916581"; // Replace with your actual WhatsApp number
    const message = "Hi Andrew, I visited your portfolio and would like to connect!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <footer className="bg-dark py-12 text-center text-light relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {/* Quick Links - subtle addition */}
          <div className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            {quickLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-light transition duration-300 transform hover:scale-110 hover:bg-primary hover:shadow-lg"
              >
                <i className={social.iconClass}></i>
              </a>
            ))}
          </div>

          {/* Copyright with dynamic year */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Andrew Chemiati. Crafted with passion for great experiences.
          </p>

          
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Scroll to Top Button - appears after scrolling */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="group relative h-12 w-12 rounded-full bg-gray-800 text-white shadow-lg transition-all duration-300 hover:bg-primary hover:scale-110"
            aria-label="Scroll to top"
          >
            <i className="fas fa-arrow-up text-sm"></i>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
              Back to top
            </span>
          </button>
        )}

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="group relative h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounce-slow"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
          
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
            Let's chat on WhatsApp!
          </span>
        </button>
      </div>

      <style jsx>{`
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
      `}</style>
    </>
  );
}

export default Footer;