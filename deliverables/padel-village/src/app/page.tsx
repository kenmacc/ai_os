'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import LeadModal from '@/components/LeadModal'

const experiences = [
  {
    title: 'Padel Courts',
    description: '6 glass-backed championship courts with professional lighting and spectator seating.',
    icon: '🎾',
  },
  {
    title: 'Recovery Zone',
    description: 'Ice baths, infrared saunas, contrast therapy, and guided recovery sessions.',
    icon: '❄️',
  },
  {
    title: 'Village Bar & Kitchen',
    description: 'Post-match fuel — performance nutrition, craft drinks, and social dining.',
    icon: '🍽️',
  },
  {
    title: 'Work Lounge',
    description: 'High-speed wifi, private booths, and meeting rooms for members who work between sessions.',
    icon: '💼',
  },
  {
    title: 'Corporate Events',
    description: 'Private court hire, team tournaments, and bespoke corporate packages.',
    icon: '🏆',
  },
  {
    title: 'Community Events',
    description: 'Leagues, social nights, coaching clinics, and member-exclusive competitions.',
    icon: '🎉',
  },
]

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setModalOpen(true), 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header onJoinClick={() => setModalOpen(true)} />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* HERO */}
      <section className="relative min-h-screen bg-navy flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#243250_0%,_#1B273D_60%,_#111928_100%)]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #B59A63 39px, #B59A63 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #B59A63 39px, #B59A63 40px)' }}
        />
        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl pt-12 pb-20">
          <Image
            src="/pv-logo.png"
            alt="Padel Village"
            width={600} height={300}
            className="object-contain mb-6 w-[18rem] sm:w-[26rem] lg:w-[36rem] h-auto"
          />
          <p className="section-label mb-4">Play • Social • Recover</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-offwhite leading-[1.05]">
            Where Champions<br /><span className="text-gold">Come Together</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-offwhite/60 max-w-lg">
            Cork&apos;s premier indoor padel, social and wellness destination — opening Q4 2027.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button onClick={() => setModalOpen(true)} className="btn-primary w-full sm:w-auto">
              Play For Free
            </button>
            <a href="#experience" className="btn-outline w-full sm:w-auto text-center">
              Explore the Village
            </a>
          </div>
          <p className="mt-8 text-xs text-offwhite/30 uppercase tracking-widest">Coming Q4 2027 — Cork, Ireland</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-gold/50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 sm:py-28 px-6 bg-offwhite">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="section-label mb-3">About Padel Village</p>
            <h2 className="section-heading mb-6">More Than<br />Just Padel</h2>
            <p className="text-navy/70 leading-relaxed mb-4">
              Padel Village is a premium indoor destination built around padel, social connection and recovery.
            </p>
            <p className="text-navy/70 leading-relaxed mb-4">
              A flagship concept bringing together high-quality courts, strong atmosphere and premium spaces to play, meet, work, recover and spend time.
            </p>
            <p className="text-navy/70 leading-relaxed">
              This is not a standard courts-only facility. It is a modern lifestyle-led venue built around Play &bull; Social &bull; Recover.
            </p>
          </div>
          <div className="hidden lg:flex relative aspect-square items-center justify-center overflow-hidden" style={{ background: '#111928' }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#243250_0%,_#111928_100%)]" />
            <div className="relative z-10 text-center px-8">
              <p className="text-7xl font-bold text-gold mb-2">Q4</p>
              <p className="text-8xl font-bold text-offwhite">2027</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-offwhite/40">Opening — Cork, Ireland</p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 sm:py-28 px-6 bg-navy">
        <div className="mx-auto max-w-6xl text-center mb-12 sm:mb-16">
          <p className="section-label mb-3">The Three Pillars</p>
          <h2 className="section-heading-light">Play. Social. Recover.</h2>
        </div>
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-px bg-gold/20">
          {[
            {
              label: 'Play',
              heading: 'World-Class Padel',
              body: '6 glass-backed championship courts with pro lighting, coaching programmes, and competitive leagues for all levels.',
            },
            {
              label: 'Social',
              heading: 'The Village Bar',
              body: 'Post-match drinks, live sport, performance nutrition, and a social scene built around the game you love.',
            },
            {
              label: 'Recover',
              heading: 'Premium Wellness',
              body: 'Ice baths, infrared saunas, contrast therapy, and guided recovery sessions — so you can play more, recover faster.',
            },
          ].map(({ label, heading, body }) => (
            <div key={label} className="bg-navy p-8 sm:p-10 flex flex-col items-start">
              <span className="section-label mb-4">{label}</span>
              <h3 className="text-lg font-bold uppercase tracking-wide text-offwhite mb-3">{heading}</h3>
              <p className="text-offwhite/50 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE GRID */}
      <section id="experience" className="py-20 sm:py-28 px-6 bg-offwhite">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <p className="section-label mb-3">The Full Experience</p>
            <h2 className="section-heading">Everything Under One Roof</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map(({ title, description, icon }) => (
              <div key={title} className="bg-white border border-stone p-7 hover:border-gold transition-colors">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-navy mb-2">{title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE */}
      <section id="corporate" className="py-20 sm:py-28 px-6 bg-navy">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="section-label mb-3">Corporate & Events</p>
            <h2 className="section-heading-light mb-6">Build Your Team<br />On Court</h2>
            <p className="text-offwhite/60 leading-relaxed mb-4">
              Padel Village offers private court hire, bespoke corporate tournaments, and team-building experiences designed for companies who want something different.
            </p>
            <p className="text-offwhite/60 leading-relaxed mb-8">
              From exclusive venue hire to full-day packages with catering and recovery sessions, we&apos;ll build the perfect experience for your team.
            </p>
            <button onClick={() => setModalOpen(true)} className="btn-primary w-full sm:w-auto">
              Play For Free
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Private Court Hire', 'Exclusive access for your team'],
              ['Team Tournaments', 'Organised competition with prizes'],
              ['Catering Packages', 'Village Bar menus & drinks'],
              ['Recovery Sessions', 'Guided post-event wellness'],
            ].map(([t, d]) => (
              <div key={t} className="border border-gold/20 p-5 sm:p-6" style={{ background: '#243250' }}>
                <div className="w-2 h-2 bg-gold mb-4" />
                <h4 className="text-sm font-bold uppercase tracking-wide text-offwhite mb-1">{t}</h4>
                <p className="text-xs text-offwhite/40">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Q4 2027 CTA */}
      <section className="py-20 sm:py-28 px-6 bg-gold">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-navy/50 mb-3">Opening Q4 2027</p>
          <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-navy mb-8">
            Get In First.<br />Play For Free.
          </h2>
          <button onClick={() => setModalOpen(true)} className="btn-navy">
            Play For Free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-14 px-6" style={{ background: '#111928' }}>
        <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-offwhite/10">
          <div className="lg:col-span-2">
            <Image src="/pv-logo.png" alt="Padel Village" width={160} height={80} className="object-contain mb-4 w-32 h-auto" />
            <p className="text-sm text-offwhite/40 max-w-xs leading-relaxed">
              Cork&apos;s premier indoor padel, social and wellness destination. Opening Q4 2027.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[['Home', '#'], ['About', '#about'], ['Experience', '#experience'], ['Corporate', '#corporate'], ['Contact', '#contact']].map(([item, href]) => (
                <li key={item}>
                  <a href={href} className="text-sm text-offwhite/40 hover:text-gold transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Get in Touch</h4>
            <p className="text-sm text-offwhite/40 leading-relaxed">
              Cork, Ireland<br />
              <a href="mailto:hello@padelvillage.ie" className="hover:text-gold transition">hello@padelvillage.ie</a>
            </p>
            <button onClick={() => setModalOpen(true)} className="btn-outline mt-6 py-3 text-xs">
              Play For Free
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-6xl pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-offwhite/20">© 2027 Padel Village. All rights reserved.</p>
          <p className="text-xs text-offwhite/20">Play • Social • Recover</p>
        </div>
      </footer>
    </>
  )
}
