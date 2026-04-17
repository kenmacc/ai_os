import type { ProductCategory } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CATEGORY DEFINITIONS
// Each category defines the fields shown in the configurator UI.
// Pricing rates are in pricing.ts — update those with real client values.
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'boxes',
    name: 'Boxes',
    description: 'Custom corrugated cardboard boxes in any size. Single wall, double wall, and heavy duty options available.',
    imageUrl: '/images/8f1dbf3eea3et-qdby4d8z87c5f2effcckkhep122ipi6n5tpbpszfm8.jpg',
    fields: [
      {
        id: 'length', label: 'Length', type: 'dimension', unit: 'mm',
        min: 50, max: 2000, required: true,
        presets: [50,75,100,125,150,175,200,250,300,350,400,450,500,600,700,800,900,1000,1200,1500,2000]
      },
      {
        id: 'width', label: 'Width', type: 'dimension', unit: 'mm',
        min: 50, max: 2000, required: true,
        presets: [50,75,100,125,150,175,200,250,300,350,400,450,500,600,700,800,900,1000,1200,1500,2000]
      },
      {
        id: 'height', label: 'Height', type: 'dimension', unit: 'mm',
        min: 50, max: 2000, required: true,
        presets: [50,75,100,125,150,175,200,250,300,350,400,450,500,600,700,800,900,1000,1200,1500,2000]
      },
      {
        id: 'material', label: 'Wall Type', type: 'select', required: true,
        options: [
          { value: 'single', label: 'Single Wall',  priceMultiplier: 1.0 },
          { value: 'double', label: 'Double Wall',  priceMultiplier: 1.6 },
          { value: 'heavy',  label: 'Heavy Duty',   priceMultiplier: 2.2 },
        ]
      },
      {
        id: 'print', label: 'Print / Branding', type: 'select', required: true,
        options: [
          { value: 'plain',   label: 'Plain (no print)',  priceMultiplier: 1.0 },
          { value: 'one',     label: '1-colour print',    priceMultiplier: 1.3 },
          { value: 'full',    label: 'Full colour print', priceMultiplier: 1.8 },
        ]
      },
    ]
  },

  {
    id: 'partitions',
    name: 'Partitions',
    description: 'Corrugated cardboard dividers for separating items inside boxes. Custom cell configurations available.',
    imageUrl: '/images/wp29bf8485_06-qdby54iaqedgrrau064r2sj298c5wq6uxkmemtv0ls.png',
    fields: [
      {
        id: 'boxLength', label: 'Box Length', type: 'dimension', unit: 'mm',
        min: 50, max: 2000, required: true,
        presets: [50,75,100,125,150,175,200,250,300,350,400,450,500,600,700,800,900,1000,1200,1500,2000]
      },
      {
        id: 'boxWidth', label: 'Box Width', type: 'dimension', unit: 'mm',
        min: 50, max: 2000, required: true,
        presets: [50,75,100,125,150,175,200,250,300,350,400,450,500,600,700,800,900,1000,1200,1500,2000]
      },
      {
        id: 'cellRows', label: 'Rows', type: 'number',
        min: 1, max: 20, required: true
      },
      {
        id: 'cellCols', label: 'Columns', type: 'number',
        min: 1, max: 20, required: true
      },
      {
        id: 'material', label: 'Board Grade', type: 'select', required: true,
        options: [
          { value: 'standard', label: 'Standard',   priceMultiplier: 1.0 },
          { value: 'premium',  label: 'Premium',    priceMultiplier: 1.5 },
        ]
      },
    ]
  },

  {
    id: 'fitments-and-foam',
    name: 'Fitments & Foam',
    description: 'Custom foam inserts and cardboard fitments cut to hold your products securely.',
    imageUrl: '/images/wp612ee406_05_06-qdby5c1092nrcmzws9drmqmr0bb3mb0pmluah1jv80.jpg',
    fields: [
      {
        id: 'length', label: 'Length', type: 'dimension', unit: 'mm',
        min: 10, max: 2000, required: true,
        presets: [10,20,50,75,100,150,200,250,300,350,400,500,600,700,800,1000,1200,1500,2000]
      },
      {
        id: 'width', label: 'Width', type: 'dimension', unit: 'mm',
        min: 10, max: 2000, required: true,
        presets: [10,20,50,75,100,150,200,250,300,350,400,500,600,700,800,1000,1200,1500,2000]
      },
      {
        id: 'depth', label: 'Depth / Thickness', type: 'dimension', unit: 'mm',
        min: 5, max: 500, required: true,
        presets: [5,10,15,20,25,30,40,50,75,100,150,200,250,300,400,500]
      },
      {
        id: 'type', label: 'Type', type: 'select', required: true,
        options: [
          { value: 'polyethylene', label: 'Polyethylene Foam (PE)', priceMultiplier: 1.0 },
          { value: 'polyurethane', label: 'Polyurethane Foam (PU)', priceMultiplier: 1.3 },
          { value: 'cardboard',    label: 'Cardboard Fitment',      priceMultiplier: 0.7 },
        ]
      },
    ]
  },

  {
    id: 'bubble-wrap',
    name: 'Bubble Wrap',
    description: 'Protective bubble wrap in standard and large bubble sizes. Available in cut sheets or rolls.',
    imageUrl: '/images/wpe9d88036_05_06.jpg',
    fields: [
      {
        id: 'width', label: 'Roll Width', type: 'dimension', unit: 'mm',
        min: 100, max: 2000, required: true,
        presets: [100,150,200,300,400,500,600,750,1000,1200,1500,2000]
      },
      {
        id: 'length', label: 'Roll Length', type: 'dimension', unit: 'm',
        min: 1, max: 500, required: true,
        presets: [10,25,50,75,100,150,200,300,500]
      },
      {
        id: 'bubble', label: 'Bubble Size', type: 'select', required: true,
        options: [
          { value: 'small', label: 'Small Bubble (10mm)', priceMultiplier: 1.0 },
          { value: 'large', label: 'Large Bubble (25mm)', priceMultiplier: 1.2 },
        ]
      },
    ]
  },

  {
    id: 'pallet-wrap',
    name: 'Pallet Wrap',
    description: 'Stretch film for pallet wrapping and load securing. Various micron thicknesses available.',
    imageUrl: '/images/pallet-wrap-1.jpg',
    fields: [
      {
        id: 'width', label: 'Roll Width', type: 'dimension', unit: 'mm',
        min: 100, max: 1000, required: true,
        presets: [100,150,200,300,400,500,600,750,1000]
      },
      {
        id: 'length', label: 'Roll Length', type: 'dimension', unit: 'm',
        min: 50, max: 1000, required: true,
        presets: [50,100,150,200,300,400,500,750,1000]
      },
      {
        id: 'micron', label: 'Thickness', type: 'select', required: true,
        options: [
          { value: '17', label: '17 Micron (standard)',  priceMultiplier: 1.0 },
          { value: '23', label: '23 Micron (heavy duty)', priceMultiplier: 1.4 },
          { value: '30', label: '30 Micron (extra heavy)', priceMultiplier: 1.8 },
        ]
      },
    ]
  },

  {
    id: 'slip-sheets',
    name: 'Slip Sheets',
    description: 'Flat sheets used as an alternative to pallets for product stacking and transportation.',
    imageUrl: '/images/slip-sheets-.jpg',
    fields: [
      {
        id: 'length', label: 'Length', type: 'dimension', unit: 'mm',
        min: 200, max: 3000, required: true,
        presets: [600,800,1000,1100,1200,1400,1600,1800,2000,2200,2400,2600,3000]
      },
      {
        id: 'width', label: 'Width', type: 'dimension', unit: 'mm',
        min: 200, max: 3000, required: true,
        presets: [600,800,1000,1100,1200,1400,1600,1800,2000,2200,2400,2600,3000]
      },
      {
        id: 'material', label: 'Material', type: 'select', required: true,
        options: [
          { value: 'corrugated', label: 'Corrugated Board',  priceMultiplier: 1.0 },
          { value: 'solid',      label: 'Solid Board',       priceMultiplier: 1.3 },
          { value: 'plastic',    label: 'Plastic (HDPE)',    priceMultiplier: 2.0 },
        ]
      },
    ]
  },

  {
    id: 'dunnage-bags',
    name: 'Dunnage Bags',
    description: 'Inflatable bags for securing cargo and void filling in containers and trailers.',
    imageUrl: '/images/Dunnage-bags.jpg',
    fields: [
      {
        id: 'size', label: 'Bag Size', type: 'select', required: true,
        options: [
          { value: 'small',  label: 'Small  — up to 600mm wide',  priceMultiplier: 0.8 },
          { value: 'medium', label: 'Medium — up to 900mm wide',  priceMultiplier: 1.0 },
          { value: 'large',  label: 'Large  — up to 1200mm wide', priceMultiplier: 1.4 },
          { value: 'xlarge', label: 'XL     — up to 1800mm wide', priceMultiplier: 1.9 },
        ]
      },
      {
        id: 'ply', label: 'Ply (strength)', type: 'select', required: true,
        options: [
          { value: '1', label: '1-ply (light loads)',  priceMultiplier: 1.0 },
          { value: '2', label: '2-ply (medium loads)', priceMultiplier: 1.3 },
          { value: '3', label: '3-ply (heavy loads)',  priceMultiplier: 1.6 },
        ]
      },
    ]
  },

  {
    id: 'point-of-sale',
    name: 'Point of Sale',
    description: 'Custom cardboard display stands, shelf units, and POS packaging solutions.',
    imageUrl: '/images/2908a64b29da-qdby47ly374fhemmc9wt5itxgqubfbk951seu57snk.jpg',
    fields: [
      {
        id: 'length', label: 'Width', type: 'dimension', unit: 'mm',
        min: 100, max: 2000, required: true,
        presets: [100,150,200,250,300,400,500,600,700,800,900,1000,1200,1500,2000]
      },
      {
        id: 'depth', label: 'Depth', type: 'dimension', unit: 'mm',
        min: 100, max: 1000, required: true,
        presets: [100,150,200,250,300,400,500,600,700,800,1000]
      },
      {
        id: 'height', label: 'Height', type: 'dimension', unit: 'mm',
        min: 100, max: 3000, required: true,
        presets: [200,300,400,500,600,700,800,900,1000,1200,1500,1800,2000,2500,3000]
      },
      {
        id: 'type', label: 'Display Type', type: 'select', required: true,
        options: [
          { value: 'floor',   label: 'Floor Standing Display',  priceMultiplier: 1.0 },
          { value: 'counter', label: 'Counter Top Display',     priceMultiplier: 0.7 },
          { value: 'shelf',   label: 'Shelf Strip / Tray',      priceMultiplier: 0.5 },
        ]
      },
      {
        id: 'print', label: 'Print', type: 'select', required: true,
        options: [
          { value: 'plain', label: 'Plain',             priceMultiplier: 1.0 },
          { value: 'one',   label: '1-colour',          priceMultiplier: 1.4 },
          { value: 'full',  label: 'Full colour',       priceMultiplier: 2.0 },
        ]
      },
    ]
  },

  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Tapes, strapping, corrugated paper, and other packaging accessories.',
    imageUrl: '/images/Tapes-400x400-2.jpg',
    fields: [
      {
        id: 'type', label: 'Product Type', type: 'select', required: true,
        options: [
          { value: 'tape-brown',    label: 'Brown Packing Tape',    priceMultiplier: 1.0 },
          { value: 'tape-clear',    label: 'Clear Packing Tape',    priceMultiplier: 1.0 },
          { value: 'tape-fragile',  label: '"Fragile" Printed Tape', priceMultiplier: 1.2 },
          { value: 'strapping',     label: 'Polypropylene Strapping', priceMultiplier: 1.5 },
          { value: 'corrugated',    label: 'Corrugated Paper Roll',  priceMultiplier: 1.3 },
          { value: 'void-fill',     label: 'Void Fill Paper',        priceMultiplier: 1.1 },
        ]
      },
      {
        id: 'rollsPerBox', label: 'Rolls / Units per Box', type: 'number',
        min: 1, max: 144, required: true
      },
    ]
  },
]

export function getCategoryById(id: string) {
  return CATEGORIES.find(c => c.id === id) ?? null
}
