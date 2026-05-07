const portfolioItems = [
  {
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution built with MERN stack',
  },
  {
    image:
      'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    title: 'AI-Powered Analytics',
    description: 'Machine learning platform for business intelligence',
  },
  {
    image:
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    title: 'Blockchain Voting System',
    description: 'Secure decentralized voting application',
  },
  {
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution built with MERN stack',
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-dark sm:text-4xl">My Portfolio</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {portfolioItems.map((item) => (
            <div key={item.title} className="relative overflow-hidden rounded-[10px] shadow-xl bg-light">
              <img src={item.image} alt={item.title} className="h-80 w-full object-cover transition duration-500 hover:scale-105" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/90 opacity-0 transition duration-500 hover:opacity-100 px-6 text-center text-light">
                <h3 className="text-2xl font-semibold text-light">{item.title}</h3>
                <p className="mt-4 max-w-xs text-sm text-light">{item.description}</p>
                <a href="#contact" className="mt-6 inline-flex rounded-sm bg-secondary px-6 py-3 text-sm font-semibold text-light transition hover:bg-primary">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;