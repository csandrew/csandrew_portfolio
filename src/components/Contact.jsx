import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const encodedData = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      }).toString();

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData,
      });

      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Try again.",
      });
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="bg-light py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-dark sm:text-4xl">Get In Touch</h2>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-dark">Let's Talk About Your Project</h3>
            <p className="text-base leading-8 text-main">
              I'm currently available for freelance work and open to new opportunities. Feel free to reach out if you have a project or just want to connect.
            </p>
            {/* Social links section removed */}
          </div>
          <div className="rounded-[10px] bg-white p-8 shadow-xl">
            <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="form-name" value="contact" />
              {status && (
                <p
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    status.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {status.message}
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full rounded-sm border border-light bg-white px-5 py-4 text-sm text-dark outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full rounded-sm border border-light bg-white px-5 py-4 text-sm text-dark outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full rounded-sm border border-light bg-white px-5 py-4 text-sm text-dark outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="h-30 w-full resize-none rounded-sm border border-light bg-white px-5 py-4 text-sm text-dark outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-sm bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Sending...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;