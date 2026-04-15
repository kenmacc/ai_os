---
name: offer-engine
description: >
  Offer building and auditing engine. Helps you package what you sell into a clear, compelling offer
  with positioning, pricing, and ICP alignment. Use when user says "build my offer", "define my offer",
  "offer engine", "what should I charge", "help me package my services", "audit my offer", or when
  context/gtm-profile.md shows offer status as "Building from scratch".
user-invocable: true
argument-hint: "[mode] build | audit"
---

# Offer Engine

One session to go from vague services to a packaged, priced, positioned offer you can actually sell.

## When to Use

- Offer status is "Building from scratch" in gtm-profile.md
- You can't explain what you sell in one sentence
- Prospects say "interesting" but don't buy
- You're discounting or unsure what to charge
- You want to audit and sharpen an existing offer

## Read First

Before starting, read:
- `context/my-business.md` — business description and challenge
- `context/my-icp.md` — who you're selling to
- `context/gtm-profile.md` — current offer status and pricing

---

## Mode: Build (default)

Run this when starting from scratch or with only a rough idea.

### Phase 1: The Problem

Ask:
1. What's the specific problem you solve? (not the service — the problem the client feels)
2. What does that problem cost them? (time, money, missed revenue, stress)
3. Why haven't they solved it already? (too busy, didn't know it was possible, tried and failed)

### Phase 2: The Outcome

Ask:
1. What does life look like for the client AFTER working with you?
2. How quickly do they see results?
3. Can you point to a specific result — even from one client or a project you've done?

### Phase 3: The Packaging

Based on phases 1–2, propose 3 packaging options:

**Option A — Starter / Entry Point**
- A small, fast, low-risk engagement
- Goal: get a client in the door, deliver a quick win, build trust
- Price: £500–£2,000 typically
- Example: AI audit + roadmap, landing page with AI chatbot, one automation built

**Option B — Core Offer**
- Your main deliverable — the thing that solves the core problem
- Goal: primary revenue driver
- Price: £3,000–£10,000 typically
- Example: Full AI integration package (website + 2 agents + onboarding)

**Option C — Retainer / Ongoing**
- Monthly support, maintenance, or continued build
- Goal: predictable recurring revenue
- Price: £500–£2,000/mo typically
- Example: AI systems management + new automations each month

Present all three. Ask: "Which of these feels closest to what you want to sell right now?"

### Phase 4: Pricing

Once they pick an option, anchor the price:

1. What's the minimum you'd accept to do this work?
2. What would make it feel well-paid?
3. What do you think the client would pay?

Then recommend: start at the middle of their range. Never start lower than minimum. Give a reason: "This is what communicates you're a professional, not a freelancer."

### Phase 5: The One-Liner

Write a positioning statement using this formula:

> "We help [WHO] achieve [OUTCOME] without [PAIN/OBSTACLE] through [METHOD]."

Example:
> "We help small businesses get their first AI tools live — without needing a tech team — through done-for-you website and agent builds."

Show it. Ask: "Does this feel accurate? Would you say this?"

Refine until they say yes.

### Phase 6: Objection Map

List the 3 most common objections for this type of offer and write a response for each:

1. **"We don't have budget"** → Reframe around cost of NOT solving it
2. **"We're not ready yet"** → Define what "ready" actually requires (usually less than they think)
3. **"We need to think about it"** → Uncover the real hesitation

---

## Mode: Audit

Run this when they have an existing offer that isn't converting.

Ask them to paste or describe:
- Their current offer description
- Price
- Who they've pitched it to
- What objections or responses they get

Then score it across 5 dimensions (1–5):

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity — can you understand it in 10 seconds? | | |
| Specificity — does it name a concrete outcome? | | |
| ICP fit — does it speak to a real pain? | | |
| Price confidence — does the price feel right? | | |
| Differentiation — why you vs. anyone else? | | |

Flag the lowest scoring dimension first. Fix one at a time.

---

## Output

After completing either mode, write/update these files:

### `context/gtm-profile.md`
Update the offer section with:
- Status: Defined
- Description: [one-liner]
- Packages: [A, B, C with prices]
- Guarantee: [if any]

### `deliverables/offer-one-pager.md`
A one-page offer document the user can paste into emails or proposals:

```markdown
# [Business Name] — What We Do

## The Problem
[2 sentences on the pain]

## What You Get
[Package name + deliverables + timeline]

## The Result
[Specific outcome]

## Investment
[Price or range]

## Next Step
[CTA — book a call, reply to this email, etc.]
```

---

## Edge Cases

- **Can't name a specific outcome** — help them find one from their background or a hypothetical client scenario
- **Wants to list too many services** — push back: "Pick one offer to lead with. You can always expand later."
- **Price anxiety** — remind them: underpricing signals low quality. Start higher, discount if needed, never the other way.
- **No clients yet** — use a case study from their background or a "what we'd deliver" scenario as proof of concept
