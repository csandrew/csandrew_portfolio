const services = [
  {
    iconClass: 'fas fa-laptop-code',
    title: 'Web Design & Development',
    description:
      'I design and build responsive, modern websites that balance aesthetics with performance. From layout to functionality, I create seamless digital experiences.',
  },
  {
    iconClass: 'fas fa-robot',
    title: 'UI/UX Design',
    description:
      'I create user-centered designs through wireframing, prototyping, and thoughtful interface decisions that improve usability and engagement.',
  },
  {
    iconClass: 'fas fa-cube',
    title: 'E-Commerce Solutions',
    description:
      'I build online stores and shopping experiences that are simple, secure, and designed to convert visitors into customers.',
  },
  {
    iconClass: 'fas fa-chart-line',
    title: 'SEO Optimization',
    description:
      'I optimize websites to improve search visibility, performance, and accessibility—helping users reach the right audience effectively.',
  },
];

function Services() {
  return (
    <section id="services" className="bg-light py-24">
      <div className="mx-auto text-center max-w-7xl px-6 sm:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-dark sm:text-4xl hover:border-b-4 hover:border-primary hover:pb-2 transition-all duration-300 inline-block w-auto mx-auto">
          What I Do
        </h2>
        <p className="text-lg text-main leading-relaxed px-3 py-4 mb-12">

          My services include website design and development, SEO, CRM development, and business-focused digital solutions.  
          
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="group rounded-[10px] bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex mx-auto h-14 w-14 items-center justify-center rounded-3xl bg-accent text-dark transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:rounded-2xl">
                <i className={service.iconClass + ' text-2xl'}></i>
              </div>
              <h3 className="text-xl text-center font-semibold text-dark group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="mt-4 text-main leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;