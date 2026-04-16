import Image from 'next/image'
import { CATEGORIES } from '@/data/products'
import type { CategoryId } from '@/types'
import clsx from 'clsx'

interface Props {
  selected: CategoryId | null
  onSelect: (id: CategoryId) => void
}

export default function CategorySelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Select a product category</h2>
      <p className="mt-1 text-sm text-gray-500">Choose what you need to package.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id as CategoryId)}
            className={clsx(
              'group flex flex-col overflow-hidden rounded-xl border-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
              selected === cat.id
                ? 'border-brand-500 ring-2 ring-brand-500/20'
                : 'border-gray-200 hover:border-brand-300'
            )}
          >
            <div className="relative h-24 w-full bg-gray-100">
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                className="object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{cat.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
