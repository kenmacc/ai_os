'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/pricing'
import { getCategoryById } from '@/data/products'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Configure your packaging and add items to get started.</p>
        <Link href="/configure" className="btn-accent mt-6">
          Design Your Packaging
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      <p className="mt-1 text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map(item => {
            const category = getCategoryById(item.categoryId)
            return (
              <div key={item.id} className="card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{item.categoryName}</h3>

                    {/* Spec details */}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {category?.fields.map(field => {
                        const val = item.fields[field.id]
                        if (!val && val !== 0) return null
                        const label = field.type === 'select'
                          ? field.options?.find(o => o.value === String(val))?.label ?? String(val)
                          : `${val}${field.unit ? ' ' + field.unit : ''}`
                        return (
                          <span key={field.id} className="text-xs text-gray-500">
                            <span className="font-medium text-gray-700">{field.label}:</span> {label}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    aria-label="Remove item"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>

                {/* Quantity + price */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="input w-24 py-1.5 text-sm"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{formatPrice(item.unitCost)} / unit</p>
                    <p className="text-base font-bold text-brand-700">{formatPrice(item.total)}</p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add more */}
          <Link href="/configure" className="btn-secondary w-full">
            + Add another item
          </Link>
        </div>

        {/* Order summary */}
        <div>
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate max-w-[60%]">{item.categoryName} ×{item.quantity}</span>
                  <span>{formatPrice(item.total)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-bold">
              <span>Subtotal</span>
              <span className="text-brand-700">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              VAT and shipping calculated at checkout. Final invoice issued on order confirmation.
            </p>
            <Link href="/checkout" className="btn-primary mt-6 w-full">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
