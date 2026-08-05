import { useEffect, useState, type MouseEvent } from 'react';
import { scrollToSection } from '../lib/smoothScroll';

export const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

/** All sections in document order — later ones paint over earlier ones. */
const SECTION_IDS = ['home', 'about', 'services', 'projects', 'contact'];

/** Sections with a white background: the bar flips to dark-on-light over these. */
const LIGHT_SECTIONS = new Set(['services', 'contact']);

/** Vertical position of the bar itself, used to sample the section behind it. */
const HEADER_LINE = 76;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      // The section whose top has last crossed the upper third of the viewport wins.
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      let behind = '';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top + window.scrollY <= line) current = id;
        if (rect.top <= HEADER_LINE && rect.bottom > HEADER_LINE) behind = id;
      }

      setActiveId(current);
      setOnLight(LIGHT_SECTIONS.has(behind));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!scrollToSection(id)) return;
    event.preventDefault();
    history.replaceState(null, '', id === 'home' ? ' ' : `#${id}`);
  };

  const barClass = !scrolled
    ? 'border-transparent bg-transparent text-[#D7E2EA]'
    : onLight
      ? 'border-[#0C0C0C]/10 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(12,12,12,0.12)] text-[#0C0C0C]'
      : 'border-[#D7E2EA]/15 bg-[#0C0C0C]/55 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] text-[#D7E2EA]';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6 md:px-10 pt-3 sm:pt-4 md:pt-5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 sm:gap-4 rounded-full border px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-all duration-300 ${barClass}`}
      >
        <a
          href="#home"
          onClick={(event) => handleClick(event, 'home')}
          className="font-black uppercase tracking-tight text-base sm:text-lg md:text-xl transition-opacity duration-200 hover:opacity-70"
        >
          eugene
        </a>

        <ul className="flex items-center gap-2.5 sm:gap-6 md:gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(event) => handleClick(event, link.id)}
                aria-current={activeId === link.id ? 'true' : undefined}
                className={`relative font-medium uppercase tracking-wider text-[0.65rem] sm:text-sm md:text-base lg:text-lg transition-opacity duration-200 hover:opacity-100 ${
                  activeId === link.id ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${
                    activeId === link.id ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}