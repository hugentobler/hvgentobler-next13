'use client'

import { useEffect } from 'react';
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
        col-start-1 col-span-1">Travels</h3>
        <h3 className="col-start-2 col-span-1">Time</h3>
        <h3 className="col-start-5 col-span-2">Place</h3>
      </header >
      <ul className="divide-y divide-zinc-150 border-t border-zinc-200">
        {locations.map(({ time, place, content }, i) => {
          const city = place.split(',')[0]
          const hash = city.toLowerCase().replace(/\s/g, '-') + '-' + time.toLowerCase().replace(/\s/g, '-')
          return (
            <li key={i} id={hash} className="group relative">
              {/* Input 'name' groups all radio buttons. Setting a constant here allows radio buttons to be toggled without javascript */}
              <input type="radio" name="loc" id={`input-${i}`} value={hash}
                className={`peer appearance-none ${content ? "cursor-pointer" : ""} absolute w-full h-full`
                }
                defaultChecked={i === 0}
                disabled={content ? false : true}
                onClick={() => (setTimeout(() => { location.href = `#${hash}` }, 400))}
              />
              <label htmlFor={`input-${i}`} className="
              grid grid-cols-11 gap-x-3 md:gap-x-8
              py-3 text-sm text-secondary leading-4
              peer-enabled:peer-hover:text-primary peer-enabled:peer-hover:bg-background
              peer-checked:text-primary peer-checked:bg-zinc-50
              ">
                <div className="col-span-3 col-start-2">
                  <p>{time}</p>
                </div>
                <div className="col-span-7 col-start-5">
                  <p>{place}</p>
                </div>
              </label>
              {content &&
                <div className="
                grid grid-cols-11 gap-x-3 md:gap-x-8
                py-3 text-sm
                h-0 peer-checked:h-auto
                scale-y-0 peer-checked:scale-y-100 origin-top
                ">
                  <div className="col-span-7 col-start-5
                    first-letter:text-6xl first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:-mb-6 first-letter:font-extralight first-letter:leading-none
                    ">
                    {content.text}
                  </div>
                  {content.images &&
                    <div className="col-span-4 col-start-1">
                      {content.images.map((img, i) => (
                        <Image
                          key={i}
                          className="col-span-2"
                          alt=''
                          src={img}
                          width={500}
                          height={250}
                        />
                      ))}
                    </div>
                  }
                </div>
              }
              {/* {content &&
                <div className="grid grid-cols-7 gap-x-6
                h-0 peer-checked:h-auto
                bg-zinc-50 text-xs
                py-0 peer-checked:py-1
                opacity-0 peer-checked:opacity-100
                scale-y-0 peer-checked:scale-y-100 origin-top
                transition-none duration-200 ease-linear peer-checked:transition"
                >
                  {content.text &&
                    <>
                      <p className="col-start-4 col-span-2">{content.text}</p>
                    </>
                  }
                  {content.images &&
                    content.images.map((img, i) => (
                      <Image
                        key={i}
                        className="col-span-2"
                        alt=''
                        src={img}
                        width={500}
                        height={250}
                      />
                    ))
                  }
                </div>
              } */}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
