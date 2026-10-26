# BUILD-PLAN.md
## Aayush Aryan — Portfolio · Master Build Plan

Project: `jellyfish` · Repo: `github.com/AayushAryan007/Jellyfish` · Host: Vercel (auto-deploy on push to `main`)
Local path: `/Users/aayusharyan/Desktop/jellyfishp`

---

# PART ONE — CREATIVE BRIEF

## 1. Website overview

A single-page, cinematic personal portfolio for **Aayush Aryan, Backend Software Engineer**. The site exists to do three jobs, in this order:

1. Make a recruiter, hiring manager, or collaborator understand within five seconds that Aayush builds serious production backends.
2. Prove it with specific numbers, named systems, and a credible story.
3. Move them to LinkedIn (primary), the résumé (secondary), or email (tertiary).

**Audience:** engineering managers, technical recruiters, founders hiring backend or AI engineers, and peers evaluating him for collaboration.

**Creative concept: "The Deep End."**
Backend engineering is the work that lives below the surface: the part users never see but everything depends on. Jellyfish live in the same place: the deep, dark, pressurised water where only resilient things survive, glowing with their own light. The site is a slow descent. Scrolling is diving. A thin depth gauge on the right edge reads from `0 m` at the hero to `4,000 m` at the footer, replacing a generic scrollbar with the site's one signature device.

## 2. Core positioning

**Positioning statement:**
Aayush Aryan is a backend engineer who builds the systems underneath the product: secure, fast, integration-heavy Python and Django platforms that hold up in production, and increasingly, the AI-powered applications built on top of them.

**One-liner (hero support copy):**
I build reliable backend systems, connect the APIs businesses run on, and fix the production problems nobody else wants to touch, in Python, Django, and the cloud.

**What makes him different (the proof triangle):**
- **Production depth:** 80+ REST APIs across 7+ insurer integrations, with end-to-end ownership as Backend SPOC on a bank's insurance platform.
- **Performance instinct:** cut a critical report from ~30 seconds to 2–3 seconds.
- **Algorithmic sharpness:** 6th globally in CodeChef Starters 108; LeetCode Knight (1,845).

## 3. Brand personality

Minimal, premium, futuristic, quietly confident. He speaks like a senior engineer in a design review: precise, calm, specific, never hype. No exclamation marks, no "passionate rockstar ninja" language, no emoji.

| Is | Is not |
|---|---|
| Precise | Vague or buzzword-heavy |
| Calm under pressure | Loud or salesy |
| Builder, owner | Spectator, "aspiring" |
| Curious about AI | AI-hype merchant |
| Personal, human | Corporate résumé-speak |

## 4. Visual direction

Taken directly from the approved reference set (red bioluminescent jellyfish on pure black, glass cards, oversized tight grotesk type), translated from "AI agency" to "individual engineer."

- **Darkness is the canvas.** True black `#000000`, never grey-black. The red light is the only light source on the page.
- **Bioluminescence as accent.** Red glows from within objects (jellyfish, buttons, highlighted words), never as flat fills or gradient washes.
- **Glass instruments.** Stats and info sit in dark translucent cards with a 1px warm hairline border and a faint inner top-edge highlight, as in the references. Jellyfish drift *behind* these cards, visible through them.
- **Engineering details, used sparingly.** Small monospace is reserved for real technical content only: endpoint paths, stack tags, the depth gauge. Not for decorative labels.
- **Restraint.** One signature moment per section. Everything else stays quiet.

## 5. Higgsfield Seedance 2.0 asset generation

**Model:** Seedance 2.0 (`seedance_2_0`) via the Higgsfield MCP · **Resolution:** 1080p · **Aspect:** 16:9 (plus 9:16 variants for mobile where noted) · **Length:** 8–12 s per clip.

**Identity reference:** `Media/aayush-reference.jpg` (in the main project folder, **not** committed to the repo). Upload once with `media_upload` → PUT → `media_confirm`, then register it as a Higgsfield **Reference Element** named `aayush` (`manage_reference_elements`, action `create`, category `character`). Every scene that shows Aayush embeds `<<<ELEMENT_ID>>>` in the prompt to keep his face and build consistent. Scenes without Aayush (jellyfish-only) do not use the element.

