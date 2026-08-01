# BrightSmile Dental — Demo Website

A premium, fully responsive dental practice homepage — **zero dependencies, opens directly in any browser**.

## 🦷 Preview

A production-ready dental website demo featuring:
- Full-viewport hero with anti-gravity floating animations
- Interactive Before/After smile comparison sliders
- Auto-playing testimonials carousel
- Count-up stats animation
- FAQ accordion
- Appointment booking form with live validation
- Fully accessible (WCAG AA) + SEO-optimized

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | Full page — 12 sections, semantic HTML5, JSON-LD |
| `styles.css` | Design system, animations, mobile-first responsive |
| `script.js` | All interactivity (no frameworks) |
| `images/` | Placeholder photos (replace with real content) |

## 🚀 Quick Start

```bash
# Option 1 — open directly
open index.html

# Option 2 — local server
npx serve .
```

## 📝 Client Customization (`[TODO]` items)

1. **Practice name** — Find/replace `BrightSmile Dental`
2. **Logo** — Replace emoji with `<img src="logo.png">`
3. **Phone & email** — Update all `tel:` and `mailto:` links
4. **Google Maps** — Replace the Maps embed `src` in `#contact`
5. **Doctor photos** — Swap AI images with real headshots
6. **GA4 Analytics** — Uncomment tracking snippet in `<head>`
7. **NexHealth booking** — Replace `href="#contact"` on Book buttons

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#0077B6` | Blue – brand color |
| `--accent` | `#2563EB` | Buttons & CTAs |
| `--teal` | `#14B8A6` | Accents (use sparingly) |
| `--dark` | `#0F172A` | Headings & body text |

## 🌐 Deployment

Deployed on Vercel — [View Live Demo](https://dental-demo-eta-topaz.vercel.app)

---

Built with ❤️ — Vanilla HTML · CSS · JS
