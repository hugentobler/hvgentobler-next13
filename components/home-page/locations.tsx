"use client";

import Image from "next/image";
import { locations } from "@/data/locations";

export default function Locations() {
  // KNOWN BUG: React Radio button defaultChecked is broken in development
  // NOTE: https://github.com/vercel/next.js/issues/49499
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") {
  //     document.querySelectorAll("input[type=radio]").forEach((elem) => {
  //       if (elem.hasAttribute("checked")) {
  //         (elem as HTMLInputElement).checked = true;
  //       }
  //     });
  //   }
  // }, []);

  return (
    <div id="places" className="py-8 md:py-16">
      <header className="homepage-grid homepage-header top-11 py-1 md:top-12">
        <h2
          className="
        col-span-1 col-start-3 mb-0 sm:col-start-2 lg:col-start-1"
        >
          Travels
        </h2>
      </header>
      <ul className="divide-y divide-neutral-200 border-y">
        {locations.map(({ time, place, content }, i) => {
          const city = place.split(",")[0];
          const hash =
            city.toLowerCase().replace(/\s/g, "-") +
            "-" +
            time.toLowerCase().replace(/\s/g, "-");
          return (
            <li key={i} id={hash} className="relative target:scroll-mt-20">
              {/* Input 'name' groups all radio buttons. Setting a constant here allows radio buttons to be toggled without javascript */}
              <input
                type="radio"
                name="loc"
                id={`input-${i}`}
                value={hash}
                className={`peer appearance-none ${
                  content ? "cursor-pointer" : ""
                } absolute h-full w-full`}
                defaultChecked={i == 0}
                disabled={content ? false : true}
                onClick={() =>
                  setTimeout(() => {
                    location.href = `#${hash}`;
                  }, 250)
                }
              />
              <label
                htmlFor={`input-${i}`}
                className="
              text-secondary peer-enabled:peer-hover:text-primary peer-checked:text-primary group grid grid-cols-11
              justify-between gap-x-3 py-3 text-sm
              leading-4 peer-checked:bg-neutral-50
              peer-enabled:peer-hover:bg-neutral-50 md:gap-x-8
              "
              >
                <div
                  className="col-span-4 col-start-3
                  sm:col-start-2 md:col-span-3 md:col-start-2
                  lg:col-span-2 lg:col-start-1"
                >
                  <p>{place}</p>
                </div>
                <div
                  className="col-end-11 justify-self-end whitespace-nowrap
                 sm:col-start-7 sm:col-end-auto sm:justify-self-auto
                 md:col-start-5
                 lg:col-start-3
                 "
                >
                  <p>{time}</p>
                </div>
                {content && (
                  <div className="col-span-4 col-start-7 hidden md:block">
                    <span className="group:peer-checked:line-clamp-none line-clamp-1">
                      {content.text}
                    </span>
                  </div>
                )}
              </label>
              {content && (
                <div
                  className="
                grid h-0 origin-top scale-y-0
                grid-flow-row-dense grid-cols-12 gap-1 text-sm
                peer-checked:h-auto peer-checked:scale-y-100 peer-checked:bg-neutral-50
                peer-checked:pb-3
                "
                >
                  <div
                    className="col-span-7 col-start-5 px-3
                    first-letter:float-left first-letter:-mb-4 first-letter:mr-1 first-letter:mt-1 first-letter:text-6xl first-letter:font-extralight first-letter:leading-none
                    "
                  >
                    {content.text}
                  </div>
                  {content.images &&
                    content.images.map((img, i) => (
                      <Image
                        key={i}
                        className="col-span-4"
                        alt=""
                        src={img}
                        width={500}
                        height={250}
                      />
                    ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
