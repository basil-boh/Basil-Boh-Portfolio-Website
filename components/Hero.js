export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl w-full fade-in-section is-visible">
        <p className="text-[#4ecdc4] font-mono mb-4">Hello World!</p>
        <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
          I build digital <br />
          <span className="text-gradient">experiences</span>
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Computer Science student passionate about building innovative solutions and exploring new technologies.
        </p>
        <div className="flex gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-[#4ecdc4] text-black font-bold rounded hover:bg-[#3dbbb3] transition transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-[#4ecdc4] text-[#4ecdc4] font-bold rounded hover:bg-[#4ecdc4] hover:text-black transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}

