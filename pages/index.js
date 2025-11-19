import { useEffect } from 'react'
import Head from 'next/head'
import Navigation from '@/components/Navigation'
import ThreeBackground from '@/components/ThreeBackground'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import ChessGames from '@/components/ChessGames'
import Fintech from '@/components/Fintech'
import Contact from '@/components/Contact'

export default function Home() {
  useEffect(() => {
    // Intersection Observer for Section Fade-ins
    const observerOptions = {
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('.fade-in-section')
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Basil Boh | Portfolio</title>
        <meta name="description" content="Interactive 3D Portfolio Website" />
      </Head>

      <div className="antialiased">
        <ThreeBackground />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <ChessGames />
          <Fintech />
          <Contact />
        </main>
      </div>
    </>
  )
}


