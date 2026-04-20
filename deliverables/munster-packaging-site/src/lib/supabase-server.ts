import { createClient } from '@supabase/supabase-js'

// Server-only client — uses service role key, never sent to the browser.
// Only import this in API routes and server components.
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
