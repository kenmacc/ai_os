import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

function isAuthenticated(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value
  return session && session === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  const { data, error } = await supabaseServer
    .from('orders')
    .select('*')
    .order('submitted_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  const { id, status } = await req.json()
  const { error } = await supabaseServer
    .from('orders')
    .update({ status })
    .eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
