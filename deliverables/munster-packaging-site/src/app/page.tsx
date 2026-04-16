import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES } from '@/data/products'

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/IMG_0660-FORK-LIFT-3-1024x606.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20">
              EcoVardis Sustainability Award 2022
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Packaging built<br />
              <span className="text-accent-400">exactly to your spec</span>
            </h1>
            <p className="mt-6 text-lg text-white/75">
              Design custom boxes, partitions, foam fitments and more — enter your dimensions,
              get an instant price, and order online. One unit or one hundred thousand.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/configure" className="btn-accent text-base px-7 py-3">
                Design Your Packaging
              </Link>
              <Link href="/products" className="btn-secondary text-base px-7 py-3 !bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Order custom packaging in 3 steps
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Choose & Configure',
                desc: 'Select your packaging type, enter your dimensions, choose materials and finish.',
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'See Your Instant Price',
                desc: 'Get a real-time price based on your spec. Volume discounts apply automatically.',
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Add to Cart & Order',
                desc: 'Add multiple items to your cart and submit your order. We confirm and dispatch.',
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H3m13.5 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75m3-2.25-.879.659c-1.171.879-3.07.879-4.242 0L8.25 16.5" />
                  </svg>
                ),
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="card p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    {icon}
                  </div>
                  <span className="text-3xl font-black text-gray-100">{step}</span>
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
            <Link href="/configure" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/configure?category=${cat.id}`}
                className="group card overflow-hidden transition hover:shadow-md"
              >
                <div className="relative h-36 bg-gray-100">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                  <p className="mt-0.5 text-xs text-brand-600">Configure →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Stats ─────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { stat: '25+',    label: 'Years in business' },
              { stat: '1–100k', label: 'Units per order' },
              { stat: '9',      label: 'Product categories' },
              { stat: '100%',   label: 'Irish owned' },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <dt className="text-3xl font-black text-brand-700">{stat}</dt>
                <dd className="mt-1 text-sm text-gray-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="bg-accent-500 py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to design your packaging?
          </h2>
          <p className="mt-3 text-white/80">
            Get an instant price in under a minute — no phone call required.
          </p>
          <Link href="/configure" className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-accent-600 shadow transition hover:bg-gray-50">
            Start Configuring
          </Link>
        </div>
      </section>
    </>
  )
}
