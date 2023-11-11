'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { locations } from '@/data/locations'

export default function Locations() {

  // KNOWN BUG: React Radio button defaultChecked is broken in development
  // NOTE: https://github.com/vercel/next.js/issues/49499
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.querySelectorAll('input[type=radio]').forEach((elem) => {
        if (elem.hasAttribute('checked')) {
          (elem as HTMLInputElement).checked = true
        }
      })
    }
  }, []);

  return (
    <div id="places" className="py-8 md:py-16">
      <header className="
        sticky top-9 py-1 z-10
        grid grid-cols-11 gap-x-3 md:gap-x-8
        bg-neutral-100/75 dark:bg-neutral-900/75 backdrop-blur
        text-sm lg:text-xs items-baseline
        ">
        <h3 className="
        text-lg lg:text-base font-light
        col-start-3 col-span-1 sm:col-start-2 lg:col-start-1">Travels</h3>
        {/* <h3 className="col-start-2 col-span-1">Time</h3>
        <h3 className="col-start-5 col-span-2">Place</h3>
       defaultChecked={i == 0} */}
      </header >
      <ul className="divide-y divide-neutral-200 border-y">
        {locations.map(({ time, place, content }, i) => {
          const city = place.split(',')[0]
          const hash = city.toLowerCase().replace(/\s/g, '-') + '-' + time.toLowerCase().replace(/\s/g, '-')
          return (
            <li key={i} id={hash} className="relative target:scroll-mt-20">
              {/* Input 'name' groups all radio buttons. Setting a constant here allows radio buttons to be toggled without javascript */}
              <input type="radio" name="loc" id={`input-${i}`} value={hash}
                className={`peer appearance-none ${content ? "cursor-pointer" : ""} absolute w-full h-full`
                }
                disabled={content ? false : true}
                onClick={() => (setTimeout(() => { location.href = `#${hash}` }, 250))}
              />
              <label htmlFor={`input-${i}`} className="
              group grid grid-cols-11 gap-x-3 md:gap-x-8 justify-between
              py-3 text-sm text-secondary leading-4
              peer-enabled:peer-hover:text-primary peer-enabled:peer-hover:bg-neutral-50
              peer-checked:text-primary peer-checked:bg-neutral-50
              ">
                <div className="col-span-4 col-start-3
                  sm:col-start-2 md:col-start-2 md:col-span-3
                  lg:col-start-1 lg:col-span-2">
                  <p>{place}</p>
                </div>
                <div className="col-end-11 justify-self-end whitespace-nowrap
                 sm:col-start-7 sm:col-end-auto sm:justify-self-auto
                 md:col-start-5
                 lg:col-start-3
                 ">
                  <p>{time}</p>
                </div>
                {content &&
                  <div className="hidden md:block col-start-7 col-span-4">
                    <span className="line-clamp-1 group:peer-checked:line-clamp-none">{content.text}</span>
                  </div>
                }
              </label>
              {content &&
                <div className="
                grid grid-flow-row-dense grid-cols-12 gap-1
                text-sm h-0 peer-checked:h-auto peer-checked:pb-3
                scale-y-0 peer-checked:scale-y-100 origin-top
                peer-checked:bg-neutral-50
                ">
                  <div className="col-span-7 col-start-5 px-3
                    first-letter:text-6xl first-letter:float-left first-letter:mr-1 first-letter:mt-1 first-letter:-mb-4 first-letter:font-extralight first-letter:leading-none
                    ">
                    {content.text}
                  </div>
                  {content.images &&
                    content.images.map((img, i) => (
                      <Image
                        key={i}
                        className="col-span-4"
                        alt=''
                        src={img}
                        width={500}
                        height={250}
                      />
                    ))
                  }
                </div>
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}
