import AnimatedText from '../AnimatedText';
import ContactButton from '../ContactButton';
import FadeIn from '../FadeIn';

const ASSET_BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7';

const DECORATIONS = [
  {
    id: 'moon',
    src: `${ASSET_BASE}/moon_icon.11395d36.png`,
    className:
      'absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    id: 'object',
    src: `${ASSET_BASE}/p59_1.4659672e.png`,
    className:
      'absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    id: 'lego',
    src: `${ASSET_BASE}/lego_icon-1.703bb594.png`,
    className:
      'absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    id: 'group',
    src: `${ASSET_BASE}/Group_134-1.2e04f3ce.png`,
    className:
      'absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

const ABOUT_PARAGRAPHS = [
  'With more than 6 years of commercial experience. Most of it has been product engineering: a payment-processing CRM suite, an enterprise document system I designed and built on my own, and a commercial client site.',
  'I care about the parts users never name \u2014 how fast a page becomes usable, whether a keyboard can reach everything, whether the markup means what it says.',
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {DECORATIONS.map((decoration) => (
        <FadeIn
          key={decoration.id}
          className={`${decoration.className} pointer-events-none select-none`}
          delay={decoration.delay}
          duration={0.9}
          x={decoration.x}
          y={0}
        >
          <img src={decoration.src} alt="" aria-hidden="true" className="w-full h-auto" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </FadeIn>

          <div className="flex flex-col gap-6 sm:gap-8">
            {ABOUT_PARAGRAPHS.map((paragraph, i) => (
              <AnimatedText
                key={i}
                text={paragraph}
                className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[620px]"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
              />
            ))}
          </div>
        </div>

        <ContactButton />
      </div>
    </section>
  );
}
