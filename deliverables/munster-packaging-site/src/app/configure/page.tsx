'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CategorySelector from '@/components/configurator/CategorySelector'
import ConfigFields from '@/components/configurator/ConfigFields'
import PriceSummary from '@/components/configurator/PriceSummary'
import LogoUpload from '@/components/configurator/LogoUpload'
import { getCategoryById } from '@/data/products'
import { calculatePrice } from '@/lib/pricing'
import { useCartStore } from '@/lib/cart-store'
import type { CategoryId, FieldValues, PriceBreakdown } from '@/types'

function ConfigureContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const addItem = useCartStore(s => s.addItem)

  const [categoryId, setCategoryId]   = useState<CategoryId | null>(
    (searchParams.get('category') as CategoryId) ?? 'boxes'
  )
  const [fieldValues, setFieldValues] = useState<FieldValues>({})
  const [quantity, setQuantity]       = useState(100)
  const [errors, setErrors]           = useState<Record<string, string>>({})
  const [price, setPrice]             = useState<PriceBreakdown | null>(null)
  const [added, setAdded]             = useState(false)
  const [logo, setLogo]               = useState<string | null>(null)

  const category = categoryId ? getCategoryById(categoryId) : null

  // Recalculate price whenever inputs change
  useEffect(() => {
    if (!category) { setPrice(null); return }

    const allFilled = category.fields.every(f => {
      if (!f.required) return true
      const val = fieldValues[f.id]
      return val !== undefined && val !== '' && val !== null
    })

    if (!allFilled) { setPrice(null); return }

    try {
      const result = calculatePrice(categoryId!, fieldValues, quantity)
      setPrice(result)
    } catch {
      setPrice(null)
    }
  }, [categoryId, fieldValues, quantity, category])

  const handleCategoryChange = (id: CategoryId) => {
    setCategoryId(id)
    setFieldValues({})
    setErrors({})
    setPrice(null)
  }

  const handleFieldChange = (id: string, value: string | number) => {
    setFieldValues(prev => ({ ...prev, [id]: value }))
    setErrors(prev => { const e = { ...prev }; delete e[id]; return e })
  }

  const validate = useCallback(() => {
    if (!category) return false
    const newErrors: Record<string, string> = {}
    category.fields.forEach(field => {
      const val = fieldValues[field.id]
      if (field.required && (val === undefined || val === '')) {
        newErrors[field.id] = 'This field is required'
      }
      if (field.type !== 'select' && val !== undefined && val !== '') {
        const num = Number(val)
        if (field.min !== undefined && num < field.min)
          newErrors[field.id] = `Minimum is ${field.min}`
        if (field.max !== undefined && num > field.max)
          newErrors[field.id] = `Maximum is ${field.max}`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [category, fieldValues])

  const isComplete = !!(
    category &&
    category.fields.every(f => !f.required || (fieldValues[f.id] !== undefined && fieldValues[f.id] !== ''))
  )

  const handleAddToCart = () => {
    if (!validate() || !price || !category) return
    addItem({
      categoryId: categoryId!,
      categoryName: category.name,
      fields: fieldValues,
      quantity,
      unitCost: price.unitCost,
      total: price.total,
      ...(logo ? { logoDataUrl: logo } : {}),
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Design Your Packaging</h1>
        <p className="mt-2 text-gray-500">
          Configure your spec below and get an instant price. Add multiple items to your cart before checking out.
        </p>
      </div>

      {/* Added to cart toast */}
      {added && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Added to cart!
          <button onClick={() => router.push('/cart')} className="ml-2 underline">View cart</button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
        {/* Left: category selector */}
        <div className="flex flex-col">
          <div className="card flex flex-col flex-1 p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">1</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Product Type</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CategorySelector selected={categoryId} onSelect={handleCategoryChange} />
            </div>
            <div className="mt-6 border-t border-gray-100 pt-5">
              <LogoUpload
                logo={logo}
                onLogoChange={setLogo}
                printRequired={!!(fieldValues.print && fieldValues.print !== 'plain')}
              />
            </div>
          </div>
        </div>

        {/* Right: spec fields + price summary */}
        <div className="flex flex-col gap-6">
          {category && (
            <div className="card p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">2</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Specify Your {category.name}
                </span>
              </div>
              <ConfigFields
                fields={category.fields}
                values={fieldValues}
                onChange={handleFieldChange}
                errors={errors}
              />
            </div>
          )}
          <div className="flex-1" />
          <PriceSummary
            price={price}
            quantity={quantity}
            categoryId={categoryId}
            fields={fieldValues}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            isComplete={isComplete}
          />
        </div>
      </div>
    </div>
  )
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">Loading configurator…</div>}>
      <ConfigureContent />
    </Suspense>
  )
}
