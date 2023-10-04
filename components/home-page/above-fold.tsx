import Image from 'next/image'

import BookIsReading from '@/components/book-is-reading'
import DecoratedLink from '@/components/decorated-link'

export default function AboveFold() {

  const oneLiner = <>Professional researcher<sup className="font-light">1</sup>, creative-engineer<sup className="font-light">2</sup></>

  const about = [
    <>I’m learning to build a lasting internet org that embodies the golden rule<sup className="font-light">3</sup>. I’m a founder of Inspect Element, a home for builders and technologists.</>,
    <>Typically I’m mission-driven. I care about big ideas. Often I err on the side of pragmatism. I like great aesthetic, and well-prepared food. Hong Kong is home, but I’m <DecoratedLink href="#places">nomadic</DecoratedLink>.</>
  ]

  const work = [
    <>Inspect Element is a new software venture builder. We help emerging software builders in Hong Kong, breathing fresh ideas and tactics into the local scene. We run an agency, a founders incubator, and a seed fund.</>,
    <>Recently I started something new in circular design and manufacturing. We imagine a world where circular and sustainable materials are 10x cheaper. We want to make these materials ubiquitous in mass production.</>,
    <>Prior to IE, I held product and growth leadership roles at several early-stage startups. And I started several startups that failed. I’ve worked with companies like Bowtie, Clearbanc, Time Auction, 24 Hour Race and <DecoratedLink href="#work">more</DecoratedLink>.</>,
  ]

  const artifacts = [
    <>Essay on my time at Bowtie, leading product and design: <DecoratedLink href="/2022/bowtie">12 months of agile product development</DecoratedLink></>,
    <>Travelogue of a monthlong pandemic roadtrip: <DecoratedLink href="https://google.com">Thirty Taiwan vanlife days</DecoratedLink></>,
    <>Fledgling ideas on cram school culture and painpoints: <DecoratedLink href="">This is not the education you’re looking for</DecoratedLink></>,
  ]

  const footnotes = <>
    <span><sup>1</sup><DecoratedLink target="_blank" href="https://youtu.be/xmYekD6-PZ8">Runnin&apos; Down a Dream</DecoratedLink></span>
    <span><sup>2</sup><DecoratedLink target="_blank" href="https://www.vitsoe.com/us/voice/design-by-vitsoe">Design by Vitsœ</DecoratedLink></span>
    <span><sup>3</sup><DecoratedLink target="_blank" href="https://www.eff.org/cyberspace-independence">Promise of the Internet</DecoratedLink></span>
  </>

  return (
    <div className="flex items-center
    py-8 md:py-16 lg:py-0 lg:h-[calc(100svh-4rem)] lg:min-h-[560px]">
      <div className="
      grid lg:-translate-y-4
      grid-cols-11 gap-x-3 md:gap-x-8 gap-y-8
      ">
        <div className="
          col-span-8 col-start-3
          sm:col-span-5 sm:col-start-2
          md:col-span-3 md:col-start-2
          lg:col-span-2 lg:col-start-1
          xl:col-span-2 xl:col-start-1">
          <Image
            alt=""
            src="/2022-hku.jpg"
            className="w-48 md:w-full"
            width={500}
            height={500}
            priority={true}
          />
          <div>
            <h1 className="
            text-lg lg:text-base font-light
            inline-block lg:leading-5
            mt-3
            ">Christopher Hugentobler
              <span className="lg:hidden">&nbsp;</span>
              <br className="hidden lg:block" />
              <span className="
                font-sans inline-block -translate-x-px scale-90 leading-6
                ">姚思陶</span>
            </h1>
            <p className="mt-1 text-sm lg:text-xs">{oneLiner}</p>
          </div>
        </div>
        <div className="
          col-span-8 col-start-3
          sm:col-span-5 sm:col-start-2
          md:col-span-6 md:col-start-5
          lg:col-span-4 lg:col-start-3
          xl:col-span-4 xl:col-start-3">
          <h3 className="
          text-lg lg:text-base font-light
          before:block before:h-0 before:w-0 before:-mt-[calc(1.5rem/8)]
          ">About</h3>
          {about.map((e, i) => (
            <p key={i} className="mb-3 text-sm background">{e}</p>
          ))}
          <h3 className="
          text-lg lg:text-base font-light
          inline-block mt-5
          ">Artifacts</h3>
          {artifacts.map((e, i) => (
            <p key={i} className="mb-3 text-sm lg:text-xs">{e}</p>
          ))}
          {/* @ts-expect-error Async Server Component */}
          <BookIsReading />
          <p className="mb-3 text-sm lg:text-xs">And <DecoratedLink href="#reading">more</DecoratedLink>.</p>
        </div>
        <div className="
          col-span-8 col-start-3 pr-0
          sm:col-span-5 sm:col-start-7 sm:row-start-2 sm:pr-2
          md:col-span-6 md:col-start-5 md:pr-0
          lg:col-span-4 lg:col-start-7 lg:row-start-1
          xl:col-span-4 xl:col-start-7">
          <h3 className="
          text-lg lg:text-base font-light
          before:block before:h-0 before:w-0 before:-mt-[calc(1.5rem/8)]
          ">Work</h3>
          {work.map((e, i) => (
            <p key={i} className="mb-3 last:mb-0 text-sm lg:text-xs">{e}</p>
          ))}
        </div>
        <div className="
            col-span-1 col-start-1 lg:col-start-11
            row-span-2 row-start-2 translate-y-2 md:translate-y-0 lg:row-span-1 lg:translate-y-2
            md:row-end-3 md:row-span-2 md:self-end lg:self-auto
            opacity-0 animate-fade-in [animatetion-delay:1000ms]
          ">
          {/* .group and .vertical allows us to style child */}
          <p style={{ writingMode: 'vertical-rl' }} className="text-sm lg:text-xs font-light lg:float-right group vertical space-y-6 flex">{footnotes}</p>
        </div>
      </div>
    </div >
  )
}
