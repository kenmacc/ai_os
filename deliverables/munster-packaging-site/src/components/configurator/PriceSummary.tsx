import { formatPrice } from '@/lib/pricing'
import { calculatePallets } from '@/lib/pallets'
import type { PriceBreakdown, CategoryId, FieldValues } from '@/types'

interface Props {
  price: PriceBreakdown | null
  quantity: number
  categoryId: CategoryId | null
  fields: FieldValues
  onQuantityChange: (q: number) => void
  onAddToCart: () => void
  isComplete: boolean
}

export default function PriceSummary({
  price, quantity, categoryId, fields,
  onQuantityChange, onAddToCart, isComplete
}: Props) {
  const pallets = isComplete && categoryId
    ? calculatePallets(categoryId, fields, quantity)
    : null

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

      {/* Pallet estimate */}
      {!pallets && isComplete === false && (
        <div className="mt-4 rounded-xl border border-dashed border-gray-200 p-4 opacity-50">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Pallet Estimate</span>
          </div>
          <p className="mt-2 text-xs text-gray-400 italic">Complete your spec above to see how many pallets your order requires.</p>
        </div>
      )}
      {pallets && (
        <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Pallet Estimate</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center rounded-lg bg-white border border-gray-200 px-3 py-2">
              <p className="text-2xl font-black text-brand-700">{pallets.palletsNeeded}</p>
              <p className="text-xs text-gray-500">Pallets needed</p>
            </div>
            <div className="text-center rounded-lg bg-white border border-gray-200 px-3 py-2">
              <p className="text-2xl font-black text-gray-800">{pallets.unitsPerPallet.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Units per pallet</p>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-xs text-gray-400">
            <span>{pallets.unitsPerLayer} per layer × {pallets.stackLayers} layers</span>
            <span>1200×800mm base</span>
          </div>
        </div>
      )}

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
