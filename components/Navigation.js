import Link from 'next/link'

export default function Navigation() {
  const links = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#projects', label: 'Projects' },
    { href: '/articles', label: 'Articles' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 glass-panel border-b-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/#home" className="text-2xl font-bold tracking-tighter">
          BASIL <span className="text-[#4ecdc4]">BOH</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-gray-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button className="md:hidden text-white text-2xl">
          <i className="ph ph-list"></i>
        </button>
      </div>
    </nav>
  )
}
