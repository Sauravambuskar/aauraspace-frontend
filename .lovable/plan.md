## Aaura Realty — Bold Image-Driven Real Estate Site

**Stack note:** This Lovable project runs on **TanStack Start + Vite** (not Next.js 14). I'll deliver the exact same design, sections, animations and behavior using equivalent libraries — the visual result and interactions will match your spec 1:1.

| Spec asks for | Will use |
|---|---|
| Next.js 14 App Router | TanStack Start (file-based routes in `src/routes/`) |
| next/image | `<img>` with WebP Unsplash URLs + `loading="lazy"` |
| next/font | Google Fonts `<link>` in `__root.tsx` (Cormorant Garamond + DM Sans) |
| Tailwind config | Tailwind v4 design tokens in `src/styles.css` (oklch) |
| Framer Motion | `motion/react` (same API) |
| Lenis, Embla, RHF + Zod | identical packages |
| Resend + `/api/lead` | TanStack server route `src/routes/api/lead.ts` using Lovable Cloud's email (recommended) OR Resend connector |

### Design system (`src/styles.css`)
- Tokens: `--ink #1A1A1A`, `--copper #B87333`, `--cream #FAF8F5` (oklch equivalents)
- `font-serif` → Cormorant Garamond, `font-sans` → DM Sans
- Heading utility: `clamp(48px, 8vw, 96px)`
- Semantic Tailwind utilities: `bg-ink`, `text-copper`, `bg-cream`, etc.

### Sections to build (in order, single page `src/routes/index.tsx`)
1. **Navbar** — transparent → solid ink after 60px (scroll listener + motion)
2. **Hero** — 100vh Embla slider, 3 luxury Pune property photos, autoplay 5s, copper dots, gradient overlay, big serif H1
3. **Services** — 5 expanding horizontal panels (Flat/Shop/Office/Plot/Resale & Rental) with motion layout width animation; mobile accordion
4. **Featured Properties** — asymmetric grid (1 large + 2 stacked), hover image zoom
5. **Parallax image break** — 60vh, "500+ Properties. One Trusted Name."
6. **Stats row** — dark bg, 4 columns, count-up on viewport enter
7. **Gallery slider** — Embla peek carousel, arrow nav, drag
8. **Testimonials** — sliding quotes, auto 6s, copper progress bar
9. **Enquiry form** — split layout, bottom-border inputs, RHF + Zod, POSTs to `/api/lead`
10. **Footer** — massive serif logo, 3 columns, contact, RERA disclaimer

### Backend (lead form)
Enable **Lovable Cloud** so the form delivers via Lovable Emails to `aaurareality19@gmail.com` (zero setup, better deliverability than asking you for a Resend key). Server route `/api/lead` validates with Zod and enqueues the email. If you'd rather use Resend, say the word and I'll swap.

### Animations
- Lenis global wrapper in `__root.tsx` (1.2s smooth)
- Section fade-up + stagger via `motion/react` `whileInView`
- Service panels: `motion.div` flex-grow spring transition
- Card hovers, button press scale, navbar bg fade — all in component variants

### Packages to install
`motion`, `embla-carousel-react`, `embla-carousel-autoplay`, `lenis`, `react-hook-form`, `zod`, `@hookform/resolvers`

### Files
- `src/styles.css` — tokens, fonts, base
- `src/routes/__root.tsx` — fonts link, Lenis, meta
- `src/routes/index.tsx` — composes sections
- `src/components/site/{Navbar,Hero,Services,Featured,ParallaxBreak,Stats,Gallery,Testimonials,EnquiryForm,Footer}.tsx`
- `src/routes/api/lead.ts` — POST handler
- `public/robots.txt`, `src/routes/sitemap[.]xml.ts`

**Confirm and I'll build it all in one pass.** Two quick confirmations needed:
1. OK to use Lovable Cloud Emails (recommended) instead of Resend?
2. OK with TanStack Start instead of Next.js (visual result identical)?
