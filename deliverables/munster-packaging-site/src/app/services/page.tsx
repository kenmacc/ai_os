import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Munster Packaging offer a wide range of services including high quality colour printing, free custom design service, and a full range of corrugated packaging products.',
}

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">Services</h1>
        <p className="mt-4 text-xl text-gray-500">
          Munster Packaging — supplier of quality boxes and packaging goods.
        </p>
      </div>

      {/* Intro */}
      <div className="mt-10 max-w-3xl text-gray-600 space-y-4">
        <p>
          Munster Packaging offer a wide range of services including high quality colour and litho lam printing.
          Free custom design service, so that you can be confident your boxes and products ordered meet your specific requirements.
        </p>
        <p>
          We supply quality packaging boxes, pallet boxes, euro pallet boxes, packing boxes, corrugated boxes,
          die-cut boxes, shelf ready boxes, fitments, dividers, edge guards and packaging accessories —
          including packing foam, machine and hand pallet wrap, bubble wrap, dunnage bags, bio-degradable loosefill,
          strapping, seals, corrugated paper and slip sheets.
        </p>
        <p>
          We can even source and supply you with any additional accessories that you require.
        </p>
      </div>

      {/* Service cards */}
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Free Design Team Service',
            icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
            ),
            desc: 'Our design team will work with you from design to production, ensuring the finished product is produced to the highest standard and matches your specification exactly.',
          },
          {
            title: 'Colour & Litho Lam Printing',
            icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
              </svg>
            ),
            desc: 'High quality colour and litho lam printing available on boxes and packaging. Brand your packaging to stand out on the shelf or in transit.',
          },
          {
            title: 'Custom Sizing & Specification',
            icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            ),
            desc: 'From a local trader requiring 20 boxes to a multinational requiring 200,000 — we cater for every business. Use our online configurator to spec and price your order instantly.',
          },
          {
            title: 'Sourcing & Supply',
            icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H3m13.5 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75m3-2.25-.879.659c-1.171.879-3.07.879-4.242 0L8.25 16.5" />
              </svg>
            ),
            desc: 'If we don\'t stock it, we\'ll source it. We can supply additional packaging accessories beyond our standard range to meet your specific requirements.',
          },
          {
            title: 'Sustainability & Recycling',
            icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            ),
            desc: 'Proud members of Repak Recycling for over 20 years. We recycle 100% of our waste material and hold a Bronze EcoVadis sustainability medal.',
          },
          {
            title: 'Corrugated Manufacturing',
            icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            ),
            desc: 'Privately owned independent corrugated manufacturer operating from a 30,000 sq ft state-of-the-art facility in Hospital, Co. Limerick.',
          },
        ].map(({ title, icon, desc }) => (
          <div key={title} className="card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              {icon}
            </div>
            <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-brand-700 px-8 py-10 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
        <p className="mt-2 text-brand-200">Use our configurator to design your packaging and get an instant price.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/configure" className="btn-accent">Design Your Packaging</Link>
          <Link href="/contact" className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
