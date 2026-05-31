
function Hero() {
  return (
    <section id="home" className="relative py-42 text-white overflow-hidden"
      style={{
        backgroundColor: 'var(--dark-color)',
      }}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{

         backgroundImage: 'url("https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&w=2070&q=80")',

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
        }}
      />


      {/* Content */}
      
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">Empowering Businesses with Smart Digital Solutions</h1>
          {/*<p className="mt-6 text-xl font-medium text-white sm:text-2xl">Empowering Businesses with Smart Digital Solutions</p> */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white sm:text-lg">
            I create innovative digital experiences that help brands grow, connect with customers, and thrive in the digital world.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#portfolio" className="inline-flex items-center justify-center rounded-sm bg-secondary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary">
              View My Work
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-sm border border-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary">
              Get in Touch
            </a>
          </div>
        </div>
    </section>  
      );
}

      export default Hero;
