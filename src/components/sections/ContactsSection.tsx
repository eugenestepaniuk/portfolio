import { ArrowUpRight } from 'lucide-react';
import FadeIn from '../FadeIn';

interface Contact {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const CONTACTS: Contact[] = [
  { label: 'Email', value: 'erl.evgeniy@gmail.com', href: 'mailto:erl.evgeniy@gmail.com' },
  { label: 'Phone', value: '+380 97 417 9591', href: 'tel:+380974179591' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/eugenestepaniuk-71a8ab17b',
    href: 'https://www.linkedin.com/in/eugenestepaniuk-71a8ab17b',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/eugenestepaniuk',
    href: 'https://github.com/eugenestepaniuk',
    external: true,
  },
];

export default function ContactsSection() {
  return (
    <section
      id="contact"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20"
    >
      <FadeIn
        as="h2"
        className="text-[#0C0C0C] text-center font-black uppercase leading-none tracking-tight mb-14 sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Contacts
      </FadeIn>

      <ul className="mx-auto w-full max-w-5xl">
        {CONTACTS.map((contact, i) => (
          <FadeIn as="li" key={contact.label} delay={i * 0.08}>
            <a
              href={contact.href}
              {...(contact.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="group flex items-center justify-between gap-4 sm:gap-8 border-t border-[#0C0C0C]/15 py-6 sm:py-8 md:py-10 transition-colors duration-200 hover:bg-[#0C0C0C]/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C0C0C]"
            >
              <span className="w-20 shrink-0 sm:w-32 md:w-44 text-[#0C0C0C]/40 font-medium uppercase tracking-[0.2em] text-[0.65rem] sm:text-xs md:text-sm">
                {contact.label}
              </span>

              <span
                className="min-w-0 flex-1 truncate text-[#0C0C0C] font-medium leading-none transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontSize: 'clamp(0.95rem, 2.6vw, 2.1rem)' }}
              >
                {contact.value}
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 sm:h-7 sm:w-7 md:h-9 md:w-9 text-[#0C0C0C]/40 transition-all duration-300 group-hover:text-[#0C0C0C] group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </FadeIn>
        ))}
      </ul>

      <FadeIn
        as="p"
        delay={0.3}
        className="mx-auto mt-14 sm:mt-20 w-full max-w-5xl border-t border-[#0C0C0C]/15 pt-8 text-center text-[#0C0C0C]/40 font-light uppercase tracking-[0.2em] text-[0.65rem] sm:text-xs"
      >
        Eugene Stepaniuk — Web &amp; AI Engineer
      </FadeIn>
    </section>
  );
}