import type { ConfigField, FieldValues } from '@/types'
import clsx from 'clsx'

interface Props {
  fields: ConfigField[]
  values: FieldValues
  onChange: (id: string, value: string | number) => void
  errors: Record<string, string>
}

export default function ConfigFields({ fields, values, onChange, errors }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {fields.map(field => (
        <div key={field.id} className={clsx(field.type === 'select' && 'sm:col-span-2')}>
          <label htmlFor={field.id} className="label">
            {field.label}
            {field.unit && <span className="ml-1 text-gray-400">({field.unit})</span>}
            {field.required && <span className="ml-1 text-red-400">*</span>}
          </label>

          {field.type === 'select' ? (
            <select
              id={field.id}
              value={String(values[field.id] ?? '')}
              onChange={e => onChange(field.id, e.target.value)}
              className={clsx('input', errors[field.id] && 'border-red-400 focus:border-red-400 focus:ring-red-400/20')}
            >
              <option value="">— Select —</option>
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              type="number"
              min={field.min}
              max={field.max}
              value={values[field.id] ?? ''}
              onChange={e => onChange(field.id, e.target.value === '' ? '' : Number(e.target.value))}
              placeholder={field.min ? `Min: ${field.min}` : undefined}
              className={clsx('input', errors[field.id] && 'border-red-400 focus:border-red-400 focus:ring-red-400/20')}
            />
          )}

          {errors[field.id] && (
            <p className="mt-1 text-xs text-red-500">{errors[field.id]}</p>
          )}
        </div>
      ))}
    </div>
  )
}
