# Client Login Portal — Context

## What It Is
A client-facing web portal where Irish SME clients log in to access their AI agents and tools. This is the product delivery layer — clients see their dashboard, use their agents, and track usage here.

## Repo
- **Local path:** `C:\Users\kenne\Documents\client-login`
- **GitHub:** https://github.com/kenmacc/client-login.git
- **Lovable project:** https://lovable.dev/projects/e2408d4c-1c1c-464f-bbd6-f2778e58f3e5

## Tech Stack
- **Framework:** React 18 + TypeScript + Vite
- **UI:** shadcn/ui + Tailwind CSS + Radix UI
- **Backend/Auth:** Supabase (auth, database)
- **Forms:** react-hook-form + zod
- **Routing:** react-router-dom v6
- **Charts:** recharts
- **PDF processing:** pdfjs-dist

## Current Pages & Features
- `Auth.tsx` — login / sign up
- `ResetPassword.tsx` — password reset flow
- `Dashboard.tsx` — main client dashboard after login
- `AIAgents.tsx` / `Agents.tsx` — list of available AI agents
- `Admin.tsx` — admin-only panel (gated by `AdminRoute`)
- **Agent pages:**
  - `EmailSummaryAgent.tsx` — summarises emails
  - `EmployeeAgent.tsx` — employee-related AI tasks
  - `InvoiceAgent.tsx` — invoice processing
  - `ImportInvoicePDF.tsx` — import and parse invoice PDFs
  - `AddEmployee.tsx` — add employee records
  - `NewAgent.tsx` — create new agents
- `UsageCharts.tsx` — usage analytics component
- `useLogAgentUsage.ts` — logs agent usage to Supabase

## Auth & Access Control
- `useAuth.tsx` — auth state hook
- `ProtectedRoute.tsx` — blocks unauthenticated users
- `AdminRoute.tsx` — blocks non-admin users
- `useAdminCheck.tsx` — checks admin role in Supabase

## Who Uses This
Irish SME clients (see `my-icp.md`) who have signed up for AI automation services. They log in to run their agents, view usage, and manage their AI tools.

## Development Notes
- Started in Lovable, now being developed locally with Claude
- Changes pushed to GitHub are reflected in Lovable automatically
- Supabase types are in `src/integrations/supabase/types.ts`
- Run locally: `npm run dev` from the repo root
