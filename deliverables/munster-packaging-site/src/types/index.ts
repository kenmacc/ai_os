// ─── Product Categories ────────────────────────────────────────────────────────

export type CategoryId =
  | 'boxes'
  | 'partitions'
  | 'fitments-and-foam'
  | 'bubble-wrap'
  | 'pallet-wrap'
  | 'slip-sheets'
  | 'dunnage-bags'
  | 'point-of-sale'
  | 'accessories'

// ─── Field Definitions (drives the configurator UI) ───────────────────────────

export type FieldType = 'dimension' | 'select' | 'number'

export interface SelectOption {
  value: string
  label: string
  priceMultiplier: number // 1.0 = base, 1.5 = 50% more expensive
}

export interface ConfigField {
  id: string
  label: string
  type: FieldType
  unit?: string           // e.g. 'mm', 'm', 'µm'
  min?: number
  max?: number
  options?: SelectOption[] // for 'select' type
  required: boolean
}

// ─── Category Definition ──────────────────────────────────────────────────────

export interface ProductCategory {
  id: CategoryId
  name: string
  description: string
  imageUrl: string
  fields: ConfigField[]
  // pricing is handled by the pricing engine using these fields
}

// ─── Configurator State ───────────────────────────────────────────────────────

export type FieldValues = Record<string, string | number>

export interface ConfiguratorState {
  categoryId: CategoryId | null
  fields: FieldValues
  quantity: number
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PriceBreakdown {
  baseUnitCost: number     // cost per single unit before quantity
  unitCost: number         // cost per unit after volume discount
  quantity: number
  total: number
  currency: string
  notes?: string           // e.g. "Minimum order applies"
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string               // uuid
  categoryId: CategoryId
  categoryName: string
  fields: FieldValues
  quantity: number
  unitCost: number
  total: number
  addedAt: number          // timestamp
  logoDataUrl?: string
}

// ─── Order ────────────────────────────────────────────────────────────────────

export interface OrderContact {
  name: string
  company: string
  email: string
  phone: string
  notes: string
}

export interface Order {
  contact: OrderContact
  items: CartItem[]
  subtotal: number
  currency: string
  submittedAt: string
}
