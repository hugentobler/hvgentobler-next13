import Image from "next/image";

import BookIsReading from "@/components/book-is-reading";
import DecoratedLink from "@/components/decorated-link";

export default function AboveFold() {
  const oneLiner = (
    <>
      Professional researcher<sup>1</sup>, creative-engineer<sup>2</sup>
    </>
  );

  const about = [
    <>
      I aim to build a lasting internet company that embodies the golden rule
      <sup>3</sup>. I’m CEO at Ansel, using AI and software to reduce
      externalities. I’m a partner at Inspect Element, serving Hong Kong
      builders and technologists.
    </>,
    <>
      I’m mission-driven. I care about big ideas. I’m usually quite pragmatic. I
      like great aesthetic, well-made food, hand-crafted objects. Hong Kong is
      home, but I’m <DecoratedLink href="#travels">nomadic</DecoratedLink>.
    </>,
  ];

  const work = [
    <>
      Inspect Element is an early-stage software venture builder. We help
      emerging software builders in Hong Kong, by breathing modern tactics and
      global ambition into the local scene. We run a full-service agency, a
      founders incubator, and a seed fund.
    </>,
    <>
      Recently I became passionate about circular design, manufacturing, and
      supply chains. I imagine a world where circular materials are 10x cheaper,
      and ubiquitous in mass production. Ansel is the latest attempt to turn
      this vision into reality.
    </>,
    <>
      Prior to IE, I led product and design at Bowtie, an award-winning virtual
      insurance startup. And I led product and growth at Snapask, a
      venture-backed education startup. I started several mobile apps, worked
      with companies like Clearbanc, Time Auction, and co-founded a charity
      called 24 Hour Race.{" "}
      <DecoratedLink href="#resume">Read more</DecoratedLink>.
    </>,
  ];

  const artifacts = [
    <>
      <DecoratedLink href="/2022/bowtie">
        An essay of my year at Bowtie
      </DecoratedLink>
      , leading product and design between their series A and B. [2022]
    </>,
    <>
      <DecoratedLink href="https://google.com">
        Explore Taiwan from the back of a van
      </DecoratedLink>
      , during a monthlong pandemic roadtrip. [2020]
    </>,
  ];

  const footnotes = (
    <>
      <span>
        <sup>1</sup>
        <DecoratedLink target="_blank" href="https://youtu.be/xmYekD6-PZ8">
          Runnin&apos; Down a Dream
        </DecoratedLink>
      </span>
      <span>
        <sup>2</sup>
        <DecoratedLink
          target="_blank"
          href="https://www.vitsoe.com/us/voice/design-by-vitsoe"
        >
          Design by Vitsœ
        </DecoratedLink>
      </span>
      <span>
        <sup>3</sup>
        <DecoratedLink
          target="_blank"
          href="https://www.eff.org/cyberspace-independence"
        >
          Promise of the Internet
        </DecoratedLink>
      </span>
    </>
  );

  return (
    <section className="homepage-section flex items-center lg:h-[calc(100svh-4rem)] lg:min-h-[560px]">
      <div className="homepage-grid">
        <div
          className="
          col-span-8
          col-start-3 space-y-8
          sm:col-span-10 sm:col-start-2
          sm:flex sm:items-end sm:justify-between
          md:col-span-3 md:col-start-2
          md:block
          lg:col-span-2 lg:col-start-1
          xl:col-span-2 xl:col-start-1"
        >
          <div className="w-fit overflow-hidden rounded-sm sm:w-[calc(100%/19*10)] md:w-auto">
            <Image
              alt=""
              src="/2022-hku.jpg"
              className="w-48 md:w-full"
              width={500}
              height={500}
              priority={true}
            />
          </div>
          <div className="space-y-4 sm:w-[calc(100%/19*9)] md:w-auto">
            <h1
              className="
            inline-block text-2xl
            font-light tracking-tight lg:text-base
            lg:leading-5
            "
            >
              Christopher Hugentobler
              <span className="lg:hidden">&nbsp;</span>
              <br className="hidden lg:block" />
              <span
                className="
                inline-block -translate-x-px scale-90 font-sans leading-6
                "
              >
                姚思陶
              </span>
            </h1>
            <p>{oneLiner}</p>
          </div>
        </div>
        <div
          className="
          col-span-8 col-start-3
          sm:col-span-5 sm:col-start-2
          md:col-span-6 md:col-start-5
          lg:col-span-4 lg:col-start-3
          xl:col-span-4 xl:col-start-3"
        >
          <h2
            className="
          before:-mt-[calc(1.5rem/8)]
          before:block before:h-0 before:w-0
          "
          >
            About
          </h2>
          {about.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
          <h2>Artifacts</h2>
          {artifacts.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
          <BookIsReading />
        </div>
        <div
          className="
          col-span-8 col-start-3 pr-0
          sm:col-span-5 sm:col-start-7 sm:row-start-2 sm:pr-2
          md:col-span-6 md:col-start-5 md:pr-0
          lg:col-span-4 lg:col-start-7 lg:row-start-1
          xl:col-span-4 xl:col-start-7"
        >
          <h2
            className="
          before:-mt-[calc(1.5rem/8)]
          before:block before:h-0 before:w-0
          "
          >
            Work
          </h2>
          {work.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
        <div
          className="
            animate-fade-in col-span-1 col-start-1
            row-span-2 row-start-2 translate-y-2 opacity-0 [animatetion-delay:1000ms] md:row-span-2
            md:row-end-3 md:translate-y-0 md:self-end lg:col-start-11
            lg:row-span-1 lg:translate-y-2 lg:self-auto
          "
        >
          {/* .group and .vertical allows us to style child */}
          <p
            style={{ writingMode: "vertical-rl" }}
            className="vertical group flex space-y-6 font-light lg:float-right"
          >
            {footnotes}
          </p>
        </div>
      </div>
    </section>
  );
}
