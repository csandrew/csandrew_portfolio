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
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    }

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isNavOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-light shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-8">
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
            className="relative w-8 h-8 focus:outline-none"
          >
            {/* Hamburger Icon - Animated */}
            <div className="absolute w-6 h-0.5 bg-dark rounded-full transition-all duration-300 ease-in-out"
                 style={{ 
                   top: '28%', 
                   left: '25%',
                   transform: isNavOpen ? 'rotate(45deg) translate(4px, 4px)' : 'rotate(0deg)'
                 }} />
            <div className="absolute w-6 h-0.5 bg-dark rounded-full transition-all duration-300 ease-in-out"
                 style={{ 
                   top: '48%', 
                   left: '25%',
                   opacity: isNavOpen ? 0 : 1
                 }} />
            <div className="absolute w-6 h-0.5 bg-dark rounded-full transition-all duration-300 ease-in-out"
                 style={{ 
                   top: '68%', 
                   left: '25%',
                   transform: isNavOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'rotate(0deg)'
                 }} />
          </button>

          {isNavOpen && (
            <>
              {/* Backdrop overlay - smoother blur effect */}
              <div 
                className="fixed inset-0 bg-light bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setIsNavOpen(false)}
              />
              
              {/* Mobile Navigation Menu - Modern design */}
              <div 
                ref={navRef}
                className="absolute top-full right-0 mt-3 w-64 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50 overflow-hidden animate-slideDown"
              >
                <div className="py-3">
                  {navLinks.map((link, index) => (
                    <a 
                      key={link.href}
                      href={link.href} 
                      className="block px-6 py-3 text-base font-medium text-dark transition-all duration-200 hover:bg-primary hover:text-light hover:pl-8"
                      onClick={() => setIsNavOpen(false)}
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        animation: 'fadeIn 0.3s ease-out forwards',
                        opacity: 0
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                
                {/* Decorative bottom line */}
                <div className="h-1 bg-gradient-to-r from-primary to-secondary"></div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}

export default Header;