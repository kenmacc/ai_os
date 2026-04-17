'use client'

import { useRef, useState } from 'react'

interface Props {
  logo: string | null
  onLogoChange: (dataUrl: string | null) => void
  printRequired?: boolean
}

export default function LogoUpload({ logo, onLogoChange, printRequired = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const showWarning = printRequired && !logo

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
      <div className="flex items-center gap-2">
        <label className="label mb-0">Logo / Artwork</label>
        {printRequired ? (
          <span className="text-xs font-medium text-red-500">required for print</span>
        ) : (
          <span className="text-xs text-gray-400">(optional)</span>
        )}
      </div>

      {showWarning && (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="text-xs text-amber-700">
            You&apos;ve selected a print option — please upload your logo or artwork file so we can prepare your order.
          </p>
        </div>
      )}

      {logo ? (
        <div className={`mt-2 flex items-center gap-4 rounded-xl p-3 border ${showWarning ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}>
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
              : showWarning
              ? 'border-amber-300 bg-amber-50 hover:border-amber-400'
              : 'border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-gray-100'
          }`}
        >
          <svg
            className={`mx-auto h-8 w-8 ${showWarning ? 'text-amber-400' : 'text-gray-300'}`}
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <p className={`mt-2 text-sm font-medium ${showWarning ? 'text-amber-700' : 'text-gray-600'}`}>
            {showWarning ? 'Upload your print artwork' : 'Upload logo or artwork'}
          </p>
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
