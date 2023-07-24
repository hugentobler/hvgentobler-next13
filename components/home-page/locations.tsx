'use client'

import Image from 'next/image'
import { locations } from '@/data/locations'

export default function Locations() {
  return (
    <div id="location" className="my-10">
      <header className="sticky top-0 py-1 z-10">
        <div className="
          grid grid-cols-7 gap-x-6
          text-zinc-900 text-xs font-light">
          <h3 className="col-start-2 col-span-2 bg-zinc-100">Travels</h3>
          <h3 className="col-span-2 bg-zinc-100">Time</h3>
          <h3 className="col-span-2 bg-zinc-100">Place</h3>
        </div>
      </header >
      <ul className="divide-y divide-zinc-150 border-t border-zinc-200">
        {locations.map(({ time, place, content }, i) => (
          <li key={i} id={time.toLowerCase().replace(/\s/g, '-')} className="group relative">
            <input type="radio" name="loc"
              className={`peer appearance-none ${content ? "cursor-pointer" : ""}
                absolute w-full h-full`
              }
              disabled={content ? false : true}
              onClick={() => (setTimeout(() => { location.href = `#${time.toLowerCase().replace(/\s/g, '-')}` }, 400))}
            />
            <div className="
              grid grid-cols-7 gap-x-6 py-1
              text-xs font-light
              peer-enabled:peer-hover:text-zinc-900 peer-enabled:peer-hover:bg-zinc-50
              peer-checked:text-zinc-900 peer-checked:bg-zinc-50
              ">
              <h3 className="col-start-4 col-span-2">{time}</h3>
              <h3 className="col-span-2">{place}</h3>
            </div>
            {content &&
              <div className="grid grid-cols-7 gap-x-6 py-1
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
            }
          </li>
        ))}
      </ul>
    </div>
  )
}
