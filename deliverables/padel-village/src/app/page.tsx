'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import LeadModal from '@/components/LeadModal'

const experiences = [
  {
    title: 'Padel Courts',
    description: '12 glass-backed championship courts with professional lighting and spectator seating.',
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
        <div className="absolute inset-0 bg-cover bg-center md:hidden" style={{ backgroundImage: 'url(/Hero%20for%20MOBILE%20VIEW.png)' }} />
        <div className="absolute inset-0 bg-cover bg-center hidden md:block" style={{ backgroundImage: 'url(/Hero%20for%20LAPTOP%20VIEW.png)' }} />
        <div className="absolute inset-0 bg-navy/40 sm:bg-navy/55" />
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl pt-20 pb-10 sm:pt-12 sm:pb-20">
          <div className="bg-navy/50 backdrop-blur-[2px] sm:bg-navy/60 sm:backdrop-blur-sm px-5 py-5 sm:px-12 sm:py-14 rounded-sm max-w-3xl w-full">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-offwhite leading-[1.05]">
              Play Padel.<br />Meet People.<br /><span className="text-gold">Feel Better.</span>
            </h1>
            <p className="section-label mt-3 sm:mt-4">Play • Social • Recover</p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-xl text-offwhite/90 max-w-2xl mx-auto leading-relaxed hidden sm:block">
              A 12-court indoor padel, social and recovery hub for UCC students, staff, Mardyke members and the wider community.
            </p>
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <button onClick={() => setModalOpen(true)} className="btn-primary w-full sm:w-auto">
                Play For Free
              </button>
              <a href="#experience" className="btn-outline w-full sm:w-auto text-center">
                Explore the Village
              </a>
            </div>
          </div>
          <p className="mt-4 sm:mt-8 text-xs text-offwhite/40 uppercase tracking-widest">Coming Q4 2027 — Cork, Ireland</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-gold/50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
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
              icon: '🎾',
              heading: '12 indoor courts designed for year-round play',
              body: 'For beginners, social players, students, staff, clubs, societies, Mardyke members and regular players.',
              bullets: [
                'Beginner sessions and coaching',
                'Student, staff and society leagues',
                'Social games and year-round indoor play',
              ],
            },
            {
              label: 'Social',
              icon: '☕',
              heading: 'A place to connect before and after play',
              body: 'A warm social hub with the Village Café, food, screens, mezzanine viewing, study / work areas and free Wi-Fi.',
              bullets: [
                'Village Café / food',
                'Mezzanine viewing and live sport',
                'Study, work and social spaces',
              ],
            },
            {
              label: 'Recover',
              icon: '❄️',
              heading: 'Active wellbeing, recovery and support services',
              body: 'Recovery and wellbeing spaces designed to support movement, stress reduction, injury prevention and better recovery.',
              bullets: [
                'Plunge pools, cold-water baths and sauna',
                'Physio, massage and acupuncture',
                'Mobility, treatment and wellbeing rooms',
              ],
            },
          ].map(({ label, icon, heading, body, bullets }) => (
            <div key={label} className="bg-navy p-8 sm:p-10 flex flex-col items-start">
              <div className="text-4xl mb-4">{icon}</div>
              <span className="section-label mb-3">{label}</span>
              <h3 className="text-base font-bold uppercase tracking-wide text-offwhite mb-3 leading-snug">{heading}</h3>
              <p className="text-offwhite/50 text-sm leading-relaxed mb-5">{body}</p>
              <ul className="space-y-2 mt-auto">
                {bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-xs text-offwhite/60">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {b}
                  </li>
                ))}
              </ul>
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
            <p className="mt-4 text-navy/60 max-w-xl mx-auto">Play, social connection and recovery in one connected destination.</p>
            <p className="mt-4 text-navy/60 max-w-3xl mx-auto text-left">Padel Village is designed as a year-round indoor participation hub where people can play, connect, recover, study, work and spend time. The concept brings together premium indoor courts, a warm social space, recovery and wellbeing services, free Wi-Fi, free parking and a mezzanine viewing gallery in one active campus destination.</p>
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
              {[['Home', '#'], ['Experience', '#experience'], ['Corporate', '#corporate'], ['Contact', '#contact']].map(([item, href]) => (
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
        <div className="mx-auto max-w-6xl pt-4 text-center">
          <p className="text-xs text-offwhite/20 italic">This concept is subject to feasibility, UCC review and approval.</p>
        </div>
      </footer>
    </>
  )
}
