'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/pricing'
import { getCategoryById } from '@/data/products'
import type { OrderContact } from '@/types'

const EMPTY: OrderContact = {
  name: '', company: '', email: '', phone: '', notes: ''
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const subtotal = items.reduce((sum, i) => sum + i.total, 0)
  const [contact, setContact] = useState<OrderContact>(EMPTY)
  const [errors, setErrors]   = useState<Partial<OrderContact>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
        <Link href="/configure" className="btn-accent mt-4">Design Your Packaging</Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        </div>
        <h1 className="mt-5 text-2xl font-bold text-gray-900">Order Submitted!</h1>
        <p className="mt-3 text-gray-500">
          Thanks, <strong>{contact.name}</strong>. Your order has been received.
          The Munster Packaging team will review your spec and be in touch at{' '}
          <strong>{contact.email}</strong> to confirm and arrange delivery.
        </p>
        <Link href="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    )
  }

  const validate = (): boolean => {
    const e: Partial<OrderContact> = {}
    if (!contact.name.trim())    e.name    = 'Name is required'
    if (!contact.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(contact.email)) e.email = 'Enter a valid email'
    if (!contact.phone.trim())   e.phone   = 'Phone number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, items, subtotal, currency: 'EUR' }),
      })
      if (!res.ok) throw new Error('Submission failed')
      clearCart()
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const field = (
    id: keyof OrderContact,
    label: string,
    type = 'text',
    required = false
  ) => (
    <div>
      <label htmlFor={id} className="label">
        {label}{required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={contact[id]}
        onChange={e => {
          setContact(prev => ({ ...prev, [id]: e.target.value }))
          setErrors(prev => { const err = { ...prev }; delete err[id]; return err })
        }}
        className={`input ${errors[id] ? 'border-red-400' : ''}`}
      />
      {errors[id] && <p className="mt-1 text-xs text-red-500">{errors[id]}</p>}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Contact form */}
        <div>
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900">Your Details</h2>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              {field('name',    'Full Name',    'text',  true)}
              {field('company', 'Company Name', 'text',  false)}
              {field('email',   'Email Address','email', true)}
              {field('phone',   'Phone Number', 'tel',   true)}

              <div>
                <label htmlFor="notes" className="label">Order Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  value={contact.notes}
                  onChange={e => setContact(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special requirements, delivery instructions, etc."
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base"
              >
                {loading ? 'Submitting…' : 'Submit Order'}
              </button>

              <p className="text-center text-xs text-gray-400">
                By submitting you agree to be contacted by Munster Packaging to confirm your order.
                No payment is taken at this stage.
              </p>
            </form>
          </div>
        </div>

        {/* Order review */}
        <div>
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900">Order Review</h2>
            <div className="mt-4 divide-y divide-gray-100">
              {items.map(item => {
                const category = getCategoryById(item.categoryId)
                return (
                  <div key={item.id} className="py-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{item.categoryName}</span>
                      <span className="font-semibold text-brand-700">{formatPrice(item.total)}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      {category?.fields.map(f => {
                        const val = item.fields[f.id]
                        if (!val && val !== 0) return null
                        const label = f.type === 'select'
                          ? f.options?.find(o => o.value === String(val))?.label ?? String(val)
                          : `${val}${f.unit ? ' ' + f.unit : ''}`
                        return (
                          <span key={f.id} className="text-xs text-gray-500">
                            {f.label}: {label}
                          </span>
                        )
                      })}
                      <span className="text-xs text-gray-500">Qty: {item.quantity.toLocaleString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-bold">
              <span>Subtotal</span>
              <span className="text-brand-700">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              VAT and shipping will be confirmed with your order.
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
            <strong>What happens next?</strong> Once you submit, our team reviews your spec and
            contacts you within 1 business day to confirm pricing, lead times and delivery.
          </div>
        </div>
      </div>
    </div>
  )
}
