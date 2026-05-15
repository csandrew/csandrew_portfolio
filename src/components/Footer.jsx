
import React from "react";

function Footer() {

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
  ];

  return (
    <footer className="bg-dark py-12 text-center text-light">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p>© 2026 Andrew Chemiati. All rights reserved.</p>

        {/*<p className="mt-3">
          Designed with passion for technology and innovation.
        </p>*/}

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[15px] bg-dark text-light transition duration-300 transform hover:scale-110 hover:bg-primary hover:shadow-lg"
            >
              <i className={social.iconClass}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;