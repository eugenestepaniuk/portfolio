import FadeIn from '../FadeIn';

interface Service {
  number: string;
  name: string;
  description: string;
  stack: string[];
}

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Web Application Development',
    description:
      'Product interfaces that hold up under real use — back-offices, operations consoles, CRM and dashboard-heavy apps. Typed data flow, predictable state, and routing that survives growth.',
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'React Router',
      'TanStack Query',
      'Redux Toolkit',
      'Zod',
    ],
  },
  {
    number: '02',
    name: 'Full-Stack Engineering',
    description:
      'End-to-end features, from schema to screen: REST APIs, relational data modelling, fine-grained role-based access, document and file workflows, and real-time updates over sockets.',
    stack: ['Node.js', 'Express.js', 'Sequelize', 'MS SQL', 'Socket.IO', 'Docker'],
  },
  {
    number: '03',
    name: 'Design Systems & White-Label UI',
    description:
      'A shared component library with token-based theming, so several branded products ship from one codebase — brand overrides through CSS Cascade Layers instead of specificity hacks.',
    stack: ['Design tokens', 'CSS Cascade Layers', 'Component libraries', 'Multi-brand builds'],
  },
  {
    number: '04',
    name: 'Performance & Accessibility',
    description:
      'The parts users never name: how fast a page becomes usable, whether a keyboard can reach everything, whether the markup means what it says. Measured, not assumed.',
    stack: ['Core Web Vitals', 'Semantic HTML', 'WAI-ARIA', 'Keyboard navigation', 'SSR'],
  },
  {
    number: '05',
    name: 'AI Features & Automation',
    description:
      'AI built into the product rather than bolted on — model-backed features, content and media generation pipelines, and automation that connects the tools a business already runs on.',
    stack: ['Claude API', 'Python', 'ComfyUI', 'FFmpeg', 'REST integrations'],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn
        as="h2"
        className="text-[#0C0C0C] text-center font-black uppercase leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </FadeIn>

      <ul className="mx-auto w-full max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            as="li"
            key={service.number}
            delay={i * 0.1}
            className="flex items-start gap-5 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
            style={{
              borderTop: i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)',
            }}
          >
            <span
              className="text-[#0C0C0C] font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.number}
            </span>

            <div className="flex min-w-0 flex-col gap-3 md:gap-4 pt-1 sm:pt-2 md:pt-4">
              <h3
                className="text-[#0C0C0C] font-medium uppercase leading-none"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>

              <ul className="mt-1 flex flex-wrap gap-2">
                {service.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[#0C0C0C]/20 px-3 py-1 text-[#0C0C0C]/70 font-light leading-none"
                    style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}