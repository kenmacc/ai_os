import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Munster Packaging was set up in March 1997 and has evolved into one of Munster and Ireland\'s major suppliers of pallet boxes and corrugated packaging products.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 text-xl text-gray-500">
          Munster Packaging — for all your packaging needs.
        </p>
      </div>

      {/* Story + image */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5 text-gray-600">
          <p>
            Munster Packaging was set up in March 1997 and over the last twenty-five years has evolved
            into one of Munster and Ireland's major suppliers of pallet boxes and corrugated packaging products.
          </p>
          <p>
            We are a local employer, employing 25 skilled staff at our state-of-the-art 30,000 square foot
            facility in the town of Hospital, Co. Limerick.
          </p>
          <p>
            We offer a free product design service catering for every business — from a local trader requiring
            20 boxes to a multinational that requires 200,000 boxes. Our product range and services are constantly
            expanding to suit our customers' needs.
          </p>
        </div>
        <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
          <Image
            src="/images/full-building-outside-2-scaled-e1662390556119-699x1024.jpg"
            alt="Munster Packaging facility"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {[
          { stat: '1997',    label: 'Founded' },
          { stat: '25+',     label: 'Skilled staff' },
          { stat: '30,000',  label: 'Sq ft facility' },
          { stat: '25+',     label: 'Years in business' },
        ].map(({ stat, label }) => (
          <div key={label} className="card p-6 text-center">
            <p className="text-3xl font-black text-brand-700">{stat}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* What we supply */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">What We Supply</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            'Packaging Boxes', 'Euro Pallet Boxes', 'Partitions & Fitments',
            'Edge Guards', 'Bubble Wrap', 'Dunnage Bags',
            'Machine & Hand Pallet Wrap', 'Packing Foam', 'Slip Sheets',
            'Strapping & Seals', 'Corrugated Paper', 'Bio-degradable Loosefill',
          ].map(item => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability */}
      <div className="mt-16 rounded-2xl bg-green-50 p-8 lg:p-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Sustainability
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              Proud Members of Repak Recycling & EcoVadis
            </h2>
            <p className="mt-4 text-gray-600">
              For over twenty years Munster Packaging have been proud members of Repak Recycling.
              Our ethos is to continuously improve all environmental issues associated with our manufacturing processes.
            </p>
            <p className="mt-3 text-gray-600">
              In July 2022 we were awarded a Bronze Medal from EcoVadis in recognition of our continuous
              sustainability efforts. In 2024 EcoVadis upgraded Munster Packaging to a Bronze Top 35% Medal.
            </p>
            <p className="mt-3 font-medium text-green-700">
              We recycle 100% of our waste material.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/images/ecovaris-award.jpg"
              alt="EcoVadis Award"
              width={200}
              height={200}
              className="rounded-xl object-contain"
            />
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
              EcoVadis Bronze Top 35% — 2024
            </span>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">People Who Love Munster Packaging</h2>
        <blockquote className="mt-6 card p-8">
          <p className="text-lg text-gray-600 italic">
            "From the team at Prestige Foods I would like to thank Munster Packaging for their continued
            support and supply of quality packaging products."
          </p>
          <footer className="mt-4 text-sm font-medium text-gray-500">— Prestige Foods</footer>
        </blockquote>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link href="/contact" className="btn-primary text-base px-8 py-3">Get in Touch</Link>
      </div>
    </div>
  )
}
