import { cloneElement } from 'react'
import Image from 'next/image'
import DecoratedLink from './DecoratedLink'
import BookIsReading from './BookIsReading'

export default function AboveFold() {

  const bio = <p>Netizen, Product Leader, Aspiring Gestaltingenieur&sup1;</p>

  const about = [
    <p key={1}>I’m working to build a lasting internet org that embodies the golden rule&sup2;. I’m a founder of Inspect Element, a home for builders and technologists.</p>,
    <p key={2}>Typically I’m mission-driven. I care about big ideas. Often I err on the side of pragmatism. I like good aesthetic and well-prepared food. Hong Kong is home, but I’m <DecoratedLink href="#location">nomadic</DecoratedLink>.</p>,
  ]

  const work = [
    <p key={1}>Inspect Element is a new software venture builder. We help emerging software builders in Hong Kong, breathing fresh ideas and tactics into the local scene. We run an agency, a founders incubator, and a seed fund.</p>,
    <p key={2}>Recently I started something new in circular design and manufacturing. We imagine a world where circular and sustainable materials are 10x cheaper. We want to make these materials ubiquitous in mass production.</p>,
    <p key={3}>Prior to IE, I held product and growth leadership roles at several early-stage startups. And I started several startups that failed. I’ve worked with companies like Bowtie, Clearbanc, Time Auction, 24 Hour Race and <DecoratedLink href="#location">more</DecoratedLink>.</p>,
  ]

  const artifacts = [
    <p key={1}>Essay on my time at Bowtie, leading product and design: <DecoratedLink href="">12 months of agile product development</DecoratedLink></p>,
    <p key={2}>Travelogue of a monthlong pandemic roadtrip: <DecoratedLink href="https://google.com">Thirty Taiwan vanlife days</DecoratedLink></p>,
    <p key={3}>Fledgling ideas on cram school culture and painpoints: <DecoratedLink href="">This is not the education you’re looking for</DecoratedLink></p>,
  ]

  const footnotes = <p>&sup1; <DecoratedLink href="https://www.vitsoe.com/us/voice/design-by-vitsoe" target="_blank">Design by Vitsœ</DecoratedLink>&nbsp;&nbsp;&sup2; <DecoratedLink href="https://www.eff.org/cyberspace-independence" target="_blank">Promise of the Internet</DecoratedLink></p>

  return (
    <div className="flex items-center
    py-3 lg:py-0 lg:h-[calc(100vh-1rem-1.5rem)] lg:min-h-[560px]">
      <div className="
      grid z-20 lg:-translate-y-4
      grid-cols-11
      gap-x-6
      gap-y-4
      ">
        <div className="
          col-span-8 sm:col-span-5 lg:col-span-2
          col-start-3 sm:col-start-3 lg:col-start-3
          opacity-0 animate-fade-in">
          <Image
            alt=""
            src="/2022-hku.jpg"
            className="w-48 lg:w-full"
            width={500}
            height={500}
            priority={true}
          />
          <div>
            <h1 className="
            text-zinc-950 text-lg lg:text-base font-light
            bg-zinc-50 inline-block leading-5 lg:leading-5
            mt-3
            ">Christopher Hugentobler
              <span className="lg:hidden">&nbsp;</span>
              <br className="hidden lg:block" />
              <span className="
                font-sans inline-block -translate-x-px scale-90
                ">姚思陶</span>
            </h1>
            {cloneElement(bio, {
              className: "text-sm lg:text-xs bg-zinc-50"
            })}
          </div>
        </div>
        <div className="
          col-span-9 sm:col-span-5 lg:col-span-3 xl:col-span-3
          col-start-3 sm:col-start-3 lg:col-start-5 xl:col-start-5
          row-start-2 lg:row-start-1 opacity-0 animate-fade-in"
        >
          <h3 className="
          text-zinc-950 text-lg lg:text-base font-light
          bg-zinc-50 inline
          before:block before:h-0 before:w-0 before:-mt-[calc(1.5rem/6)]
          ">About</h3>
          {about.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: "mb-3 text-sm lg:text-xs bg-zinc-50",
            })
          ))}
          <h3 className="
          text-zinc-950 text-lg lg:text-base font-light
          bg-zinc-50 inline-block mt-1
          ">Work</h3>
          {work.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: "mb-3 last:mb-0 text-sm lg:text-xs bg-zinc-50",
            })
          ))}
        </div>
        <div className="
          col-span-8 sm:col-span-4 lg:col-span-3
          col-start-3 sm:col-start-8 lg:col-start-8
          sm:row-start-2 lg:row-start-1 opacity-0 animate-fade-in">
          <h3 className="
          text-zinc-950 text-lg lg:text-base font-light
          bg-zinc-50 inline
          before:block before:h-0 before:w-0 before:-mt-[calc(1.5rem/6)]
          ">Artifacts</h3>
          {artifacts.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: "mb-3 text-sm lg:text-xs bg-zinc-50",
            })
          ))}
          <h3 className="
            text-zinc-950 text-lg lg:text-base font-light
            bg-zinc-50 inline-block mt-1
          ">Reading</h3>
          {/* @ts-expect-error Async Server Component */}
          <BookIsReading />
          <p className="mb-3 text-sm lg:text-xs bg-zinc-50">And <DecoratedLink href="#reading">more</DecoratedLink>.</p>
        </div>
        <div className="
            col-span-1 lg:self-end
            col-start-1 lg:col-start-11
            row-start-2 lg:row-start-1
            opacity-0 animate-fade-in
          " style={{ animationDelay: "1000ms" }}>
          {cloneElement(footnotes, {
            className: "text-sm lg:text-xs bg-zinc-50 text-zinc-400 lg:float-right group vertical", // .group allows to style child
            style: { writingMode: 'vertical-rl' }
          })}
        </div>
      </div>
    </div >
  )
}
