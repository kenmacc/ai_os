# AI OS — Personal Operations Hub

## Overview
This is a personal AI operating system designed to manage and run all aspects of life and business from one place — content, business, apps, community, and more. Claude acts as the core intelligence, executing tasks, managing memory, and coordinating across all systems.

---

## Project Structure

```
ai_os/
├── .claude/
│   └── skills/          # Custom Claude skills and reusable prompt workflows
├── .tmp/                # Temporary files, drafts, and scratch work
├── args/                # Arguments and input parameters passed to agents/tasks
├── context/             # Background context files Claude reads to stay informed
├── data/
│   └── capture_markers/ # Raw captured data, notes, ideas, and inputs to process
├── deliverables/        # Final outputs — content, docs, reports, apps
├── memory/              # Long-term memory files, logs, and persistent state
├── .env                 # API keys and environment variables (never commit this)
└── CLAUDE.md            # This file
```

---

## How This System Works

- **Context** — Drop background files here so Claude always has up-to-date info about you, your business, goals, and preferences.
- **Capture Markers** — Anything you want processed (ideas, links, voice notes, raw content) goes in `data/capture_markers/`.
- **Args** — Pass structured inputs/parameters to agents and workflows.
- **Skills** — Reusable Claude workflows stored in `.claude/skills/` for repeatable tasks.
- **Memory** — Claude writes and reads persistent memory here to maintain continuity across sessions.
- **Deliverables** — All finished outputs land here — ready to publish, ship, or send.
- **Tmp** — Scratch space for in-progress work, nothing permanent.

---

## Core Principles

1. **Everything runs from here** — content, business ops, apps, community, and personal tasks all flow through this hub.
2. **Claude is the operator** — read context before acting, write outputs to deliverables, log to memory.
3. **Always read context first** — before any task, check `/context` for relevant background.
4. **Capture first, process later** — raw input goes to `data/capture_markers/`, refined output goes to `deliverables/`.
5. **Memory is persistent** — after completing significant tasks, update the relevant file in `/memory`.
6. **Never commit `.env`** — keep all API keys and secrets out of version control.

---

## Key Commands

```bash
# Push latest work to GitHub
git add .
git commit -m "your message"
git push origin main
```

---

## Environment Variables (`.env`)
```
ANTHROPIC_API_KEY=your_key_here
```

---

## Active Areas
- [ ] Content pipeline
- [ ] Business operations
- [ ] App development
- [ ] Community management
- [ ] Personal productivity
