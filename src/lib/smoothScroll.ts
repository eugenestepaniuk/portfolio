/**
 * Scrolls the window to a section by id.
 *
 * Native `scrollIntoView({ behavior: 'smooth' })` is a no-op in browsers where
 * smooth scrolling is switched off, which would leave the menu links dead, so
 * the animation is driven here with requestAnimationFrame instead.
 */
const HEADER_OFFSET = 84;
const MIN_DURATION = 700;
const MAX_DURATION = 1500;

/** Long jumps get more time than short ones, so every trip feels equally unhurried. */
const durationFor = (distance: number) =>
  Math.min(MAX_DURATION, Math.max(MIN_DURATION, Math.abs(distance) * 0.45));

/** Quintic ease: a slow start and a long, soft landing on the target section. */
const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 - (-2 * t + 2) ** 5 / 2;

export function scrollToSection(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  const to = Math.max(0, Math.min(top, maxScroll));
  const from = window.scrollY;
  const distance = to - from;

  if (Math.abs(distance) < 2) return true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    window.scrollTo({ top: to, behavior: 'instant' });
    return true;
  }

  const start = performance.now();
  const duration = durationFor(distance);

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    window.scrollTo({ top: from + distance * easeInOutQuint(progress), behavior: 'instant' });
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
  return true;
}