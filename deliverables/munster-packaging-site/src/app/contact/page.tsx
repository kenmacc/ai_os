'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simple mailto fallback — replace with API route if needed
    setSubmitted(true)
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Contact</h1>
        <p className="mt-4 text-gray-500">
          Ask about our custom designed packaging service that will suit your specific needs.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">

        {/* Contact form */}
        <div className="card p-8">
          <h2 className="font-semibold text-gray-900 text-lg">Send Us a Message</h2>

          {submitted ? (
            <div className="mt-6 rounded-xl bg-green-50 p-6 text-center">
              <svg className="mx-auto h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <p className="mt-3 font-medium text-green-800">Message sent!</p>
              <p className="mt-1 text-sm text-green-600">We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Name <span className="text-red-400">*</span></label>
                  <input required className="input" value={form.name} onChange={update('name')} />
                </div>
                <div>
                  <label className="label">Company</label>
                  <input className="input" value={form.company} onChange={update('company')} />
                </div>
              </div>
              <div>
                <label className="label">Email <span className="text-red-400">*</span></label>
                <input required type="email" className="input" value={form.email} onChange={update('email')} />
              </div>
              <div>
                <label className="label">Phone</label>
                <input type="tel" className="input" value={form.phone} onChange={update('phone')} />
              </div>
              <div>
                <label className="label">Message <span className="text-red-400">*</span></label>
                <textarea required rows={4} className="input resize-none" value={form.message} onChange={update('message')} />
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          )}
        </div>

        {/* Contact details */}
        <div className="space-y-8">
          <div>
            <h2 className="font-semibold text-gray-900 text-lg">Get In Touch</h2>
            <dl className="mt-5 space-y-4">
              {[
                {
                  label: 'Our Location',
                  value: 'Munster Packaging Ltd, Enterprise Centre, Hospital, Co. Limerick, V35 EP80',
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  ),
                },
                {
                  label: 'Phone',
                  value: '+353 61 383377',
                  href: 'tel:+35361383377',
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  ),
                },
                {
                  label: 'Fax',
                  value: '+353 61 383366',
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                    </svg>
                  ),
                },
                {
                  label: 'Email',
                  value: 'sales@munsterpkg.ie',
                  href: 'mailto:sales@munsterpkg.ie',
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  ),
                },
              ].map(({ label, value, href, icon }) => (
                <div key={label} className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    {icon}
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</dt>
                    <dd className="mt-0.5 text-sm text-gray-700">
                      {href ? <a href={href} className="hover:text-brand-600">{value}</a> : value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Map embed */}
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <iframe
              title="Munster Packaging location"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=Munster+Packaging+Ltd,Enterprise+Centre,Hospital,Co.+Limerick,V35+EP80,Ireland&output=embed"
            />
            <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
              Enterprise Centre, Hospital, Co. Limerick, V35 EP80
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
