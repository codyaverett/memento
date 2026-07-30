---
title: Galaxy Claw / rustyclaw — Full Project Audit
created: 2026-07-29
updated: 2026-07-29
tags: [project]
type: project
status: active
---

# Galaxy Claw / rustyclaw — Full Project Audit

**Date:** 2026-07-29  
**Repo:** [galaxy-gateway/galaxyclaw](https://github.com/galaxy-gateway/galaxyclaw)  
**Local path:** `~/Projects/rustyclaw`  
**Workspace version:** root `1.99.0` · desktop Cargo `0.42.0` · mobile `0.13.0`  
**Issues:** ~113 open / ~99 closed  

Audit comments were left on **35 issues** where the tree contradicted the issue state, recommended closure, or clarified next steps.

---

## 1. Executive summary

Galaxy Claw is a mature multi-surface agent platform (CLI, desktop Tauri workbench, mobile, browser extension, TUI) built as a Rust workspace of ~15 crates. Recent velocity is concentrated on **desktop projects/teams/files UX**; that work is high quality and well documented in-issue.

The main risks are not missing features — they are:

1. **Backlog hygiene** — large clusters of shipped work still open (mobile #99–#109, A2A WS #195–#196, room/served teams)
2. **Monolith growth** — the three “code health” files are larger than when the epic was filed
3. **Release drift** — Cargo `1.99.0` vs latest tag `v1.70.1`; desktop `Cargo.toml` `0.42.0` vs `tauri.conf.json` `0.26.0`
4. **Doc accuracy** — June audit found 150 inaccuracies; architecture overview (#58) still missing; README placeholders (`youruser/rustyclaw`) remain
5. **Strategic sprawl** — payments (#158), voice, provider-proxy, personal mesh all open with little code while desktop UX is the actual product focus

---

## 2. Architecture snapshot

| Layer | Location | Notes |
|---|---|---|
| CLI binary `claw` | `src/` | Still owns gateway + tool registration; `main.rs` **6,694 LOC** |
| Portable agent loop | `rcl-agent-core` | Sound split; keep it |
| Native middleware / session | `src/agent/` | `mod.rs` **3,305 LOC** |
| Config | `rcl-core` | `config.rs` **5,238 LOC** |
| Providers + failover | `rcl-providers` | Failover chains implemented |
| Mesh / A2A | `rcl-mesh` | HTTP + WS hub/spoke; teams; peer health |
| Management API | `rcl-management` | Remote control plane |
| Desktop | `apps/desktop` | Primary product surface (v0.42 Cargo) |
| Mobile | `apps/mobile` | Feature-complete app; packaging open |
| Extension + WASM | `extension/`, `examples/rcl-wasm-example` | WS spoke ready; fetch path still primary |
| MCP | client in harness; `rcl-mcp-server` | stdio only both directions |

**Strengths:** clear crate boundaries for providers/tools/mesh/memory; security layers documented (secrets, redaction, workspace policy, classification); CI has fmt/clippy/test + feature matrix + wasm/desktop/mobile workflows; ~1,140 `#[test]`/`#[tokio::test]` attrs.

**Weaknesses:** monoliths still absorbing features; desktop `main.js` at **4,030 LOC**; harness gaps (streaming, parallel tools, cancellation, retry) still open per `docs/harness-gaps.md`.

---

## 3. Code health

| File | Claimed (Jul 8) | Now | Trend |
|---|---|---|---|
| `src/main.rs` | 5,914 | **6,694** | worse |
| `rcl-core` `config.rs` | 4,633 | **5,238** | worse |
| `src/agent/mod.rs` | 3,127 | **3,305** | worse |
| `apps/desktop/ui/main.js` | — | **4,030** | untracked debt |

Comments posted on **#44, #51, #52, #53** with re-measured LOCs and concrete extraction targets.

Other metrics: ~1,473 `.unwrap()` in `src`+`crates` (many tests); CI quality is good (`-D warnings` for clippy/fmt).

---

## 4. GitHub issues — portfolio view

### By theme (open)

| Theme | Approx. open | Health |
|---|---|---|
| Desktop UX (projects, composer, providers, panels) | ~20 | **Active / accurate** |
| Agent teams / channels / projects | ~15 | Mixed — several shippable |
| Mobile epic + children | 12 | **Mostly shipped, still open** |
| A2A / mesh / multi-node | ~10 | Partially done |
| Provider proxy | 9 | Not started |
| x402 payments | 12 | Not started — park |
| MCP maturity | 6 | Client stdio only; server exists |
| Code health / release / docs | ~12 | Under-invested |
| Session / voice / canvas / backends | ~10 | Stale low-pull |

### Priority:high open (9)

| # | Title | Audit take |
|---|---|---|
| **#241** | Projects fully configurable in UI | **Keep high** — real product gate |
| #183 | Multi-node presence | Phase 1–2 largely done; phase 3 open |
| #165 | x402 money controls | Only matters if payments is in-scope |
| #155 / #153 | Disclosure / trust plane | Strategic; no near-term pull |
| #146 / #145 | Provider-proxy security | Blockers for #140, not for desktop |
| #12 / #13 | Session notify / idle | Valid but stale since June — consider demote |

### Recommend close / re-scope (commented)

| Issues | Reason |
|---|---|
| **#101–#107, #109** | Mobile children shipped on main |
| **#195, #196** | A2A WS hub + mobile client shipped |
| **#217** | Room paradigm implemented (`team_room.rs`) |
| **#216** | Served workspace + `team_files.*` present — re-verify then close |
| **#77** | `extract_styles` shipped |
| **#3** | Full crate rename is wrong; surface rebrand only |

### Still truly open (examples)

| Issues | Gap |
|---|---|
| **#218** | Moderated mode — desktop hard-errors `"not available yet"` |
| **#197** | Extension cutover to `WsSpokeClient` |
| **#108** | Mobile signed packaging |
| **#241, #253, #254, #242** | Desktop product UX |
| **#51–#53** | Monolith splits |
| **#39–#42, #68** | MCP client/server maturity |
| **#140–#149** | Provider proxy (greenfield) |
| **#158–#169** | Payments (greenfield — park) |

---

## 5. Documentation & branding

| Issue | Severity |
|---|---|
| README install URLs use `youruser/rustyclaw` | High (broken onboarding) |
| README understates Slack/Telegram | Medium |
| `docs/features.md` still documents `relay` build example after removal | Medium |
| No `docs/architecture.md` (#58) | High for contributor ramp |
| June accuracy audit (150 findings) not fully cleaned | High |
| Partial rebrand: product “Galaxy Claw”, crates `rustyclaw`, config `RUSTYCLAW_*` | Medium — document as intentional |

---

## 6. Release & versioning

| Signal | Value | Risk |
|---|---|---|
| Root Cargo | `1.99.0` | |
| Latest git tag | `v1.70.1` | Install “latest” ≠ main |
| Desktop Cargo | `0.42.0` | |
| Desktop `tauri.conf.json` | `0.26.0` | Bundle/version mismatch |
| Mobile | `0.13.0` | |

Commented on **#45** and **#56**. Until tags and desktop versions align, release epic work is unsafe.

---

## 7. Security posture

**Strong:** secret denylist + output redaction; workspace path policy; shell denylist; memory classification; Keychain on desktop/mobile; A2A bearer auth; management remote guard.

**Gaps called out on issues:**

- A2A WS browser path uses `?token=` (unavoidable for WS API) — log/Referer leakage needs explicit threat-model language (#67)
- Management API “not found” vs “not running” conflation (#253)
- Provider proxy and x402 must not ship without #145/#146/#165
- mDNS discovery (#186) must wait on trust plane (#153)

---

## 8. Recommended next 2–4 weeks

Ordered for product leverage and hygiene:

1. **Backlog cleanup** — close mobile children, #195/#196/#217/(maybe #216), #77; re-scope #3  
2. **Release hygiene** — sync desktop versions; cut a tag from current main or stop cargo-bumping without tags  
3. **#241** Projects fully editable in UI (keep P0)  
4. **#253** Stopped/unconfigured agent UX (+ management error codes)  
5. **#254 + #242** Provider test pane + failover chain UI (shared raw-chat primitive)  
6. **#218** Moderated team mode (last teams epic hole)  
7. **#197** Extension WS cutover  
8. **#51 first extraction** — gateway or tool registration out of `main.rs`  
9. **#58** Short architecture.md  
10. Park: payments, voice, canvas, serverless, full rename  

---

## 9. Comments posted (35 issues)

| Cluster | Issues |
|---|---|
| Code health | #44, #51, #52, #53 |
| Mobile | #99, #101–#109 (except #108 content is “keep open”) |
| Teams / A2A | #212, #216, #217, #218, #195, #196, #197 |
| Release / docs / rename | #3, #45, #56, #58 |
| Multi-node / session | #183, #185, #12, #13 |
| Desktop UX / epics | #228, #241, #242, #253, #254, #140, #158, #233 |
| MCP / safety | #46, #67, #77, #108 |

No local code or doc files were modified in the rustyclaw repo during this audit (comments only on GitHub).

---

## 10. Workspace crate versions (snapshot)

| Crate / app | Version |
|---|---|
| rustyclaw (root) | 1.99.0 |
| rcl-agent-core | 0.5.0 |
| rcl-channels | 0.6.2 |
| rcl-core | 0.47.0 |
| rcl-harness | 0.5.0 |
| rcl-management | 0.15.0 |
| rcl-mcp-server | 0.1.0 |
| rcl-memory | 0.2.1 |
| rcl-mesh | 0.28.0 |
| rcl-providers | 0.23.0 |
| rcl-services | 0.13.0 |
| rcl-tools | 0.20.0 |
| rcl-transport | 0.1.0 |
| rcl-tui | 0.8.2 |
| rcl-types | 0.11.0 |
| rustyclaw-desktop | 0.42.0 (Cargo) / 0.26.0 (tauri.conf.json) |
| rustyclaw-mobile | 0.13.0 |

---

## 11. Open issues index (compact)

Full open list at audit time (sorted by number). See GitHub for current state.

### Early backlog / platform
- #3 Rename project (re-scope: surface only)
- #12 Session background-task notifications (priority:high, stale)
- #13 Session inactivity timeouts (priority:high, stale)
- #14 Pluggable memory provider
- #15 Self-improving skill loop
- #17 OpenAI-compatible HTTP endpoint
- #18 ClawBands safety middleware
- #19 Typed JSON workflows
- #22 Live Canvas (A2UI)
- #23 Serverless backends
- #24 Voice TTS/STT
- #25 DSPy/GEPA skill optimization
- #38 Local ASR investigation
- #39–#42 MCP client maturity
- #44 Code health epic
- #45 Release & distribution epic
- #46 MCP maturity epic
- #51–#53 Monolith splits
- #56 One-line install script
- #57 crates.io stance
- #58 Architecture docs
- #59 Security posture docs
- #60 Browser/WASM epic
- #66–#70 Extension / daemon / in-page
- #74 Portable git-backed user layer
- #77 extract_styles (recommend close)

### Mobile
- #99 Epic + #101–#109 (most recommend close; keep #108)

### Provider proxy / mesh / payments
- #140–#149 Provider proxy epic + children
- #150–#157 Personal agent mesh epics
- #158–#169 x402 payments (park)
- #176 WASM skill loading
- #178–#180 Tracing / cron / heartbeat
- #183 Multi-node presence epic
- #185–#186 Multi-node phases
- #187–#191 Cross-machine teams
- #193 A2A WS epic
- #195–#197 A2A WS phases (195/196 recommend close)

### Teams / projects / desktop (active)
- #212 Agent teams epic
- #216–#218 Teams phases (216 re-verify, 217 close, 218 open)
- #227–#229 Teams/projects UX
- #232 Team session ownership
- #233 Channels-as-context epic
- #235–#239 Project channel / lead / PM UI
- #241 Projects fully configurable in UI (priority:high)
- #242 Failover chain UI
- #243–#245 @refs, attribution, thinking detail
- #250–#251 File editor / dock layout
- #253 Stopped-agent UX
- #254 Provider test pane
