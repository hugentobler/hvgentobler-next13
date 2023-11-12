/*
  Individual blog markdown content sits in /blog in project root
  We generate static params by reading all the files in the /blog folder
  These slugs are used with a 'catch-all' dynamic segment, as the user-facing
  blog urls don't include the 'blog' path since it's a 'route group'
*/

import { Metadata } from "next";
import { getFilesInFolder, getPost } from "../import-content";
import { generateJsonLd } from "../generate-jsonLd";
// We use next-mdx-remote instead of next/mdx so we can
// put all the blog content outside of app folder
import { MDXRemote } from "next-mdx-remote/rsc";
import customComponents from "@/components/blog/mdx";
// MDX plugins
import remarkUnwrapImages from "remark-unwrap-images";

// Generate params for 'catch-all' dynamic segments
// https://nextjs.org/docs/app/api-reference/functions/
// generate-static-params#catch-all-dynamic-segment
export function generateStaticParams() {
  // Retrieve all mdx content from the /blog folder
  const files = getFilesInFolder("blog");
  // Drop the '/blog' path since it's not actually used in the user-facing slug
  return files.map((filename) => ({
    slug: filename.replace("blog/", "").replace(".mdx", "").split("/"),
  }));
}

// Set dynamic segments not included in generateStaticParams to 404
// https://nextjs.org/docs/app/api-reference/file-conventions/
// route-segment-config#dynamicparams
export const dynamicParams = false;

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const { slug } = params;
  const { description, title } = getPost(slug.flat().join("/"));
  return {
    metadataBase: new URL("https://hvgentobler.com"),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: "https://hvgentobler.com",
      siteName: "Christopher Hugentobler",
      images: [
        {
          height: 630,
          url: `/og/${title}`,
          type: "image/png",
          width: 1200,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

// Based on generated slugs for 'catch-all' segment
// Read and handle content from file system
export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const {
    content,
    dateModified,
    datePublished,
    datePublishedText,
    description,
    title,
    wordCount,
  } = getPost(slug.flat().join("/"));

  const jsonLd = generateJsonLd(
    dateModified,
    datePublished,
    description,
    title,
    slug.flat().join("/"),
  );

  return (
    <article
      className="
       scroll-timeline-y md:scroll-timeline-x relative grid h-full w-full
       grid-cols-11 gap-y-8 overflow-x-hidden
       overflow-y-scroll scroll-smooth [orphans:1] md:block
       md:gap-x-8 md:overflow-y-hidden md:overflow-x-scroll md:scroll-auto
       md:py-8
       md:[column-width:calc((99vw-6rem)/2)]
       lg:[column-width:calc((99vw-8rem)/3)]
       2xl:[column-width:calc(80rem/3)]
      "
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div id="top" className="row-start-1"></div>
      <h1
        className="
        bg-background col-span-8 col-start-3
        row-start-1
        mt-16 text-5xl
        font-light tracking-tight [column-span:all] md:my-10
        "
      >
        {title}
      </h1>
      <div
        className="
        animate-fade-in col-span-1 col-start-1
        row-start-2
        opacity-0
        sm:col-start-2 md:mb-6
        md:animate-none md:opacity-100 lg:mb-0 lg:h-[calc(100%-8rem)]
        "
      >
        <p
          className="
          bg-background text-sm
          font-light [writing-mode:vertical-rl] md:[writing-mode:unset] lg:text-xs
          "
        >
          {datePublishedText}&nbsp;&nbsp;&nbsp;{wordCount} words
        </p>
      </div>
      <div
        className="
        col-span-8 col-start-3 row-start-2
        first-letter:float-left first-letter:-mb-6 first-letter:mr-2 first-letter:mt-1 first-letter:text-8xl first-letter:font-extralight first-letter:leading-none
      "
      >
        <MDXRemote
          source={content}
          components={{ ...customComponents }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkUnwrapImages],
            },
          }}
        />
        <div id="bottom"></div>
      </div>
      <div
        className="
        animate-fade-in sticky inset-x-0 -top-px z-30
        col-span-11 col-start-1 row-start-1
        flex h-4 w-full
        justify-center opacity-0 backdrop-blur md:hidden"
      >
        <a
          href="#top"
          aria-label="top"
          className="
          animate-reveal animate-scroll-timeline w-full
          bg-neutral-100/75 dark:bg-neutral-900/75
        "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M213.66 165.66a8 8 0 0 1-11.32 0L128 91.31l-74.34 74.35a8 8 0 0 1-11.32-11.32l80-80a8 8 0 0 1 11.32 0l80 80a8 8 0 0 1 0 11.32Z"
            ></path>
          </svg>
        </a>
      </div>
      <div
        className="
        animate-fade-in sticky inset-x-0 -bottom-px z-30
        col-span-11 col-start-1 row-start-3
        flex h-4 w-full
        justify-center opacity-0 backdrop-blur md:hidden"
      >
        <a
          href="#bottom"
          aria-label="bottom"
          className="
          animate-reveal animate-scroll-timeline w-full
          bg-neutral-100/75 [animation-direction:reverse]  dark:bg-neutral-900/75
        "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="m213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z"
            ></path>
          </svg>
        </a>
      </div>
    </article>
  );
}
