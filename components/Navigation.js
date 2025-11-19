export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 glass-panel border-b-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter">
          BASIL <span className="text-[#4ecdc4]">BOH</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-gray-300">
          <a href="#home" className="nav-link hover:text-white transition">
            Home
          </a>
          <a href="#about" className="nav-link hover:text-white transition">
            About
          </a>
          <a href="#projects" className="nav-link hover:text-white transition">
            Work
          </a>
          <a href="#contact" className="nav-link hover:text-white transition">
            Contact
          </a>
        </div>
        <button className="md:hidden text-white text-2xl">
          <i className="ph ph-list"></i>
        </button>
      </div>
    </nav>
  )
}

