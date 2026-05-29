
const skillCategories = [
  { title: 'Frontend', skills: ['JavaScript'] },
  { title: 'Stack', skills: ['MERN Stack'] },
  { title: 'Languages', skills: ['Python'] },
];

function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">

        <div className="text-center mb-12">
          <h2 className="inline-block text-center text-3xl font-bold text-dark sm:text-4xl hover:border-b-4 hover:border-primary hover:pb-2 transition-all duration-300">
            About Me
          </h2>
        </div>


        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="overflow-hidden rounded-[10px] shadow-xl shadow-light">

            <img src="/assets/images/iface.jpg" alt="Andrew Chemiati" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-base leading-8 text-main sm:text-lg">
              I specialize in creating modern digital solutions that help businesses establish a strong online presence, improve customer engagement, and achieve sustainable growth. 
              I combine creativity, technology, and strategy to deliver solutions tailored to different industries and unique business needs.           
            </p>
            <p className="text-base font-semibold text-main">My technical skills include:</p>
            <div className="grid gap-6 sm:grid-cols-3">
              {skillCategories.map((category) => (
                <div key={category.title} className="rounded-[10px] border border-light bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-dark">{category.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="rounded-sm bg-light px-3 py-2 text-sm font-medium text-dark">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-base leading-8 text-main sm:text-lg">
              I am committed to building reliable, user-friendly, and performance-driven platforms that help businesses succeed in today’s digital landscape.

            </p>
            <a href="#contact" className="inline-flex rounded-sm bg-secondary px-8 py-3 text-sm font-semibold text-light transition hover:bg-primary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;