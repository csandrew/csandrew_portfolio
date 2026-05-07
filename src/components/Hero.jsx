
function Hero() {
  return (
    <section id="home" className="bg-dark py-24 text-light">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-light">Hi, I'm Andrew Chemiati</h1>
        <p className="mt-6 text-xl font-medium text-light sm:text-2xl">Full-Stack Developer & UI/UX Designer</p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-light sm:text-lg">
          I design and build modern, user-focused digital experiences that are fast, responsive, and visually clean.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#portfolio" className="inline-flex items-center justify-center rounded-sm bg-secondary px-8 py-3 text-sm font-semibold text-light transition hover:bg-primary">
            View My Work
          </a>
          <a href="#contact" className="inline-flex items-center justify-center rounded-sm border border-accent px-8 py-3 text-sm font-semibold text-light transition hover:bg-primary">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;



