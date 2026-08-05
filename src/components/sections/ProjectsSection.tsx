import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import FadeIn from '../FadeIn';
import LiveProjectButton from '../LiveProjectButton';

interface Project {
  number: string;
  name: string;
  category: string;
  href?: string;
  /** One image renders full width; three images render the split gallery. */
  images: string[];
  /** Kept in the list but not rendered until the project is ready to show. */
  hidden?: boolean;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Spa Rejuve',
    category: 'Client',
    href: 'https://spa-rejuve.vercel.app/',
    images: ['/spa-rejuve-hero.jpg'],
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    hidden: true,
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    hidden: true,
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

const VISIBLE_PROJECTS = PROJECTS.filter((project) => !project.hidden);

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const FRAME_CLASS =
  'group relative overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';
const ZOOM_CLASS =
  'w-full object-cover transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none';

/** Image in a clipping frame so the hover zoom stays inside the rounded corners. */
function ZoomImage({
  src,
  alt,
  className = '',
  frameClassName = '',
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`${FRAME_CLASS} ${frameClassName}`}>
      <img src={src} alt={alt} loading="lazy" className={`${ZOOM_CLASS} ${className}`} style={style} />
    </div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  if (project.images.length === 1) {
    return (
      <ZoomImage
        src={project.images[0]}
        alt={`${project.name} preview`}
        className="aspect-[1600/812] object-top"
      />
    );
  }

  return (
    <div className="grid grid-cols-5 gap-3 sm:gap-4 items-stretch">
      <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
        <ZoomImage
          src={project.images[0]}
          alt={`${project.name} preview 1`}
          style={{ height: 'clamp(130px, 16vw, 230px)' }}
        />
        <ZoomImage
          src={project.images[1]}
          alt={`${project.name} preview 2`}
          style={{ height: 'clamp(160px, 22vw, 340px)' }}
        />
      </div>

      <div className="col-span-3">
        <ZoomImage
          src={project.images[2]}
          alt={`${project.name} preview 3`}
          frameClassName="h-full"
          className="h-full"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index * (1 / total), 1], [1, targetScale]);

  return (
    <div className="sticky top-24 md:top-32 min-h-[85vh] flex items-start justify-center px-5 sm:px-8 md:px-10">
      <motion.article
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full max-w-6xl origin-top rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-6 md:gap-8">
            <span
              className="shrink-0 text-[#D7E2EA] font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>

            <div className="flex min-w-0 flex-col gap-1 sm:gap-2">
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-xs sm:text-sm md:text-base opacity-60">
                {project.category}
              </span>
              <h3
                className="text-[#D7E2EA] font-medium uppercase leading-none"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={project.href} className="shrink-0" />
        </div>

        <div className="mt-4 sm:mt-6 md:mt-8">
          <ProjectGallery project={project} />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32"
    >
      <FadeIn
        as="h2"
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </FadeIn>

      <div className="mt-10 sm:mt-14 md:mt-16">
        {VISIBLE_PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={VISIBLE_PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}