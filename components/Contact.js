export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-6 py-20">
      <div className="max-w-2xl text-center fade-in-section">
        <p className="text-[#4ecdc4] font-mono mb-4">03. What's Next?</p>
        <h2 className="text-5xl font-bold mb-6">Get In Touch</h2>
        <div className="glass-panel p-6 rounded-2xl mb-10">
          <p className="text-gray-400 text-lg leading-relaxed">
            Although I'm currently looking for new opportunities, my inbox is always open. Whether
            you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>
        <a
          href="mailto:hello@example.com"
          className="inline-block px-10 py-5 border-2 border-[#4ecdc4] text-[#4ecdc4] font-bold rounded text-lg hover:bg-[#4ecdc4]/10 transition"
        >
          Say Hello
        </a>

        <div className="mt-20 flex justify-center space-x-8 text-3xl text-gray-400">
          <a href="#" className="hover:text-[#4ecdc4] transition hover:-translate-y-1">
            <i className="ph ph-github-logo"></i>
          </a>
          <a href="#" className="hover:text-[#4ecdc4] transition hover:-translate-y-1">
            <i className="ph ph-linkedin-logo"></i>
          </a>
          <a href="#" className="hover:text-[#4ecdc4] transition hover:-translate-y-1">
            <i className="ph ph-twitter-logo"></i>
          </a>
          <a href="#" className="hover:text-[#4ecdc4] transition hover:-translate-y-1">
            <i className="ph ph-instagram-logo"></i>
          </a>
        </div>

        <footer className="mt-10 text-sm font-mono text-gray-600">
          Designed & Built with Three.js
        </footer>
      </div>
    </section>
  )
}


