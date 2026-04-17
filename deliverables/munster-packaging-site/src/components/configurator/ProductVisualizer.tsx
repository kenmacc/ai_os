'use client'

import type { CategoryId, FieldValues } from '@/types'

interface Props {
  categoryId: CategoryId
  categoryName: string
  fields: FieldValues
  onBack: () => void
}

// ─── Isometric math ───────────────────────────────────────────────────────────
const C30 = Math.sqrt(3) / 2

function iso(x: number, y: number, z: number) {
  return { x: (x - y) * C30, y: (x + y) * 0.5 - z }
}

function polyPts(pts: { x: number; y: number }[]) {
  return pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
}

function viewBox(pts: { x: number; y: number }[], pad = 22) {
  const xs = pts.map(p => p.x), ys = pts.map(p => p.y)
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad
  const w  = Math.max(...xs) - x0 + pad, h = Math.max(...ys) - y0 + pad
  return `${x0.toFixed(1)} ${y0.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`
}

// ─── Isometric box ────────────────────────────────────────────────────────────
function IsoBox({ l, w, h, label }: { l: number; w: number; h: number; label?: [string, string, string] }) {
  const s  = 88 / Math.max(l, w, h, 1)
  const sl = l * s, sw = w * s, sh = h * s

  const A = iso(0,  0,  0),  B = iso(sl, 0,  0)
  const C = iso(sl, sw, 0),  D = iso(0,  sw, 0)
  const E = iso(0,  0,  sh), F = iso(sl, 0,  sh)
  const G = iso(sl, sw, sh), H = iso(0,  sw, sh)

  const vb = viewBox([A, B, C, D, E, F, G, H])

  const lx = (A.x + B.x) / 2,        ly = Math.max(A.y, B.y) + 10
  const wx = C.x + 8,                 wy = (B.y + C.y) / 2
  const hx = A.x - 8,                 hy = (A.y + E.y) / 2

  const [ll, wl, hl] = label ?? [`${l}mm`, `${w}mm`, `${h}mm`]

  return (
    <svg viewBox={vb} className="w-full" style={{ maxHeight: 260 }}>
      {/* back-left face */}
      <polygon points={polyPts([D, A, E, H])} fill="#fff7ed" stroke="#f97316" strokeWidth="1.2" />
      {/* front face */}
      <polygon points={polyPts([A, B, F, E])} fill="#ffedd5" stroke="#f97316" strokeWidth="1.2" />
      {/* right face */}
      <polygon points={polyPts([B, C, G, F])} fill="#fed7aa" stroke="#f97316" strokeWidth="1.2" />
      {/* top face */}
      <polygon points={polyPts([E, F, G, H])} fill="#fff"    stroke="#f97316" strokeWidth="1.2" />

      <text x={lx} y={ly} textAnchor="middle" fontSize="7.5" fill="#9ca3af">{ll}</text>
      <text x={wx} y={wy} textAnchor="start"  fontSize="7.5" fill="#9ca3af">{wl}</text>
      <text x={hx} y={hy} textAnchor="end"    fontSize="7.5" fill="#9ca3af">{hl}</text>
    </svg>
  )
}

// ─── Isometric roll (cylinder approx) ────────────────────────────────────────
function IsoRoll({ widthMm, diamMm }: { widthMm: number; diamMm: number }) {
  const s   = 88 / Math.max(widthMm, diamMm, 1)
  const sw  = widthMm * s
  const rx  = (diamMm * s) / 2 * C30
  const ry  = (diamMm * s) / 4

  const x0 = -rx, topY = -sw
  const vb = `${(x0 - 20).toFixed(1)} ${(topY - ry - 20).toFixed(1)} ${(rx * 2 + 40).toFixed(1)} ${(sw + ry * 2 + 40).toFixed(1)}`

  return (
    <svg viewBox={vb} className="w-full" style={{ maxHeight: 260 }}>
      <rect   x={x0}  y={topY}  width={rx * 2} height={sw} fill="#ffedd5" stroke="#f97316" strokeWidth="1.2" />
      <ellipse cx={0} cy={0}    rx={rx}         ry={ry}     fill="#fed7aa" stroke="#f97316" strokeWidth="1.2" />
      <ellipse cx={0} cy={topY} rx={rx}         ry={ry}     fill="#fff7ed" stroke="#f97316" strokeWidth="1.2" />
      <text x={rx + 6} y={topY + sw / 2} textAnchor="start"  fontSize="7.5" fill="#9ca3af">{widthMm}mm wide</text>
      <text x={0}      y={ry + 11}       textAnchor="middle" fontSize="7.5" fill="#9ca3af">⌀ {diamMm}mm</text>
    </svg>
  )
}

// ─── Fallback icon ────────────────────────────────────────────────────────────
function PlaceholderIcon() {
  return (
    <svg className="mx-auto h-20 w-20 text-brand-200" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  )
}

// ─── Shape selector ───────────────────────────────────────────────────────────
function Shape({ categoryId, fields }: { categoryId: CategoryId; fields: FieldValues }) {
  const n = (k: string) => Number(fields[k]) || 0

  switch (categoryId) {
    case 'boxes':
      return <IsoBox l={n('length')} w={n('width')} h={n('height')} />

    case 'partitions':
      return <IsoBox l={n('boxLength')} w={n('boxWidth')} h={50}
               label={[`${n('boxLength')}mm`, `${n('boxWidth')}mm`, `${n('cellRows')}×${n('cellCols')} cells`]} />

    case 'fitments-and-foam':
      return <IsoBox l={n('length')} w={n('width')} h={n('depth')} />

    case 'bubble-wrap':
      return <IsoRoll widthMm={n('width')} diamMm={300} />

    case 'pallet-wrap':
      return <IsoRoll widthMm={n('width')} diamMm={200} />

    case 'slip-sheets':
      return <IsoBox l={n('length')} w={n('width')} h={8}
               label={[`${n('length')}mm`, `${n('width')}mm`, 'slip sheet']} />

    case 'point-of-sale':
      return <IsoBox l={n('length')} w={n('depth')} h={n('height')} />

    default:
      return <PlaceholderIcon />
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductVisualizer({ categoryId, categoryName, fields, onBack }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{categoryName}</p>
          <p className="text-sm text-gray-500 mt-0.5">Your product specification</p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Change product
        </button>
      </div>

      {/* 3D preview */}
      <div className="flex-1 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 px-6 py-8">
        <div className="w-full max-w-xs">
          <Shape categoryId={categoryId} fields={fields} />
        </div>
      </div>

      {/* Spec summary */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(fields)
          .filter(([, v]) => v !== '' && v !== null && v !== undefined)
          .map(([k, v]) => (
            <div key={k} className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
              <p className="text-xs text-gray-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
              <p className="text-sm font-medium text-gray-700">{String(v)}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
