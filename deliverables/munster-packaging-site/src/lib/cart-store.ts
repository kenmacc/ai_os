'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const newItem: CartItem = {
          ...item,
          id: Math.random().toString(36).slice(2),
          addedAt: Date.now(),
        }
        set(state => ({ items: [...state.items, newItem] }))
      },

      removeItem: (id) => {
        set(state => ({ items: state.items.filter(i => i.id !== id) }))
      },

      updateQuantity: (id, quantity) => {
        set(state => ({
          items: state.items.map(i =>
            i.id === id
              ? { ...i, quantity, total: i.unitCost * quantity }
              : i
          )
        }))
      },

      clearCart: () => set({ items: [] }),

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.total, 0)
      },
    }),
    { name: 'munster-cart' }
  )
)
