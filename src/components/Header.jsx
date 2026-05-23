import React from "react";

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const navRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  function showNav() {
    setIsNavOpen((prev) => {
      console.log('Navigation toggled:', !prev);
      return !prev;
    });
  }

  // Close nav when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside nav menu AND outside the hamburger button
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }
    };

    // Close nav when pressing ESC key
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    // Add event listeners when nav is open
    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    }

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isNavOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-light shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
        {/* Logo / Name */}
        <div className="text-main">
          <a href="#home" className="text-2xl font-bold text-dark hover:text-primary transition-colors duration-300">
            Andrew<span className="text-white">Chemiati</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 text-base font-semibold text-dark md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="border border-light px-3 py-1 block rounded-sm hover:bg-primary hover:text-light transition">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-8 text-base font-semibold text-dark md:hidden">
          <button 
            ref={buttonRef}
            onClick={showNav} 
            aria-label="Toggle menu"
            className="text-2xl"
          >
            <i className="fas fa-bars"></i>
          </button>

          {isNavOpen && (
            <>
              {/* Backdrop overlay - clicks here will close the menu */}
              <div 
                className="fixed inset-0 bg-light-color bg-opacity-50 z-40"
                onClick={() => setIsNavOpen(false)}
              />
              
              {/* Mobile Navigation Menu */}
              <div 
                ref={navRef}
                className="absolute top-full right-0 mt-2 w-38 rounded-md bg-light shadow-lg z-50"
              >
                <ul className="py-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a 
                        href={link.href} 
                        className="block px-4 py-2 text-sm text-dark transition duration-200 hover:bg-primary hover:text-light"
                        onClick={() => setIsNavOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;