import ContactButton from '../ContactButton';
import FadeIn from '../FadeIn';
import Magnet from '../Magnet';

const PORTRAIT_SRC =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen flex flex-col bg-[#0C0C0C] pt-24 sm:pt-28 md:pt-32"
      style={{ overflowX: 'clip' }}
    >
      <div className="relative z-20 w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading w-full text-center font-black uppercase tracking-tight leading-none whitespace-nowrap text-[11.5vw] sm:text-[12vw] md:text-[13vw] lg:text-[14vw]"
        >
          Hi, i&apos;m eugene
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light leading-snug max-w-[190px] sm:max-w-[280px] md:max-w-[340px]"
            style={{ fontSize: 'clamp(0.75rem, 1.25vw, 1.25rem)' }}
          >
            Six years building web products with TypeScript, React and Node.js. Lately that includes
            the AI features inside them.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={PORTRAIT_SRC}
              alt="Eugene Stepaniuk"
              draggable={false}
              className="w-full h-auto select-none pointer-events-none"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}