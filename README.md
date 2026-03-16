# thervu2026 — தேர்வு 2026

> **Vote the policy. Not the flag.**

A civic awareness tool for Tamil Nadu's 2026 Assembly Elections. Compare real manifesto promises from 6 parties — anonymized so users judge the policy, not the party badge. Explore topics, pick what resonates, discover who said it.

---

## Stack

- **Next.js 15** (App Router, static export)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** (screen transitions + bar animations)
- **TypeScript**

---

## Get started

```bash
bun install
bun run dev         # http://localhost:3000
bun run build       # production build
bun run type-check  # TypeScript check only
bun run test        # run fairness & audit tests
```

---

## Project structure

```
thervu2026/
├── app/
│   ├── globals.css        # Tailwind v4 theme + party gradient utilities
│   ├── layout.tsx         # Root layout, fonts, metadata, OG tags
│   ├── opengraph-image.tsx # Dynamic OG/Twitter image (1200×630)
│   ├── page.tsx           # Root page — wires all screens together
│   └── legal/
│       └── page.tsx       # Legal & Policies (disclaimer, privacy, terms, IP)
├── components/
│   ├── Landing.tsx        # Landing screen
│   ├── Parties.tsx        # Alliance + party overview screen
│   ├── Categories.tsx     # Topic selector
│   ├── Quiz.tsx           # Policy comparison (anonymized options A/B/C/D)
│   ├── Results.tsx        # Results with gradient bars + share text
│   └── PartyDot.tsx       # Reusable gradient party dot/bar/chip
├── lib/
│   ├── data.ts            # All party + category data (verified, sourced)
│   ├── data.test.ts       # Data audit — fairness, no systematic exclusion
│   ├── quizLogic.ts       # Pure logic (shuffle, tiebreaker, scoring) — auditable
│   ├── quizLogic.test.ts  # Fairness & bias-free audit tests
│   └── useQuiz.ts         # State machine (screen flow, policy scoring)
└── public/                # Static assets (favicon, etc.)
```

---

## Parties included

| Party | Alliance | Data year | Source |
|---|---|---|---|
| DMK | INDIA Alliance | 2021 | Official 505-promise PDF |
| INC | INDIA Alliance | 2021 | State-specific from 2021 + national manifestos |
| AIADMK | NDA Alliance | 2021 | TNM, Business Standard, Scroll (March 2021) |
| TVK | Independent | 2026 partial | Official Mar 7, 2026 event + party statements |
| BJP | NDA Alliance | 2021 | The News Minute (March 22, 2021) |
| NTK | Independent | positions | Official party website + Seeman speeches |

---

## Data integrity rules

All data in `lib/data.ts` must follow these rules:

1. **Primary sources only** — official manifesto PDFs, party websites, or credible press (TNM, Business Standard, The Hindu, The Federal, dtnext)
2. **No inferences** — if a party hasn't said it, don't include it
3. **Partial data flagged** — any unverified or incomplete promise gets `partial: true`, which shows the ⚡ marker throughout the UI
4. **TVK note** — party was founded Feb 2, 2024. There is no 2021 TVK data. Only include what they've officially announced for 2026.
5. **NTK note** — no formal numbered manifesto. Only official party positions.

---

## Updating data as 2026 manifestos drop

When a party releases their 2026 manifesto, update `lib/data.ts`:

1. Find the party in `PARTIES` — update `dataYear` from `2021` to `2026` and `dataNote`
2. Find all categories where that party appears — update the `options` with new verified promises
3. Remove `partial: true` from options that are now confirmed
4. Redeploy (Vercel auto-deploys on push to `main`)

Each manifesto drop = fresh distribution moment. Tweet it.

---

## Fairness & audit

The app is designed to be **bias-free** and **auditable**:

- **Shuffle**: Fisher-Yates algorithm — uniform distribution, no positional bias
- **Scoring**: One point per pick; no party favored or suppressed
- **Tie-breaker**: Uses only unused categories; options filtered to tied parties only
- **Data**: Every party appears in at least one category; no systematic exclusion

Run `bun run test` to execute the audit suite. Tests cover:

- Shuffle correctness (preserves elements, no mutation, deterministic with custom RNG)
- Tie detection and tiebreaker category selection
- Score application and percentage calculation
- Data integrity (all parties represented, schema consistency)

**When updating data:** Run tests after changing `lib/data.ts` to ensure no party is accidentally excluded and tiebreaker coverage remains valid.

---

## Deploying to Vercel

```bash
# Install Vercel CLI
bun i -g vercel

# Deploy
bun vercel

# Set custom domain thervu2026.in in Vercel dashboard
```

---

## SEO & social sharing

- **Metadata**: `app/layout.tsx` — title template, description, keywords, `metadataBase`, canonical, robots
- **OG image**: `app/opengraph-image.tsx` — dynamic 1200×630 image (Swiss cream + black, tagline, party dots). Used for WhatsApp, Twitter, Facebook, LinkedIn
- **Legal page**: Has its own metadata and canonical `/legal`

---

## Legal & Policies

Full legal page: **[thervu2026.in/legal](https://thervu2026.in/legal)** (or `/legal` when running locally).

| Section | Summary |
|---------|---------|
| **Disclaimer & ECI** | Independent, non-partisan, citizen-led. Not affiliated with any party or ECI. Content from public manifestos. May pause during 48-hour silence period (Section 126, RPA 1951). |
| **Privacy** | No accounts, login, or personal data. All policy comparisons run client-side; no choices sent to servers. No third-party trackers. |
| **Terms** | Personal civic education only. Results are not opinion/exit polls; do not misrepresent as such. Provided as-is; no warranties. |
| **IP & Fair Use** | Party names, logos, flags are their owners' IP; used under fair use for commentary/education. UI and code © creators. |

**Data integrity:** This is a civic awareness tool. It does not endorse any party. All data is attributed to public sources. Partial/unverified data is clearly marked. Do not add any content that isn't verifiable from a credible public source.
