'use client'

import { useRef, useState } from 'react'

interface Props {
  logo: string | null
  onLogoChange: (dataUrl: string | null) => void
}

export default function LogoUpload({ logo, onLogoChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => onLogoChange(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <label className="label">Logo / Artwork (optional)</label>

      {logo ? (
        <div className="mt-2 flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="Uploaded logo" className="h-16 w-16 rounded-lg object-contain bg-white border border-gray-200 p-1" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700">Logo uploaded</p>
            <p className="text-xs text-gray-400">Will be included with your order</p>
          </div>
          <button
            type="button"
            onClick={() => { onLogoChange(null); if (inputRef.current) inputRef.current.value = '' }}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition"
            aria-label="Remove logo"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`mt-2 w-full rounded-xl border-2 border-dashed px-4 py-6 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            dragOver
              ? 'border-brand-400 bg-brand-50'
              : 'border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-gray-100'
          }`}
        >
          <svg className="mx-auto h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <p className="mt-2 text-sm font-medium text-gray-600">Upload logo or artwork</p>
          <p className="mt-0.5 text-xs text-gray-400">PNG, JPG, SVG — drag & drop or click</p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
