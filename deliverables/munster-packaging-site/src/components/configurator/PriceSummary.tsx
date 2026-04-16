import { formatPrice } from '@/lib/pricing'
import type { PriceBreakdown } from '@/types'

interface Props {
  price: PriceBreakdown | null
  quantity: number
  onQuantityChange: (q: number) => void
  onAddToCart: () => void
  isComplete: boolean
}

export default function PriceSummary({ price, quantity, onQuantityChange, onAddToCart, isComplete }: Props) {
  return (
    <div className="card sticky top-24 p-6">
      <h3 className="font-semibold text-gray-900">Price Summary</h3>

      {/* Quantity */}
      <div className="mt-4">
        <label htmlFor="qty" className="label">Quantity</label>
        <input
          id="qty"
          type="number"
          min={1}
          max={1000000}
          value={quantity}
          onChange={e => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
          className="input"
        />
        <p className="mt-1 text-xs text-gray-400">Volume discounts apply from 50 units</p>
      </div>

      {/* Price breakdown */}
      <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
        {price ? (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Unit price</span>
              <span className="font-medium text-gray-900">{formatPrice(price.unitCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Quantity</span>
              <span className="font-medium text-gray-900">× {price.quantity.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-brand-700">{formatPrice(price.total)}</span>
            </div>
            {price.notes && (
              <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                {price.notes}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">
            Fill in all fields above to see your price.
          </p>
        )}
      </div>

      {/* Add to cart */}
      <button
        onClick={onAddToCart}
        disabled={!isComplete || !price}
        className="btn-accent mt-6 w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        Add to Cart
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Prices are indicative. Final invoice issued on confirmation.
      </p>
    </div>
  )
}
