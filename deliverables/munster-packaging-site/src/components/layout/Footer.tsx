import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-xl font-bold text-brand-700 tracking-tight">
              Munster<span className="text-accent-500"> Packaging</span>
            </span>
            <p className="mt-3 text-sm text-gray-500">
              The one stop for all your packaging needs. We can supply one box or one hundred thousand.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Products</h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: 'Boxes',           id: 'boxes' },
                { label: 'Partitions',      id: 'partitions' },
                { label: 'Fitments & Foam', id: 'fitments-and-foam' },
                { label: 'Bubble Wrap',     id: 'bubble-wrap' },
                { label: 'Pallet Wrap',     id: 'pallet-wrap' },
                { label: 'Slip Sheets',     id: 'slip-sheets' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <Link href={`/configure?category=${id}`} className="text-sm text-gray-500 hover:text-gray-900">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: 'About Us',  href: '/about' },
                { label: 'Services',  href: '/services' },
                { label: 'Blog',      href: '/blog' },
                { label: 'Contact',   href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-gray-900">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>Munster Packaging Ltd.</li>
              <li>Cork, Ireland</li>
              <li>
                <a href="tel:+35321000000" className="hover:text-gray-900">+353 21 000 0000</a>
              </li>
              <li>
                <a href="mailto:info@munsterpkg.ie" className="hover:text-gray-900">info@munsterpkg.ie</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Munster Packaging Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              EcoVardis Award 2022
            </span>
            <span className="text-xs text-gray-400">Sustainability Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
