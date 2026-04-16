import type { CategoryId, FieldValues, PriceBreakdown } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// PRICING RATES — UPDATE THESE WITH REAL CLIENT VALUES
//
// All rates are in EUR (€). The client should review and replace each
// BASE_RATE value below with their actual cost-per-unit figures.
// priceMultipliers in products.ts are applied on top of these base rates.
// ─────────────────────────────────────────────────────────────────────────────

const RATES = {
  // Boxes: base rate per m² of surface area
  boxes: { perSqM: 4.50 },                         // ← CLIENT TO CONFIRM

  // Partitions: base rate per cell (row × column intersection)
  partitions: { perCell: 0.35 },                   // ← CLIENT TO CONFIRM

  // Fitments & Foam: base rate per litre of volume (cm³ / 1000)
  foamAndFitments: { perLitre: 1.80 },             // ← CLIENT TO CONFIRM

  // Bubble Wrap: base rate per m² of wrap area
  bubbleWrap: { perSqM: 1.20 },                    // ← CLIENT TO CONFIRM

  // Pallet Wrap: base rate per roll (width × length = area)
  palletWrap: { perSqM: 0.25 },                    // ← CLIENT TO CONFIRM

  // Slip Sheets: base rate per m² of sheet area
  slipSheets: { perSqM: 2.80 },                    // ← CLIENT TO CONFIRM

  // Dunnage Bags: base rate per medium bag
  dunnageBags: { perUnit: 3.50 },                  // ← CLIENT TO CONFIRM

  // Point of Sale: base rate per m² of surface area
  pointOfSale: { perSqM: 12.00 },                  // ← CLIENT TO CONFIRM

  // Accessories: base rate per roll/unit
  accessories: { perUnit: 8.00 },                  // ← CLIENT TO CONFIRM
}

// Minimum order value per category (EUR)
const MINIMUMS: Record<CategoryId, number> = {
  'boxes':            50,
  'partitions':       40,
  'fitments-and-foam': 60,
  'bubble-wrap':      20,
  'pallet-wrap':      25,
  'slip-sheets':      30,
  'dunnage-bags':     35,
  'point-of-sale':    100,
  'accessories':      15,
}

// Volume discount tiers (applied to unit cost)
function volumeDiscount(qty: number): number {
  if (qty >= 5000) return 0.70
  if (qty >= 2000) return 0.75
  if (qty >= 1000) return 0.80
  if (qty >= 500)  return 0.85
  if (qty >= 100)  return 0.90
  if (qty >= 50)   return 0.95
  return 1.0
}

