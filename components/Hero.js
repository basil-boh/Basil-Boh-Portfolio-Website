export default function Hero() {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
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
      
      {/* Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 group"
        aria-label="Scroll down"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2 transition-colors duration-300">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-wheel transition-colors duration-300"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <i className="ph ph-caret-down text-2xl text-white font-bold transition-colors duration-300 animate-bounce"></i>
            <i className="ph ph-caret-down text-2xl text-white/60 font-bold transition-colors duration-300 animate-bounce" style={{ animationDelay: '0.1s' }}></i>
          </div>
        </div>
        <span className="text-sm font-mono text-white font-bold opacity-100 transition-all duration-300">Scroll</span>
      </button>
    </section>
  )
}

