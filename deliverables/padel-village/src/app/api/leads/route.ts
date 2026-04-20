import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { name, email, mobile } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('padel_village_leads')
    .insert({ name, email, mobile: mobile || null })

  if (error) {
    console.error('[leads] Supabase error:', error)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
