# Eugene — Web & AI Engineer

Single-page portfolio landing: React 18 + TypeScript + Tailwind CSS 3 + Framer Motion 12, bundled with Vite.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc --noEmit && vite build  ->  dist/
npm run preview
```

## Structure

```
public/
  spa-rejuve-hero.jpg           hero screenshot of spa-rejuve.vercel.app used by project card 01
src/
  App.tsx                       Header + Hero → Marquee → About → Services → Projects → Contacts
  index.css                     reset, Kanit body font, .hero-heading gradient, reduced-motion guard
  lib/
    smoothScroll.ts             rAF scroll animation with an 84px header offset
  components/
    Header.tsx                  fixed nav bar: translucent once scrolled, dark/light per section, active link
    FadeIn.tsx                  motion.create() wrapper, whileInView { once, margin 50px, amount 0 }
    Magnet.tsx                  cursor-following translate3d, offset / strength, in 0.3s / out 0.6s
    AnimatedText.tsx            per-character opacity 0.2 → 1, useScroll ['start 0.8','end 0.2']
    ContactButton.tsx           gradient pill, scrolls to #contact
    LiveProjectButton.tsx       ghost pill, renders an external link when given href
    sections/
      HeroSection.tsx           id="home", 14vw gradient headline, magnetic portrait
      MarqueeSection.tsx        2 rows × tripled tiles, scroll offset ×0.3, rAF + passive listener
      AboutSection.tsx          4 corner 3D decorations, scroll-revealed paragraphs
      ServicesSection.tsx       white rounded-top panel, 5 numbered rows with stack chips
      ProjectsSection.tsx       sticky stacking cards, scale → 1 - (n - 1 - i) * 0.03
      ContactsSection.tsx       white rounded-top panel, 4 contact rows
```

## Implementation notes

- Framer Motion writes an inline `transform`, so any Tailwind `-translate-*` used for centering lives on
  a plain parent element and the animated element sits inside it (see the hero portrait wrapper).
- Marquee transforms are written straight to the DOM node inside `requestAnimationFrame`, so scrolling
  never re-renders the 63 tiles.
- `AnimatedText` splits into words first and characters second, so the per-character reveal keeps the
  global character index while line wrapping still breaks at word boundaries.
- Menu links animate the scroll in `lib/smoothScroll.ts` instead of relying on
  `scrollIntoView({ behavior: 'smooth' })`, which is a no-op where the browser has smooth scrolling
  switched off — and it lets each section land exactly below the fixed header.
- `ProjectsSection` keeps every project in `PROJECTS`; entries flagged `hidden: true` are filtered out of
  rendering, so bringing project 02/03 back is a one-line change. A card with a single image renders it
  full width; three images fall back to the original split gallery.
- Remote images (portrait, 3D decorations, marquee GIFs) are hotlinked. The Spa Rejuve card uses a local
  screenshot in `public/`.