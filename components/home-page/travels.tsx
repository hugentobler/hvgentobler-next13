"use client";

import Image from "next/image";
import { locations, ContentItem } from "@/data/locations";

export default function Travels() {
  return (
    <section id="travels" className="homepage-section">
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
                  text-secondary peer-enabled:peer-hover:text-primary peer-checked:text-primary homepage-grid group justify-between
                  py-3 peer-checked:bg-neutral-50
                  peer-enabled:peer-hover:bg-neutral-50
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
                  <>
                    <div className="col-span-4 col-start-7 hidden md:block">
                      <span className="group:peer-checked:line-clamp-none line-clamp-1">
                        {content.text}
                      </span>
                    </div>
                  </>
                )}
              </label>
              {content && (
                <div
                  className="
                    homepage-grid *:col-span-8 *:col-start-3
                    *:sm:col-span-5 odd:*:sm:col-start-2 even:*:sm:col-start-7 odd:*:md:col-span-4 odd:*:md:col-start-1 even:*:md:col-span-7 even:*:md:col-start-5 odd:*:lg:col-span-6 even:*:lg:col-span-5
                    h-0 origin-top scale-y-0
                    peer-checked:h-auto peer-checked:scale-y-100 peer-checked:bg-neutral-50
                    peer-checked:pb-8 peer-checked:pt-4
                  "
                >
                  <RenderContentItems contentItems={content} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const RenderContentItems = ({
  contentItems,
}: {
  contentItems: ContentItem[];
}) => {
  return (
    <>
      {contentItems.map((item, index) => {
        if (item.img) {
          return (
            <div key={index} className="overflow-hidden rounded-sm">
              <Image
                src={`/blog/${item.img}`}
                alt={item.img}
                width={500}
                height={250}
              />
            </div>
          );
        } else if (item.p) {
          return (
            <p
              key={index}
              className="mb-0 first-of-type:first-letter:float-left first-of-type:first-letter:-mb-4 first-of-type:first-letter:mr-1 first-of-type:first-letter:mt-1 first-of-type:first-letter:text-6xl first-of-type:first-letter:font-extralight
              first-of-type:first-letter:leading-none"
            >
              {item.p}
            </p>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};
