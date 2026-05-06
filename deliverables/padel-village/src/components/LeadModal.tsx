'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function LeadModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', userType: '', organisation: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-offwhite shadow-2xl">
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gold" />

        <div className="p-8">
          <button onClick={onClose} className="absolute right-5 top-5 text-stone hover:text-navy transition">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex justify-center mb-6">
            <div className="bg-navy px-6 py-3 rounded-sm">
              <Image src="/pv-logo.png" alt="Padel Village" width={160} height={80} className="object-contain" />
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold">
                <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-navy">You&apos;re on the list</h3>
              <p className="mt-2 text-sm text-navy/60">Your free hour of padel is reserved. We&apos;ll be in touch as we get closer to opening.</p>
              <button onClick={onClose} className="btn-primary mt-6 w-full">Close</button>
            </div>
          ) : (
            <>
              <p className="section-label text-center mb-2">Get in first</p>
              <h2 className="text-2xl font-bold uppercase tracking-wide text-navy text-center">Play For Free</h2>
              <p className="mt-1 text-center text-xs font-semibold uppercase tracking-widest text-gold">UCC Students & Staff: Play For Free</p>
              <p className="mt-2 text-center text-sm text-navy/60">
                Complete your details below and enjoy your first hour on us if Padel Village progresses.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="text" required placeholder="Full Name"
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="input"
                />
                <input
                  type="email" required placeholder="Email Address"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="input"
                />
                <input
                  type="tel" placeholder="Mobile Number"
                  value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
                  className="input"
                />
                <select
                  required
                  value={form.userType} onChange={e => setForm(p => ({ ...p, userType: e.target.value }))}
                  className="input text-navy/60"
                >
                  <option value="" disabled>User Type</option>
                  <option value="UCC Student">UCC Student</option>
                  <option value="UCC Staff">UCC Staff</option>
                  <option value="Mardyke Member">Mardyke Member</option>
                  <option value="Club or Society">Club or Society</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Community Partner">Community Partner</option>
                  <option value="Public User">Public User</option>
                </select>
                <input
                  type="text" placeholder="Course / Department / Organisation"
                  value={form.organisation} onChange={e => setForm(p => ({ ...p, organisation: e.target.value }))}
                  className="input"
                />
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-50">
                  {loading ? 'Registering…' : 'Play For Free'}
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-navy/40">No spam. No obligation. Just early access.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