// Helper: get multiplier from a select field value
function getMultiplier(fields: FieldValues, fieldId: string, options: { value: string, priceMultiplier: number }[]): number {
  const val = fields[fieldId]
  return options.find(o => o.value === val)?.priceMultiplier ?? 1.0
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICING FUNCTIONS PER CATEGORY
// ─────────────────────────────────────────────────────────────────────────────

function priceBoxes(fields: FieldValues): number {
  const l = Number(fields.length) / 1000  // mm → m
  const w = Number(fields.width)  / 1000
  const h = Number(fields.height) / 1000
  const surfaceAreaM2 = 2 * (l * w + l * h + w * h)
  const materialMult = getMultiplier(fields, 'material', [
    { value: 'single', priceMultiplier: 1.0 },
    { value: 'double', priceMultiplier: 1.6 },
    { value: 'heavy',  priceMultiplier: 2.2 },
  ])
  const printMult = getMultiplier(fields, 'print', [
    { value: 'plain', priceMultiplier: 1.0 },
    { value: 'one',   priceMultiplier: 1.3 },
    { value: 'full',  priceMultiplier: 1.8 },
  ])
  return surfaceAreaM2 * RATES.boxes.perSqM * materialMult * printMult
}

function pricePartitions(fields: FieldValues): number {
  const rows = Number(fields.cellRows)
  const cols = Number(fields.cellCols)
  const cells = rows * cols
  const matMult = getMultiplier(fields, 'material', [
    { value: 'standard', priceMultiplier: 1.0 },
    { value: 'premium',  priceMultiplier: 1.5 },
  ])
  return cells * RATES.partitions.perCell * matMult
}

function priceFoam(fields: FieldValues): number {
  const l = Number(fields.length) / 10  // mm → cm
  const w = Number(fields.width)  / 10
  const d = Number(fields.depth)  / 10
  const volumeLitres = (l * w * d) / 1000
  const typeMult = getMultiplier(fields, 'type', [
    { value: 'polyethylene', priceMultiplier: 1.0 },
    { value: 'polyurethane', priceMultiplier: 1.3 },
    { value: 'cardboard',    priceMultiplier: 0.7 },
  ])
  return volumeLitres * RATES.foamAndFitments.perLitre * typeMult
}

function priceBubbleWrap(fields: FieldValues): number {
  const widthM  = Number(fields.width)  / 1000  // mm → m
  const lengthM = Number(fields.length)          // already in m
  const areaSqM = widthM * lengthM
  const bubbleMult = getMultiplier(fields, 'bubble', [
    { value: 'small', priceMultiplier: 1.0 },
    { value: 'large', priceMultiplier: 1.2 },
  ])
  return areaSqM * RATES.bubbleWrap.perSqM * bubbleMult
}

function pricePalletWrap(fields: FieldValues): number {
  const widthM  = Number(fields.width)  / 1000  // mm → m
  const lengthM = Number(fields.length)          // already in m
  const areaSqM = widthM * lengthM
  const micronMult = getMultiplier(fields, 'micron', [
    { value: '17', priceMultiplier: 1.0 },
    { value: '23', priceMultiplier: 1.4 },
    { value: '30', priceMultiplier: 1.8 },
  ])
  return areaSqM * RATES.palletWrap.perSqM * micronMult
}

function priceSlipSheets(fields: FieldValues): number {
  const lM = Number(fields.length) / 1000
  const wM = Number(fields.width)  / 1000
  const areaSqM = lM * wM
  const matMult = getMultiplier(fields, 'material', [
    { value: 'corrugated', priceMultiplier: 1.0 },
    { value: 'solid',      priceMultiplier: 1.3 },
    { value: 'plastic',    priceMultiplier: 2.0 },
  ])
  return areaSqM * RATES.slipSheets.perSqM * matMult
}

function priceDunnageBags(fields: FieldValues): number {
  const sizeMult = getMultiplier(fields, 'size', [
    { value: 'small',  priceMultiplier: 0.8 },
    { value: 'medium', priceMultiplier: 1.0 },
    { value: 'large',  priceMultiplier: 1.4 },
    { value: 'xlarge', priceMultiplier: 1.9 },
  ])
  const plyMult = getMultiplier(fields, 'ply', [
    { value: '1', priceMultiplier: 1.0 },
    { value: '2', priceMultiplier: 1.3 },
    { value: '3', priceMultiplier: 1.6 },
  ])
  return RATES.dunnageBags.perUnit * sizeMult * plyMult
}

function pricePointOfSale(fields: FieldValues): number {
  const lM = Number(fields.length) / 1000
  const dM = Number(fields.depth)  / 1000
  const hM = Number(fields.height) / 1000
  // Approximate surface area of a 3-sided display
  const surfaceAreaM2 = 2 * (lM * hM) + (dM * hM) + (lM * dM)
  const typeMult = getMultiplier(fields, 'type', [
    { value: 'floor',   priceMultiplier: 1.0 },
    { value: 'counter', priceMultiplier: 0.7 },
    { value: 'shelf',   priceMultiplier: 0.5 },
  ])
  const printMult = getMultiplier(fields, 'print', [
    { value: 'plain', priceMultiplier: 1.0 },
    { value: 'one',   priceMultiplier: 1.4 },
    { value: 'full',  priceMultiplier: 2.0 },
  ])
  return surfaceAreaM2 * RATES.pointOfSale.perSqM * typeMult * printMult
}

function priceAccessories(fields: FieldValues): number {
  const typeMult = getMultiplier(fields, 'type', [
    { value: 'tape-brown',   priceMultiplier: 1.0 },
    { value: 'tape-clear',   priceMultiplier: 1.0 },
    { value: 'tape-fragile', priceMultiplier: 1.2 },
    { value: 'strapping',    priceMultiplier: 1.5 },
    { value: 'corrugated',   priceMultiplier: 1.3 },
    { value: 'void-fill',    priceMultiplier: 1.1 },
  ])
  const unitsPerBox = Number(fields.rollsPerBox) || 1
  return RATES.accessories.perUnit * typeMult * unitsPerBox
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: calculatePrice
// ─────────────────────────────────────────────────────────────────────────────

export function calculatePrice(
  categoryId: CategoryId,
  fields: FieldValues,
  quantity: number
): PriceBreakdown {
  const pricers: Record<CategoryId, (f: FieldValues) => number> = {
    'boxes':             priceBoxes,
    'partitions':        pricePartitions,
    'fitments-and-foam': priceFoam,
    'bubble-wrap':       priceBubbleWrap,
    'pallet-wrap':       pricePalletWrap,
    'slip-sheets':       priceSlipSheets,
    'dunnage-bags':      priceDunnageBags,
    'point-of-sale':     pricePointOfSale,
    'accessories':       priceAccessories,
  }

  const baseUnitCost = pricers[categoryId]?.(fields) ?? 0
  const discount     = volumeDiscount(quantity)
  const unitCost     = baseUnitCost * discount
  const rawTotal     = unitCost * quantity
  const minimum      = MINIMUMS[categoryId]
  const total        = Math.max(rawTotal, minimum)

  const notes = rawTotal < minimum
    ? `Minimum order value of €${minimum.toFixed(2)} applies`
    : discount < 1.0
    ? `${Math.round((1 - discount) * 100)}% volume discount applied`
    : undefined

  return {
    baseUnitCost: Math.round(baseUnitCost * 100) / 100,
    unitCost:     Math.round(unitCost * 100) / 100,
    quantity,
    total:        Math.round(total * 100) / 100,
    currency:     'EUR',
    notes,
  }
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount)
}