**Universal style suffix (append to every prompt):**
> Pitch-black void background, single-source deep crimson bioluminescent light (#E6392B to #FF5A3C), true blacks with no grey haze, shallow depth of field, slow deliberate motion, anamorphic cinematic look, fine film grain, photoreal, no text, no logos, no UI watermarks, no lens flares, no neon cyberpunk clichés.

**Credit note:** the Higgsfield account currently has **0 credits**. Run `get_cost: true` on each job first, top up, then generate. The site is built so it ships and looks finished **before** any video exists (see §23 fallbacks).

**Post-processing for every clip (ffmpeg):**
```bash
# Web delivery (autoplay loops)
ffmpeg -i in.mp4 -an -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4
ffmpeg -i in.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 out.webm
# Scroll-scrub variant (every frame a keyframe = smooth seeking)
ffmpeg -i in.mp4 -an -c:v libx264 -crf 22 -g 1 -pix_fmt yuv420p -movflags +faststart out-scrub.mp4
# Poster frame
ffmpeg -i in.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 3 poster.jpg
```

## 6. Three cinematic scenes

Structure decided in interview: **the hero jellyfish is one continuous, endlessly looping clip; every scene after it is independent.**

### Scene 1 — ABYSSAL BLOOM (hero, continuous loop)
`assets/video/hero-jellyfish.mp4` · 16:9 and 9:16 · 10 s · seamless loop · no identity reference

> A single large crimson jellyfish drifts upward through absolute black water, its translucent bell contracting and relaxing in a slow, realistic pulse, long trailing tentacles and frilled oral arms rippling behind it with natural fluid lag. Tiny suspended particles catch its glow. Camera is locked off, slightly below the animal, so it rises gently through the upper-right of frame and leaves the left third in darkness for text. Motion is slow, hypnotic, biologically accurate, and the final frame matches the first so it loops seamlessly. [style suffix]

### Scene 1b — THE DRIFTERS (ambient layer, not a separate story beat)
`assets/video/drifter-a.mp4`, `drifter-b.mp4` · 8 s each · seamless loops · square 1:1

> A small crimson jellyfish, centred in frame against pure black, pulsing gently and drifting slowly upward and slightly sideways with realistic bell contractions and trailing tentacles. Nothing else in frame. Seamless loop. [style suffix]

Generate two variants (one compact moon-jelly silhouette, one long-tentacled). The site composites them over black with `mix-blend-mode: screen`, so the black disappears and only the glowing animal remains. They are placed at 3–5 different sizes, speeds, and rotations, drifting through the page behind the glass cards. Re-using two clips at many scales keeps credits and file size low.

### Scene 2 — THE ENGINE ROOM (story section, scroll-scrubbed)
`assets/video/builder.mp4` + `builder-scrub.mp4` · 16:9 · 10 s · uses identity element

> <<<ELEMENT_ID>>> sits at a minimal dark desk in a black room, lit only by a deep crimson rim light from behind and the soft red glow of the screens in front of him. Around him, thin floating translucent panels show real backend engineering: a scrolling Python and Django code editor, a database schema diagram, an API request log with status codes, and a service architecture graph with connected nodes. Graphics are refined, thin-lined, and restrained, like professional engineering tools, not sci-fi holograms. He types, pauses, studies a diagram, and leans back slightly, calm and focused. Camera performs a single slow push-in from a wide shot to a medium close-up. Mood: an engineer solving a hard production problem late at night. Mature, understated, premium. [style suffix]

### Scene 3 — TENDRILS TO TOPOLOGY (pillars section, scroll-scrubbed)
`assets/video/network.mp4` + `network-scrub.mp4` · 16:9 · 10 s · no identity reference

> A crimson jellyfish hangs in black water. Slowly, its long tentacles straighten and extend outward, and their glowing tips resolve into precise points of light that connect with fine luminous lines, transforming the tentacles into an elegant distributed system map: servers, API gateways, queues, and databases represented as minimal glowing nodes with data pulses travelling along the connections. The bell of the jellyfish remains as the central hub. The transformation is gradual, organic, and precise, like a scientific visualisation, not a cartoon. Camera drifts slowly backward to reveal the full network. [style suffix]

**Scene budget:** 5 clips total (hero, 2 drifters, builder, network). Run `get_cost` on each before generating; regenerate only the clip that misses.

---

# PART TWO — WEBSITE STRUCTURE & CONTENT

## 7. Website structure

Single page, ten sections. Depth gauge values shown in brackets.

| # | Section | Anchor | Depth | Signature moment |
|---|---|---|---|---|
| 0 | Nav | — | — | Glass pill nav, active pill glows |
| 1 | Hero | `#top` | 0 m | Looping jellyfish, kinetic headline reveal |
| 2 | Stats strip | `#proof` | 400 m | Numbers count up as they enter |
| 3 | Mission | `#mission` | 900 m | Line-by-line word illumination on scroll |
| 4 | Three pillars | `#craft` | 1,500 m | Scrubbed tendril-to-network video |
| 5 | Story | `#story` | 2,100 m | Scrubbed Engine Room video, pinned timeline |
| 6 | Featured work | `#work` | 2,800 m | Horizontal case-study rail |
| 7 | Competitive edge | `#edge` | 3,300 m | Oversized ranking numerals |
| 8 | Final CTA | `#contact` | 3,800 m | Jellyfish returns, glowing LinkedIn button |
| 9 | Footer | — | 4,000 m | Quiet sign-off |

## 8. Navigation

Left: wordmark **Aayush Aryan** with a small glowing red disc (echoing the reference's logo mark). Centre: glass pill with `Work · Craft · Story · Contact`; the active section's pill fills red as you scroll (ScrollTrigger-driven). Right: red pill button **LinkedIn ↗** (the primary CTA is always one click away). Nav hides on scroll down and returns on scroll up. Mobile: wordmark + red **Menu** pill opening a full-screen black overlay with large links.

## 9. Hero section

**Layout (desktop):**
```
┌──────────────────────────────────────────────────────────────┐
│ ● Aayush Aryan      [ Work  Craft  Story  Contact ]  LinkedIn│
│                                                    /i build  │
│ [● Backend Engineer]                               BACKENDS  │
│                                     ╭───╮          APIs      │
│ Built for          Python ·         │ ~ │ jellyfish AI       │
│ the deep           Django ·         ╰┬┬┬╯ (video)  ┌────────┐│
│ end.               Cloud            ││││         │80+ APIs││
│                                     ││││         └────────┘│
│ I build reliable backend systems… (max 52ch)       ┌────────┐│
│ [ Connect on LinkedIn ]  [ Download résumé ]       │~90%    ││
│                                                    └────────┘│
│ ┌───────┐ ┌───────┐ ┌───────┐   in  gh  ✉                 0m│
│ │7+     │ │#6     │ │1,845  │                              │  │
│ └───────┘ └───────┘ └───────┘                         Scroll │
└──────────────────────────────────────────────────────────────┘
```

- **Eyebrow chip:** `● Backend Engineer` (glass pill, red dot).
- **Headline (huge, 3 lines, left-aligned):** "Built for / the deep / end." Final word fades from white to red, matching the reference's gradient on "Demand."
- **Side note beside line 1 (small):** "Python · Django · Cloud · AI" (reference's "From idea to launch" device).
- **Support copy:** "I build reliable backend systems, connect the APIs businesses run on, and solve the production problems that keep platforms awake at night."
- **CTAs:** primary red glowing pill **Connect on LinkedIn**; secondary dark glass pill **Download résumé**.
- **Top-right micro-list:** `/i build` → BACKENDS (red) · APIs (white) · AI (red).
- **Three bottom-left glass stat cards:** `7+` insurer integrations · `#6` CodeChef Starters 108, global · `1,845` LeetCode Knight.
- **Right column cards:** card 1 shows a mini looping jellyfish with `80+` "REST APIs shipped to production"; card 2 shows `~90%` "faster report generation" with a red **Email me** button.
- **Social column:** LinkedIn, GitHub, email icons in square glass tiles.
- **Bottom-right:** vertical "Scroll" label and the depth gauge starting at `0 m`.

## 10. Animated stats strip

Full-width strip of five glass instruments, separated by hairlines. Each number counts up from 0 (GSAP, 1.6 s, `power3.out`) the first time it enters the viewport.

| Value | Label | Detail line |
|---|---|---|
| 80+ | REST APIs delivered | across 5+ insurance modules |
| 7+ | Insurer integrations | built and supported in production |
| ~90% | Faster reporting | 30 s → 2–3 s |
| #6 | Global rank | CodeChef Starters 108 |
| 1st | of 450 | HackerRank × GDSC contest |

## 11. Mission section

Small chip `● Mission`, then one huge statement that illuminates word by word as you scroll (words start at 15% opacity and brighten to 100%; three phrases glow red):

> "I turn **complex problems** into systems that are **simple, secure,** and **built to last**, software that creates real value for the people and businesses who depend on it."

Right-aligned beneath, small body copy: "Good engineering is invisible. When a system is designed well, nobody notices it at all. That's the standard I hold my work to."

A medium drifter jellyfish rises slowly behind the statement.

## 12. Three pillars section

Pinned section (≈250 vh of scroll). Left half: the **Tendrils to Topology** video scrubs with scroll. Right half: three stacked glass cards that activate one at a time as the video progresses, mirroring the reference's numbered service list (numbering is valid here: there are exactly three ordered disciplines).

**(01) Backend Engineering & System Design**
Scalable, secure, reliable services in Python and Django: clean REST APIs, well-modelled databases, and asynchronous processing that keeps working under real load.
Tags: `Python` `Django` `DRF` `PostgreSQL` `Celery` `Async`

**(02) API Integrations & Cloud DevOps**
Connecting third-party systems into dependable business workflows, then shipping them in containers with automated pipelines and the caching needed to stay fast.
Tags: `REST` `SAML 2.0 SSO` `Docker` `AWS` `OCI` `Redis` `CI/CD`

**(03) AI Engineering & Intelligent Applications**
Building practical AI products with LLMs, retrieval-augmented generation, vector databases, and tool-calling agents, focused on what's useful, not what's fashionable.
Tags: `LLMs` `RAG` `Vector DBs` `Agents` `Tool calling`

## 13. Story section

Pinned split layout. Left: the **Engine Room** video, scroll-scrubbed (slow push-in on Aayush at the desk). Right: a vertical timeline (a true sequence, so numbered markers are appropriate) whose active step glows red as you scroll.

1. **The curiosity.** "It started with wanting to know how things actually work, and the habit of not stopping until I did."
2. **JSS Academy of Technical Education, Noida.** "B.Tech. Built my foundations in programming and sharpened problem-solving through competitive coding, ranking 6th globally in a CodeChef Starters round."
3. **Into production.** "Stepped into industry building real backend systems in Python, Django, databases, and the cloud, on insurance platforms with complex business rules and zero tolerance for failure."
4. **Ownership.** "Became Backend SPOC for the Equitas Bank insurance platform, owning requirements, development, testing, deployment, and production support end to end."
5. **What's next.** "Deepening backend and system-design expertise while building with AI: systems that are technically strong and genuinely useful."

Closing line beneath the timeline, larger: "Growth comes from consistency, ownership, and the willingness to keep pushing past what you already know."

## 14. Product / Service / Community section → "How I work"

Adapted for an individual engineer: a compact row of four glass principle cards (no numbering; these aren't a sequence).

- **Own it end to end.** From the first requirement to the 2 a.m. production fix.
- **Measure, then optimise.** The 30-second report became 3 seconds because I profiled before I guessed.
- **Secure by default.** Auth, tokens, and SSO designed properly the first time.
- **Keep it simple.** The best architecture is the one the next engineer understands.

## 15. Featured work / content section

Chip `● Selected Work`. Heading: "Systems in production." A horizontal rail (pinned, scroll-driven translate on desktop; native swipe on mobile) of large glass case-study cards, styled like the reference's "magnitude" card: dark media area on top, white details bar below with Description / Stack / Impact columns.

1. **Equitas Bank Insurance Platform**: Backend SPOC. Requirements to production support across multiple insurer integrations. Stack: Django, DRF, PostgreSQL, Docker. Impact: end-to-end ownership of a live banking platform.
2. **Sales Report Engine**: rebuilt data retrieval and report generation. Impact: ~30 s → 2–3 s (~90% faster).
3. **Multi-Insurer Integration Layer**: 80+ REST APIs across 7+ insurers and 5+ modules. Impact: one consistent interface over many inconsistent partners.
4. **Secure Identity & SSO**: SAML 2.0 single sign-on and token lifecycle management. Impact: secure, seamless enterprise login.
5. **AI project slot(s)**: *content needed* (name, one-line description, stack, GitHub link). Until supplied, show a "Currently building with LLMs & RAG" card linking to GitHub.

Card media: abstract generated stills in the house style (red light on black: schema lines, data flows), never fake product screenshots. Company-confidential details stay at the level of what's already public on the résumé.

## 16. Competitive edge section

A short, punchy interlude. Four oversized numerals in a row, each with a small label, in the reference's "230K" style (numeral white, suffix red):

- **6th** global · CodeChef Starters 108
- **1st** of 450 · HackerRank × GDSC
- **2nd** of 690 · Nibble Computer Society
- **1,845** LeetCode · Knight badge

Sub-line: "Codeforces Round 926 (Div. 2): 2,290th of 43,000+." Links to LeetCode / CodeChef / Codeforces profiles (*URLs needed*).

## 17. Final CTA section

Full-viewport. The hero jellyfish returns, larger and closer, rising from the bottom. Headline: "Let's build something / that holds." Body: "Open to backend engineering roles, system-design challenges, and AI-driven projects."

Buttons: **Connect on LinkedIn** (primary red, glowing, magnetic) · **Download résumé** (glass) · **aayush@…** (text link that copies the email to clipboard and confirms with "Email copied").

## 18. Footer

One quiet row on black: `© 2026 Aayush Aryan` · LinkedIn · GitHub · Email · "Back to the surface ↑" (smooth-scrolls to top while the depth gauge counts back to 0 m). Gauge reads `4,000 m` here.

---

# PART THREE — DESIGN SYSTEM

## 19. Complete visual style guide

**Colour tokens**

| Token | Hex | Use |
|---|---|---|
| `abyss` | `#000000` | Page background |
| `trench` | `#0B0606` | Card fill base (with 60–70% alpha) |
| `ember` | `#E6392B` | Primary accent, buttons, highlighted words |
| `glow` | `#FF5A3C` | Button glow, hover, active states |
| `bone` | `#F4EFEC` | Primary text and numerals |
| `ash` | `#8C8481` | Secondary text |
| `hairline` | `rgba(255,90,60,0.18)` | Card borders, dividers |

Contrast: `bone` on `abyss` 19.6:1; `ash` on `abyss` 6.1:1 (AA for body). `ember` is used for large text and UI only, never small body copy.

**Glass card recipe**
```css
background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01)) , rgba(11,6,6,0.55);
border: 1px solid rgba(255,90,60,0.18);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
backdrop-filter: blur(14px) saturate(120%);
border-radius: 22px;   /* large cards 28px, chips/buttons full pill */
```

**Primary button:** ember fill, bone text, `box-shadow: 0 0 32px rgba(230,57,43,0.55)`, glow intensifies on hover.

**Grain:** fixed full-screen SVG `feTurbulence` noise at 6% opacity, `mix-blend-mode: overlay`, `pointer-events: none`, animated by stepping `background-position` 8 fps.

## 20. Typography

- **Display & UI:** **Inter Tight** (Google Fonts) weights 300, 400, 500. Headlines at weight 400 with tight tracking `-0.045em` and line-height `0.92`, matching the reference's dense grotesk stacks.
- **Technical:** **JetBrains Mono** 400, used only for stack tags, endpoint-style details, and the depth gauge.

**Scale (fluid with `clamp`)**

| Role | Size | Weight / tracking |
|---|---|---|
| Hero | `clamp(3.5rem, 9vw, 9.5rem)` | 400 / -0.05em / lh 0.9 |
| Section heading | `clamp(2.5rem, 5.5vw, 5.5rem)` | 400 / -0.04em / lh 0.95 |
| Mission statement | `clamp(1.9rem, 3.8vw, 3.75rem)` | 400 / -0.03em / lh 1.08 |
| Big numerals | `clamp(4rem, 12vw, 12rem)` | 300 / -0.06em |
| Body | `1.0625rem` | 400 / 0 / lh 1.6, max 60ch |
| Small / labels | `0.8125rem` | 500 / 0 |
| Mono tags | `0.75rem` | 400 / 0.02em |

Sentence case everywhere. No all-caps labels except the reference-matched `/i build` micro-list.

## 21. Animation direction

GSAP 3 + ScrollTrigger + Lenis. One orchestrated moment per section; nothing animates just because it can.

- **Page load (once, ~1.8 s):** black screen → jellyfish video fades up from 0 → headline lines rise through a mask (`yPercent: 110 → 0`, stagger 0.08, `expo.out`) → support copy and CTAs fade → cards slide in from the right with stagger. Total feels like lights coming on in deep water.
- **Kinetic typography:** split headings into lines and words (custom splitter, no paid plugin). Mission text illuminates word-by-word with `scrub: true`. The final hero word carries an animated white-to-red gradient.
- **Counters:** stats count up once on enter.
- **Drifters:** each drifter jellyfish has a slow `yPercent` parallax tied to scroll plus an independent sine-wave `x` sway (GSAP `repeat: -1, yoyo: true`, 7–14 s), at varied scales (0.25×–0.8×) and opacities (0.35–0.8) for depth. Some sit at `z-index` below cards so they visibly pass behind the glass.
- **Video scrubbing:** pillars and story videos map `currentTime` to scroll progress inside pinned sections (see §26).
- **Easing language:** `expo.out` for reveals, `power2.inOut` for scrubs, `sine.inOut` for organic drift. Durations 0.6–1.2 s for UI, never bouncy.

## 22. Interaction design

- **Magnetic primary buttons:** cursor within 80 px pulls the button up to 8 px (GSAP `quickTo`), with the glow following.
- **Custom cursor (desktop, fine pointers only):** 10 px bone dot; expands to a 56 px red ring with "View" over case-study cards. Native cursor kept for text inputs and links' accessibility.
- **Card hover:** border brightens from 18% to 40% ember, a soft radial red light follows the pointer inside the card.
- **Copy-email:** click copies to clipboard; label swaps to "Email copied" for 2 s.
- **Focus states:** 2 px `glow` outline, 4 px offset, on every interactive element.

## 23. Scroll behaviour

- **Lenis** smooth scrolling (`lerp: 0.09`, `wheelMultiplier: 1`), synced to GSAP's ticker; ScrollTrigger updates on Lenis scroll.
- **Pinned sections:** Pillars (≈250 vh) and Story (≈300 vh) pin and scrub. Featured Work pins for its horizontal rail on desktop only.
- **Depth gauge:** fixed on the right edge, mono numerals counting `0 m → 4,000 m` with overall scroll progress; a thin ember line fills as you descend.
- **Anchor links** use `lenis.scrollTo` with a nav-height offset.
- **Video fallbacks:** until a clip exists, each video slot renders a CSS/SVG fallback (a glowing procedural jellyfish SVG with animated tentacle paths for the hero and drifters; a static still with a slow Ken Burns for scrub scenes), so the site is complete and shippable before any Higgsfield generation.

## 24. Mobile behaviour

- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- **Hero:** single column, 9:16 jellyfish video behind a gradient scrim; stat cards become a 2-column grid; right-column cards stack under CTAs.
- **No scroll-scrubbed video on touch devices.** Pillars and Story use short autoplay muted loops (or posters on Save-Data/slow connections) with normal stacked cards.
- **No Lenis on touch**: native momentum scrolling. No custom cursor or magnetic effects.
- **Drifters:** reduced to 2 on mobile, smaller, lower opacity.
- **Featured Work rail:** native horizontal swipe with CSS scroll-snap.
- Tap targets ≥ 44 px. Nav collapses to Menu overlay.
- **`prefers-reduced-motion`:** disable Lenis, scrubbing, counters (show final values), drifter movement, and grain animation; videos show poster frames with a play control.

---

# PART FOUR — TECHNICAL IMPLEMENTATION (for Claude Code)

## 25. Stack decision

The original brief template asked for a static `index.html / style.css / script.js` build with CDN scripts. This project instead uses the stack already set up, tested, and deployed: **React 19 + Vite + Tailwind CSS v4**, deployed on Vercel. Equivalent intent, better result:

- Vite outputs a fully **static** site (`dist/`), so hosting, performance, and SEO behave exactly like a static build.
- **GSAP, ScrollTrigger, and Lenis are installed from npm** rather than CDN, so they're version-locked, tree-shaken, and bundled with the app. (`npm i gsap lenis`)
- All media lives in `/public/assets` and is referenced with root-relative paths (`/assets/video/hero-jellyfish.mp4`).
- No backend is needed. If a contact form is ever added, it goes in `/api` as a Vercel serverless function.

## 26. File structure

```
jellyfishp/
├─ BUILD-PLAN.md
├─ index.html                 # meta, OG tags, font preconnects
├─ vite.config.js             # react() + tailwindcss()
├─ public/
│  ├─ favicon.svg
│  ├─ og-image.jpg            # 1200×630, jellyfish + name
│  └─ assets/
│     ├─ video/  hero-jellyfish{.mp4,.webm,-mobile.mp4}  drifter-a.mp4  drifter-b.mp4
│     │          builder.mp4 builder-scrub.mp4  network.mp4 network-scrub.mp4
│     ├─ img/    posters/*.jpg  work/*.jpg
│     └─ docs/   Aayush-Aryan-Resume.pdf
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css               # @import "tailwindcss"; @theme tokens; grain; glass utility
   ├─ data/content.js         # ALL copy, stats, links, projects in one place
   ├─ lib/
   │  ├─ smoothScroll.js      # Lenis + GSAP ticker + ScrollTrigger sync
   │  ├─ splitText.js         # line/word splitter for kinetic type
   │  └─ useReducedMotion.js
   └─ components/
      ├─ Nav.jsx  DepthGauge.jsx  Grain.jsx  Cursor.jsx  MagneticButton.jsx
      ├─ GlassCard.jsx  Chip.jsx  Counter.jsx  JellyfishFallback.jsx
      ├─ VideoLoop.jsx  ScrubVideo.jsx  Drifters.jsx
      └─ sections/
         Hero.jsx  StatsStrip.jsx  Mission.jsx  Pillars.jsx  Story.jsx
         Principles.jsx  Work.jsx  Edge.jsx  FinalCTA.jsx  Footer.jsx
```

## 27. Key implementation notes

**Lenis + ScrollTrigger sync (`smoothScroll.js`)**
```js
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.09 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}
```
Skip on touch devices and when reduced motion is on.

**Scroll-scrubbed video (`ScrubVideo.jsx`)**
- Use the `-scrub.mp4` (all-keyframe) file, `muted playsInline preload="auto"`.
- Pin the section; on ScrollTrigger `onUpdate`, set a target time `progress * duration` and ease toward it each tick with `gsap.quickTo`-style lerp, applying `video.currentTime` only when the delta > 1 frame. This avoids decoder thrash.
- If seeking proves choppy in Safari, fall back to an image sequence: extract 120 WebP frames (`ffmpeg -vf fps=12,scale=1600:-1`) and draw to a `<canvas>`.

**Looping video (`VideoLoop.jsx`)**
- `autoPlay muted loop playsInline`, `poster` set, WebM then MP4 `<source>` order.
- Pause via IntersectionObserver when off-screen.
- Drifters render with `mix-blend-mode: screen` so the black background vanishes.

**Content in one file.** Every string, stat, link, and project lives in `src/data/content.js` so Aayush can edit copy without touching components.

**SEO & meta:** title "Aayush Aryan · Backend Software Engineer"; description from the positioning one-liner; Open Graph and Twitter card with `og-image.jpg`; `Person` JSON-LD with `sameAs` LinkedIn and GitHub.

## 28. Performance budget

- Initial JS ≤ 120 KB gzipped. Lighthouse Performance ≥ 90 desktop, ≥ 80 mobile.
- Hero video ≤ 2.5 MB (WebM), mobile variant ≤ 1.5 MB; drifters ≤ 600 KB each; scrub files lazy-loaded when their section is within one viewport.
- Fonts: preconnect, `display=swap`, only the listed weights.
- `backdrop-filter` limited to visible cards; drifter count capped at 5 desktop / 2 mobile.
- Respect `navigator.connection.saveData`: posters only.
- Animate only `transform` and `opacity`.

## 29. Build order

1. Tokens, fonts, grain, glass utility, `content.js`.
2. Nav, depth gauge, Lenis setup.
3. Hero with `JellyfishFallback` (SVG) → swap to video when available.
4. Stats strip, Mission, Principles, Edge, Final CTA, Footer.
5. Pillars and Story with poster fallbacks → add scrub once videos exist.
6. Work rail.
7. Drifters, cursor, magnetic buttons.
8. Mobile pass, reduced-motion pass, accessibility pass (keyboard, focus, alt text, contrast).
9. Higgsfield generation (after credit top-up), ffmpeg encode, drop into `/public/assets/video`.
10. Lighthouse check, `git push` → Vercel auto-deploys.

## 30. Open inputs needed from Aayush

- [ ] LinkedIn URL
- [ ] Email address
- [ ] Résumé PDF → `public/assets/docs/Aayush-Aryan-Resume.pdf`
- [ ] Reference photo → `Media/` (for the Engine Room scene)
- [ ] Current company name and job title (or confirm to keep it unnamed)
- [ ] 1–3 AI or personal projects with GitHub links
- [ ] LeetCode, CodeChef, Codeforces profile URLs
- [ ] Higgsfield credits (currently 0) before video generation
