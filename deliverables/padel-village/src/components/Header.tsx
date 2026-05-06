'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Props {
  onJoinClick: () => void
}

export default function Header({ onJoinClick }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  const handleJoinClick = () => {
    setMenuOpen(false)
    onJoinClick()
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-sm shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-10">
          <Image src="/pv-logo.png" alt="Padel Village" width={90} height={45} className="object-contain" />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {[['Home', '#'], ['About', '#about'], ['Experience', '#experience'], ['Corporate', '#corporate'], ['Contact', '#contact']].map(([item, href]) => (
              <a key={item} href={href}
                className="text-xs font-semibold uppercase tracking-widest text-offwhite/80 transition hover:text-gold">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMenuOpen((o: boolean) => !o)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block h-0.5 w-6 bg-offwhite transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-offwhite transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-offwhite transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-30 flex flex-col bg-navy pt-20 transition-all duration-300 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <nav className="flex flex-col items-center gap-8 pt-12">
          {[['Home', '#'], ['About', '#about'], ['Experience', '#experience'], ['Corporate', '#corporate'], ['Contact', '#contact']].map(([item, href]) => (
            <a
              key={item}
              href={href}
              onClick={handleNavClick}
              className="text-sm font-semibold uppercase tracking-widest text-offwhite/80 transition hover:text-gold"
            >
              {item}
            </a>
          ))}
          <button onClick={handleJoinClick} className="btn-primary mt-4 py-3 px-8 text-xs">
            Play For Free
          </button>
        </nav>
      </div>
    </>
  )
}
