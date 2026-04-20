'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/pricing'

type OrderRow = {
  id: string
  contact_name: string
  contact_email: string
  contact_phone: string
  contact_company: string
  contact_notes: string
  items: { categoryName: string; quantity: number; total: number; fields: Record<string, string>; logoDataUrl?: string }[]
  subtotal: number
  currency: string
  status: 'new' | 'quoted' | 'confirmed' | 'completed' | 'cancelled'
  submitted_at: string
}

const STATUS_COLOURS: Record<string, string> = {
  new:       'bg-blue-100 text-blue-700',
  quoted:    'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-600',
}

const STATUSES = ['all', 'new', 'quoted', 'confirmed', 'completed', 'cancelled']

export default function AdminPage() {
  const router = useRouter()
  const [orders, setOrders]     = useState<OrderRow[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState<OrderRow | null>(null)

  useEffect(() => { fetchOrders() }, [])

  async function fetchOrders() {
    setLoading(true)
    const res = await fetch('/api/admin/orders')
    const data = await res.json()
    setOrders(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as OrderRow['status'] } : o))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as OrderRow['status'] } : null)
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'all' || o.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || o.contact_name.toLowerCase().includes(q) ||
      o.contact_email.toLowerCase().includes(q) ||
      (o.contact_company ?? '').toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const stats = {
    total:     orders.length,
    new:       orders.filter(o => o.status === 'new').length,
    revenue:   orders.filter(o => o.status === 'confirmed' || o.status === 'completed')
                     .reduce((s, o) => s + o.subtotal, 0),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-0.5">Munster Packaging</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700">
          Sign out
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Orders',   value: stats.total },
            { label: 'New / Unread',   value: stats.new },
            { label: 'Confirmed Revenue', value: formatPrice(stats.revenue) },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search name, email, company…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input max-w-xs"
          />
          <div className="flex gap-1.5">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  filter === s
                    ? 'bg-brand-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button onClick={fetchOrders} className="ml-auto text-xs text-gray-400 hover:text-gray-600">
            ↻ Refresh
          </button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-sm text-gray-400">Loading orders…</p>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">No orders found.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Date', 'Customer', 'Items', 'Total', 'Status', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(order)}>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(order.submitted_at).toLocaleDateString('en-IE')}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{order.contact_name}</p>
                      <p className="text-xs text-gray-400">{order.contact_email}</p>
                      {order.contact_company && <p className="text-xs text-gray-400">{order.contact_company}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {order.items?.map(i => i.categoryName).join(', ')}
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-700 whitespace-nowrap">
                      {formatPrice(order.subtotal)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_COLOURS[order.status] ?? ''}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={order.status}
                        onClick={e => e.stopPropagation()}
                        onChange={e => { e.stopPropagation(); updateStatus(order.id, e.target.value) }}
                        className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        {STATUSES.filter(s => s !== 'all').map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Order detail slide-over */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSelected(null)} />
          <div className="w-full max-w-lg bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">Order Detail</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_COLOURS[selected.status]}`}>
                  {selected.status}
                </span>
                <select
                  value={selected.status}
                  onChange={e => updateStatus(selected.id, e.target.value)}
                  className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600"
                >
                  {STATUSES.filter(s => s !== 'all').map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <span className="ml-auto text-xs text-gray-400">
                  {new Date(selected.submitted_at).toLocaleString('en-IE')}
                </span>
              </div>

              {/* Customer */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Customer</h3>
                <div className="space-y-1.5 text-sm">
                  <p><span className="text-gray-400 w-20 inline-block">Name</span> {selected.contact_name}</p>
                  {selected.contact_company && <p><span className="text-gray-400 w-20 inline-block">Company</span> {selected.contact_company}</p>}
                  <p><span className="text-gray-400 w-20 inline-block">Email</span>
                    <a href={`mailto:${selected.contact_email}`} className="text-brand-600 hover:underline">{selected.contact_email}</a>
                  </p>
                  {selected.contact_phone && <p><span className="text-gray-400 w-20 inline-block">Phone</span>
                    <a href={`tel:${selected.contact_phone}`} className="hover:text-brand-600">{selected.contact_phone}</a>
                  </p>}
                  {selected.contact_notes && (
                    <p className="mt-2 rounded-lg bg-gray-50 p-3 text-gray-600 italic">{selected.contact_notes}</p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selected.items?.map((item, i) => (
                    <div key={i} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">{item.categoryName}</span>
                        <span className="font-semibold text-brand-700">{formatPrice(item.total)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{item.quantity.toLocaleString()} units</p>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
                        {Object.entries(item.fields ?? {}).map(([k, v]) => (
                          <span key={k} className="text-xs text-gray-500">
                            {k}: {String(v)}
                          </span>
                        ))}
                      </div>
                      {item.logoDataUrl && (
                        <div className="mt-3 border-t border-gray-100 pt-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Artwork / Logo</p>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.logoDataUrl}
                            alt="Customer artwork"
                            className="max-h-32 rounded-lg border border-gray-200 bg-gray-50 object-contain p-2"
                          />
                          <a
                            href={item.logoDataUrl}
                            download="artwork.png"
                            className="mt-2 inline-flex items-center gap-1.5 text-xs text-brand-600 hover:underline"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Download artwork
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 font-bold">
                  <span>Subtotal</span>
                  <span className="text-brand-700">{formatPrice(selected.subtotal)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={`mailto:${selected.contact_email}?subject=Re: Your Munster Packaging Order`}
                  className="btn-primary flex-1 text-center"
                >
                  Reply by Email
                </a>
                {selected.contact_phone && (
                  <a href={`tel:${selected.contact_phone}`} className="btn-accent flex-1 text-center">
                    Call Customer
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
