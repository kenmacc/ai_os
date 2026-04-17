import type { CategoryId, FieldValues } from '@/types'

// ─── Pallet Spec ──────────────────────────────────────────────────────────────
const PALLET = {
  length:      1200,  // mm
  width:        800,  // mm
  totalHeight: 2200,  // mm (including load)
  baseHeight:   144,  // mm (wooden pallet)
}

const USABLE_HEIGHT = PALLET.totalHeight - PALLET.baseHeight  // 2056mm

export interface PalletResult {
  unitsPerPallet: number
  palletsNeeded: number
  stackLayers: number
  unitsPerLayer: number
  basis: string  // human-readable explanation
}

// Best fit: try both orientations, pick whichever fits more per layer
function bestFitPerLayer(l: number, w: number): number {
  const normal  = Math.floor(PALLET.length / l) * Math.floor(PALLET.width / w)
  const rotated = Math.floor(PALLET.length / w) * Math.floor(PALLET.width / l)
  return Math.max(normal, rotated, 1)
}

// ─── Per-category calculators ─────────────────────────────────────────────────

function calcBoxes(fields: FieldValues, qty: number): PalletResult {
  const l = Number(fields.length)
  const w = Number(fields.width)
  const h = Number(fields.height)
  const perLayer = bestFitPerLayer(l, w)
  const layers   = Math.max(1, Math.floor(USABLE_HEIGHT / h))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${l}×${w}×${h}mm box`,
  }
}

function calcPartitions(fields: FieldValues, qty: number): PalletResult {
  const l = Number(fields.boxLength)
  const w = Number(fields.boxWidth)
  const h = 20  // partitions are flat — assume ~20mm stacked height per unit
  const perLayer = bestFitPerLayer(l, w)
  const layers   = Math.max(1, Math.floor(USABLE_HEIGHT / h))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${l}×${w}mm partition set`,
  }
}

function calcFoam(fields: FieldValues, qty: number): PalletResult {
  const l = Number(fields.length)
  const w = Number(fields.width)
  const h = Number(fields.depth)
  const perLayer = bestFitPerLayer(l, w)
  const layers   = Math.max(1, Math.floor(USABLE_HEIGHT / h))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${l}×${w}×${h}mm fitment`,
  }
}

function calcBubbleWrap(fields: FieldValues, qty: number): PalletResult {
  // Rolls: width in mm, length in m — roll diameter ~300mm assumed
  const rollDiameter = 300
  const rollWidth    = Number(fields.width)
  const perLayer = bestFitPerLayer(rollDiameter, rollWidth)
  const layers   = Math.max(1, Math.floor(USABLE_HEIGHT / rollDiameter))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${rollWidth}mm wide roll (~${rollDiameter}mm dia.)`,
  }
}

function calcPalletWrap(fields: FieldValues, qty: number): PalletResult {
  const rollWidth    = Number(fields.width)
  const rollDiameter = 200  // standard pallet wrap roll ~200mm dia.
  const perLayer = bestFitPerLayer(rollDiameter, rollWidth)
  const layers   = Math.max(1, Math.floor(USABLE_HEIGHT / rollDiameter))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${rollWidth}mm wide roll (~${rollDiameter}mm dia.)`,
  }
}

function calcSlipSheets(fields: FieldValues, qty: number): PalletResult {
  const l         = Number(fields.length)
  const w         = Number(fields.width)
  const sheetH    = 5   // ~5mm per sheet
  const perLayer  = bestFitPerLayer(l, w)
  const layers    = Math.max(1, Math.floor(USABLE_HEIGHT / sheetH))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${l}×${w}mm slip sheet`,
  }
}

function calcDunnageBags(fields: FieldValues, qty: number): PalletResult {
  // Folded flat — estimate based on size
  const sizeMap: Record<string, { l: number; w: number; h: number }> = {
    small:  { l: 600,  w: 400,  h: 30 },
    medium: { l: 900,  w: 600,  h: 40 },
    large:  { l: 1200, w: 800,  h: 50 },
    xlarge: { l: 1800, w: 1000, h: 60 },
  }
  const dims = sizeMap[String(fields.size)] ?? sizeMap.medium
  const perLayer  = bestFitPerLayer(dims.l, dims.w)
  const layers    = Math.max(1, Math.floor(USABLE_HEIGHT / dims.h))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${dims.l}×${dims.w}mm bag (folded)`,
  }
}

function calcPointOfSale(fields: FieldValues, qty: number): PalletResult {
  const l = Number(fields.length)
  const d = Number(fields.depth)
  const h = Number(fields.height)
  const perLayer  = bestFitPerLayer(l, d)
  const layers    = Math.max(1, Math.floor(USABLE_HEIGHT / h))
  const perPallet = Math.max(1, perLayer * layers)
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: `${l}×${d}×${h}mm display unit`,
  }
}

function calcAccessories(fields: FieldValues, qty: number): PalletResult {
  // Standard carton assumption: 400×300×300mm
  const perLayer  = bestFitPerLayer(400, 300)
  const layers    = Math.max(1, Math.floor(USABLE_HEIGHT / 300))
  const perPallet = perLayer * layers
  return {
    unitsPerLayer: perLayer,
    stackLayers:   layers,
    unitsPerPallet: perPallet,
    palletsNeeded: Math.ceil(qty / perPallet),
    basis: 'Standard carton (400×300×300mm)',
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function calculatePallets(
  categoryId: CategoryId,
  fields: FieldValues,
  quantity: number
): PalletResult | null {
  try {
    const calcs: Record<CategoryId, (f: FieldValues, q: number) => PalletResult> = {
      'boxes':             calcBoxes,
      'partitions':        calcPartitions,
      'fitments-and-foam': calcFoam,
      'bubble-wrap':       calcBubbleWrap,
      'pallet-wrap':       calcPalletWrap,
      'slip-sheets':       calcSlipSheets,
      'dunnage-bags':      calcDunnageBags,
      'point-of-sale':     calcPointOfSale,
      'accessories':       calcAccessories,
    }
    return calcs[categoryId]?.(fields, quantity) ?? null
  } catch {
    return null
  }
}
