import React, { useState, useEffect } from 'react';

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Handle CV download with tracking
  const handleDownloadCV = async (e) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      // Simulate download preparation (optional)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = '/assets/Andrew_Chemiati_CV.pdf';
      link.download = 'Andrew_Chemiati_CV_2024.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track download (Google Analytics)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'cv_download', {
          'event_category': 'Engagement',
          'event_label': 'Hero CV Download',
          'value': 1
        });
      }

      // Optional: Show success feedback
      console.log('CV downloaded successfully');
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: Open in new tab
      window.open('/assets/Andrew_Chemiati_CV.pdf', '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&w=2070&q=80";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Fallback anyway
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
      style={{
        backgroundColor: 'var(--dark-color)',
      }}
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
    >
      {/* Background Image with Loading State */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&w=2070&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: imageLoaded ? 0.25 : 0,
        }}
        aria-hidden="true"
      />

      {/* Gradient Overlay for Better Text Readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(80, 80, 80, 0.3) 0%, rgba(80, 80, 80, 0.2) 50%, rgba(80, 80, 80, 0.3) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Animated Background Pattern (Optional) */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-8">

        {/* Main Heading */}
        <h1
          id="hero-heading"
          className={`text-4xl font-bold tracking-tight text-white px-4 sm:text-5xl lg:text-6xl ${prefersReducedMotion ? '' : 'animate-fadeInUp'
            }`}
        >
          Designing & Building Digital Solutions That Work

        </h1>

        {/* Sub Heading */}

        <h2
          id="hero-subheading"
          className={`mx-auto mt-4 max-w-2xl text-lg text-gray-300 sm:text-xl ${prefersReducedMotion ? '' : 'animate-fadeInUp animation-delay-200'
            }`}
        >
          Full-stack developer | MERN specialist 
        </h2>

        {/* Description */}
        <p
          id="hero-description"
          className={`mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg ${prefersReducedMotion ? '' : 'animate-fadeInUp animation-delay-200'
            }`}
        >
          I help businesses work smarter through better technology.
        </p>

        {/* CTA Buttons */}
        <div
          className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${prefersReducedMotion ? '' : 'animate-fadeInUp animation-delay-400'
            }`}
        >
          {/* Primary CTA - View Work */}
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark min-w-[160px]"
            aria-label="View my portfolio projects"
          >
            <i className="fas fa-briefcase mr-2" aria-hidden="true"></i>
            View My Work
          </a>

          {/* Secondary CTA - Download CV */}
          <button
            onClick={handleDownloadCV}
            disabled={isDownloading}
            className={`inline-flex items-center justify-center rounded-md border-2 border-primary px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark min-w-[160px] ${isDownloading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
              }`}
            aria-label={isDownloading ? 'Downloading CV...' : 'Download my CV (PDF, 2.4 MB)'}
            aria-disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Preparing CV...
              </>
            ) : (
              <>
                <i className="fas fa-file-pdf mr-2" aria-hidden="true"></i>
                Download CV
                <span className="ml-2 text-xs opacity-70 font-normal hidden sm:inline">
                  (PDF, 2.4 MB)
                </span>
              </>
            )}
          </button>


        </div>

        {/* Stats / Trust Indicators */}
        <div
          className={`mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 ${prefersReducedMotion ? '' : 'animate-fadeInUp animation-delay-600'
            }`}
        >
          {[
            { number: '5+', label: 'Years Experience' },
            { number: '50+', label: 'Projects Delivered' },
            { number: '30+', label: 'Happy Clients' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">{stat.number}</div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 ${prefersReducedMotion ? 'hidden' : 'animate-bounce'
          }`}
        aria-hidden="true"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-2"
          aria-label="Scroll down to about section"
        >
          <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
          <i className="fas fa-chevron-down text-xl" aria-hidden="true"></i>
        </a>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(-10px);
            }
          }

          .animate-fadeInDown {
            animation: fadeInDown 0.8s ease-out forwards;
          }

          .animate-fadeInUp {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
          }

          .animation-delay-600 {
            animation-delay: 0.6s;
          }

          .animate-bounce {
            animation: bounce 2s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-fadeInDown,
            .animate-fadeInUp,
            .animate-bounce {
              animation: none !important;
              opacity: 1 !important;
            }
          }

          @media (max-width: 640px) {
            .min-h-screen {
              min-height: 100vh;
              padding-top: 100px;
              padding-bottom: 80px;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Hero;