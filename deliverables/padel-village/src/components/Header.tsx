'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Props {
  onJoinClick: () => void
}

export default function Header({ onJoinClick }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-navy/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Image src="/pv-logo.png" alt="Padel Village" width={120} height={60} className="object-contain" />
        <nav className="hidden items-center gap-8 md:flex">
          {['About', 'Experience', 'Corporate', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-widest text-offwhite/80 transition hover:text-gold">
              {item}
            </a>
          ))}
        </nav>
        <button onClick={onJoinClick} className="btn-primary py-2.5 text-xs">
          Join Waitlist
        </button>
      </div>
    </header>
  )
}
