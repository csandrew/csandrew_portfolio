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
    { text: "Home", href: "#home" },
    { text: "About", href: "#about" },
    { text: "Services", href: "#services" },
    { text: "My Portfolio", href: "#portfolio" },


  ];

  const legalLinks = [
    { text: "Terms & Conditions", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Cookie Policy", href: "/cookies" },
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
      <footer className="bg-dark text-white">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            {/* Column 1: Brand & Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-accent">Andrew Chemiati</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                From web design and development to SEO, CRM systems, and E-Commerce platforms, I offer a full suite of services to elevate your online presence.
                Reach out today and let's discuss how I can help you achieve your digital goals.
              </p>
              {/* Social Links */}
              {/*<div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-light transition duration-300 hover:bg-accent hover:scale-110 hover:text-white"
                  >
                    <i className={social.iconClass}></i>
                  </a>
                ))}
              </div> */}
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-accent">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors duration-300 hover:text-accent hover:pl-1"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>


            {/* Column 3: Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-accent">Contact Me</h4>
              <p className="text-sm text-gray-300">
                <strong>Address:</strong> Nairobi, Kenya
              </p>
              <p className="text-sm text-gray-300">
                <strong>Email:</strong> <a href="mailto:andreaschemiati@gmail.com" className="text-accent hover:underline">
                  andreaschemiati@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-300">
                <strong>Phone:</strong> <a href="tel:+254735916581" className="text-accent hover:underline">
                  +254 735 916 581
                </a>
              </p>




              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-light transition duration-300 hover:bg-accent hover:scale-110 hover:text-white"
                  >
                    <i className={social.iconClass}></i>
                  </a>
                ))}
              </div>





            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Andrew Chemiati. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                {legalLinks.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    className="text-gray-400 transition-colors duration-300 hover:text-accent"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">


        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="group relative h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounce-slow"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp text-2xl"></i>

          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
            Let's chat on WhatsApp!
          </span>
        </button>
      </div>

      {/* Add animation styles */}
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