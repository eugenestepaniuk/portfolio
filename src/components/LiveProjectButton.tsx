interface LiveProjectButtonProps {
  className?: string;
  label?: string;
  /** When present the button becomes a link opening the live site in a new tab. */
  href?: string;
}

const BASE_CLASS =
  'inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-4 py-2 text-[0.7rem] tracking-wider sm:px-10 sm:py-3.5 sm:text-base sm:tracking-widest whitespace-nowrap transition-colors duration-200 hover:bg-[#D7E2EA]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]';

export default function LiveProjectButton({
  className = '',
  label = 'Live Project',
  href,
}: LiveProjectButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={`${BASE_CLASS} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={`${BASE_CLASS} ${className}`}>
      {label}
    </button>
  );
}