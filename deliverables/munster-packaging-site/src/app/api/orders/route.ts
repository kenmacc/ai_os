import { NextRequest, NextResponse } from 'next/server'
import type { Order } from '@/types'
import { formatPrice } from '@/lib/pricing'
import { getCategoryById } from '@/data/products'

// ─── Config ───────────────────────────────────────────────────────────────────
// Set these in your .env.local:
//   ORDER_EMAIL_TO=orders@munsterpkg.ie
//   ORDER_EMAIL_FROM=noreply@munsterpkg.ie
//   SMTP_HOST=smtp.example.com
//   SMTP_PORT=587
//   SMTP_USER=your_smtp_user
//   SMTP_PASS=your_smtp_password
// ─────────────────────────────────────────────────────────────────────────────

function buildEmailHtml(order: Order): string {
  const rows = order.items.map(item => {
    const category = getCategoryById(item.categoryId)
    const specLines = category?.fields
      .map(f => {
        const val = item.fields[f.id]
        if (!val && val !== 0) return null
        const label = f.type === 'select'
          ? f.options?.find(o => o.value === String(val))?.label ?? String(val)
          : `${val}${f.unit ? ' ' + f.unit : ''}`
        return `<li><strong>${f.label}:</strong> ${label}</li>`
      })
      .filter(Boolean)
      .join('') ?? ''

    return `
      <tr>
        <td style="padding:12px 8px;border-bottom:1px solid #e5e7eb;vertical-align:top">
          <strong>${item.categoryName}</strong>
          <ul style="margin:4px 0 0;padding-left:16px;font-size:13px;color:#6b7280">${specLines}</ul>
        </td>
        <td style="padding:12px 8px;border-bottom:1px solid #e5e7eb;text-align:right;white-space:nowrap">
          ${item.quantity.toLocaleString()} units
        </td>
        <td style="padding:12px 8px;border-bottom:1px solid #e5e7eb;text-align:right;white-space:nowrap;font-weight:600;color:#0369a1">
          ${formatPrice(item.total)}
        </td>
      </tr>`
  }).join('')

  return `
    <div style="font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;color:#111827">
      <div style="background:#0369a1;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;color:white;font-size:22px">New Order — Munster Packaging</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:14px">
          Submitted ${new Date(order.submittedAt).toLocaleString('en-IE')}
        </p>
      </div>
      <div style="background:white;padding:24px 32px;border:1px solid #e5e7eb;border-top:none">

        <h2 style="font-size:16px;margin:0 0 12px">Customer Details</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:24px">
          <tr><td style="padding:4px 0;color:#6b7280;width:120px">Name</td><td>${order.contact.name}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280">Company</td><td>${order.contact.company || '—'}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280">Email</td><td><a href="mailto:${order.contact.email}">${order.contact.email}</a></td></tr>
          <tr><td style="padding:4px 0;color:#6b7280">Phone</td><td>${order.contact.phone}</td></tr>
          ${order.contact.notes ? `<tr><td style="padding:4px 0;color:#6b7280;vertical-align:top">Notes</td><td>${order.contact.notes}</td></tr>` : ''}
        </table>

        <h2 style="font-size:16px;margin:0 0 12px">Order Items</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead>
            <tr style="background:#f9fafb">
              <th style="padding:8px;text-align:left;font-weight:600;color:#374151">Product</th>
              <th style="padding:8px;text-align:right;font-weight:600;color:#374151">Quantity</th>
              <th style="padding:8px;text-align:right;font-weight:600;color:#374151">Price</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:12px 8px;text-align:right;font-weight:700;font-size:16px">Subtotal</td>
              <td style="padding:12px 8px;text-align:right;font-weight:700;font-size:16px;color:#0369a1">
                ${formatPrice(order.subtotal)}
              </td>
            </tr>
          </tfoot>
        </table>

        <p style="margin:24px 0 0;font-size:13px;color:#9ca3af">
          Prices are indicative. Please review and confirm with the customer before invoicing.
        </p>
      </div>
    </div>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const order: Order = {
      contact:     body.contact,
      items:       body.items,
      subtotal:    body.subtotal,
      currency:    body.currency ?? 'EUR',
      submittedAt: new Date().toISOString(),
    }

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!order.contact?.email || !order.contact?.name || !order.items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Send email via nodemailer ─────────────────────────────────────────────
    const nodemailer = await import('nodemailer')

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   ?? 'localhost',
      port:   Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const toEmail   = process.env.ORDER_EMAIL_TO   ?? 'orders@munsterpkg.ie'
    const fromEmail = process.env.ORDER_EMAIL_FROM ?? 'noreply@munsterpkg.ie'

    // Notification to Munster Packaging team
    await transporter.sendMail({
      from:    `"Munster Packaging Orders" <${fromEmail}>`,
      to:      toEmail,
      subject: `New Order from ${order.contact.name} — ${formatPrice(order.subtotal)}`,
      html:    buildEmailHtml(order),
    })

    // Confirmation to customer
    await transporter.sendMail({
      from:    `"Munster Packaging" <${fromEmail}>`,
      to:      order.contact.email,
      subject: 'Your Munster Packaging order has been received',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <div style="background:#0369a1;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="margin:0;color:white;font-size:20px">Order Received</h1>
          </div>
          <div style="background:white;padding:24px 32px;border:1px solid #e5e7eb;border-top:none">
            <p>Hi ${order.contact.name},</p>
            <p>Thank you for your order. We've received your packaging spec and our team will be in touch within 1 business day to confirm pricing, lead times, and delivery.</p>
            <p><strong>Order total (indicative):</strong> ${formatPrice(order.subtotal)}</p>
            <p>If you have any questions in the meantime, reply to this email or call us directly.</p>
            <p style="margin-top:24px">— The Munster Packaging Team</p>
          </div>
        </div>`,
    })

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('[/api/orders] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
