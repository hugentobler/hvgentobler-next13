import { cloneElement } from 'react'
import Image from 'next/image'
import DecoratedLink from './DecoratedLink'

export default function AboveFold() {

  const bio = <p>Netizen, Product Leader, Gestaltingenieur&sup1;</p>

  const about = [
    <p>I’m working to build a lasting internet org that embodies the golden rule&sup2;. I’m a founder of Inspect Element, a home for builders and technologists.</p>,
    <p>Typically I’m mission-driven. I care about big ideas. Often I err on the side of pragmatism. I like good aesthetic and well-prepared food. Hong Kong is home, but I’m <DecoratedLink href="#location">nomadic</DecoratedLink>.</p>,
  ]

  const work = [
    <p>Inspect Element is a new software venture builder. We help emerging software builders in Hong Kong, breathing fresh ideas and tactics into the local scene. We run an agency, a founders incubator, and a seed fund.</p>,
    <p>Recently I started something new in circular design and manufacturing. We imagine a world where circular and sustainable materials are 10x cheaper. We want to make these materials ubiquitous in mass production.</p>,
    <p>Prior to IE, I held product and growth leadership roles at several early-stage startups. And I started several startups that failed. I've worked with companies like Bowtie, Clearbanc, Time Auction, 24 Hour Race and <DecoratedLink href="#location">more</DecoratedLink>.</p>,
  ]

  const artifacts = [
    <p>Essay on my time at Bowtie, leading product and design: <DecoratedLink href="">12 months of agile product development</DecoratedLink></p>,
    <p>Travelogue of a monthlong pandemic roadtrip: <DecoratedLink href="https://google.com">Thirty Taiwan vanlife days</DecoratedLink></p>,
    <p>Fledgling ideas on cram school culture and painpoints: <DecoratedLink href="">This is not the education you’re looking for</DecoratedLink></p>,
  ]

  return (
    <div className="flex items-center
      py-3 lg:py-0 lg:h-[calc(100vh-1rem-1.5rem)]">
      <div className="
      grid z-20 lg:-translate-y-4
      grid-cols-11
      gap-x-6
      gap-y-3
      ">
        <div className="
          col-span-8 sm:col-span-5 lg:col-span-2
          col-start-3 sm:col-start-3 lg:col-start-3">
          <Image
            alt=""
            src="/2022-hku.jpg"
            className="w-48 lg:w-full"
            width={500}
            height={500}
          />
          <div>
            <h1 className="
            text-zinc-950 text-base font-light
            bg-zinc-50 inline-block leading-5
            mt-3
            ">Christopher Hugentobler
              <span className="lg:hidden">&nbsp;</span>
              <br className="hidden lg:block" />
              <span className="
                font-sans inline-block -translate-x-px scale-90
                ">姚思陶</span>
            </h1>
            {cloneElement(bio, {
              className: "text-xs bg-zinc-50"
            })}
          </div>
        </div>
        <div className="
          col-span-8 sm:col-span-5 lg:col-span-3 xl:col-span-3
          col-start-3 sm:col-start-3 lg:col-start-5 xl:col-start-5
          row-start-2 lg:row-start-1"
        >
          <h3 className="
          text-zinc-950 text-base font-light
          bg-zinc-50 inline mb-1
          before:block before:h-0 before:w-0 before:-mt-[calc(1.5rem/6)]
          ">About</h3>
          {about.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: "mb-3 text-xs bg-zinc-50",
            })
          ))}
          <h3 className="
          text-zinc-950 text-base font-light
          bg-zinc-50 inline mb-1
          ">Work</h3>
          {work.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: "mb-3 last:mb-0 text-xs bg-zinc-50",
            })
          ))}
        </div>
        <div className="
          col-span-8 sm:col-span-4 lg:col-span-3
          col-start-3 sm:col-start-8 lg:col-start-8
          sm:row-start-2 lg:row-start-1">
          <h3 className="
          text-zinc-950 text-base font-light
          bg-zinc-50 inline mb-1
          before:block before:h-0 before:w-0 before:-mt-[calc(1.5rem/6)]
          ">Artifacts</h3>
          {artifacts.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: "mb-3 text-xs bg-zinc-50",
            })
          ))}
          <h3 className="
            text-zinc-950 text-base font-light
            bg-zinc-50 inline mb-1
          ">Rapture</h3>

        </div>
      </div>
    </div >
  )
}
