/*
  Individual blog markdown content sits in /blog in project root
  We generate static params by reading all the files in the /blog folder
  These slugs are used with a 'catch-all' dynamic segment, as the user-facing
  blog urls don't include the 'blog' path since it's a 'route group'
*/

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Metadata } from 'next'
// We use next-mdx-remote instead of next/mdx so we can
// put all the blog content outside of app folder
import { MDXRemote } from 'next-mdx-remote/rsc'
import customComponents from '@/components/blog/mdx'
// MDX plugins
import remarkUnwrapImages from 'remark-unwrap-images'

// Generate params for 'catch-all' dynamic segments
// https://nextjs.org/docs/app/api-reference/functions/
// generate-static-params#catch-all-dynamic-segment
export function generateStaticParams() {
  // Retrieve all mdx content from the /blog folder
  const dir = path.join('blog')
  const files = getFilesInFolder(dir)
  // Drop the '/blog' path since it's not actually used in the user-facing slug
  return files.map(filename => ({
    slug: filename.replace('blog/', '').replace('.mdx', '').split('/')
  }))
}

// Set dynamic segments not included in generateStaticParams to 404
// https://nextjs.org/docs/app/api-reference/file-conventions/
// route-segment-config#dynamicparams
export const dynamicParams = false

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const { slug } = params
  const { frontMatter } = getPost(slug.flat().join('/'))
  return {
    title: frontMatter.title,
    description: frontMatter.description,
  }
}

// Based on generated slugs for 'catch-all' segment
// Read and handle content from file system
export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params
  const {
    content,
    datePublished,
    frontMatter,
    wordCount
  } = getPost(slug.flat().join('/'))

  return (
    <article className="
       grid md:block grid-cols-11 gap-y-8 md:gap-x-8
       md:py-8 h-full
       overflow-x-hidden overflow-y-scroll
       md:overflow-x-scroll md:overflow-y-hidden
       scroll-smooth md:scroll-auto
       relative scroll-timeline-y
       md:[column-width:calc((99vw-6rem)/2)]
       lg:[column-width:calc((99vw-8rem)/3)]
       2xl:[column-width:calc(80rem/3)]
       [orphans:1]
      ">
      <div id="top" className="row-start-1"></div>
      <h1 className="
        col-span-8 col-start-3 [column-span:all]
        row-start-1
        mt-16 md:my-10
        bg-background text-5xl font-light tracking-tight
        ">{frontMatter.title}</h1>
      <div className="
        col-span-1 col-start-1 row-start-2
        sm:col-start-2
        lg:h-[calc(100%-5.5rem)]
        md:mb-6 lg:mb-0
        opacity-0 animate-fade-in md:opacity-100 md:animate-none
        " style={{ animationDelay: "1000ms" }}>
        <p className="
          [writing-mode:vertical-rl] md:[writing-mode:unset]
          text-sm lg:text-xs font-light bg-background text-secondary
          ">{datePublished}&nbsp;&nbsp;&nbsp;{wordCount} words</p>
      </div>
      <div className="
        col-span-8 col-start-3 row-start-2
        first-letter:text-8xl first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:-mb-6 first-letter:font-extralight first-letter:leading-none
      ">
        {/* @ts-expect-error server component */}
        <MDXRemote
          source={content}
          components={{ ...customComponents }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkUnwrapImages]
            }
          }}
        />
        <div id="bottom"></div>
      </div>
      <div className="
        sticky z-30 inset-x-0 -top-px h-4 w-full
        row-start-1 col-start-1 col-span-11 backdrop-blur bg-neutral-100/75 dark:bg-neutral-800/75
        flex justify-center animate-reveal animate-scroll-timeline">
        <a href="#top" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M213.66 165.66a8 8 0 0 1-11.32 0L128 91.31l-74.34 74.35a8 8 0 0 1-11.32-11.32l80-80a8 8 0 0 1 11.32 0l80 80a8 8 0 0 1 0 11.32Z"></path></svg>
        </a>
      </div>
      <div className="
        sticky z-30 inset-x-0 -bottom-px h-4 w-full
        row-start-3 col-start-1 col-span-11 backdrop-blur bg-neutral-100/75 dark:bg-neutral-800/75
        flex justify-center animate-reveal animate-scroll-timeline [animation-direction:reverse]">
        <a href="#bottom" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="m213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z"></path></svg>
        </a>
      </div>
    </article >
  )
}

// Read the filesystem and return the content
// Handle the frontmatter with gray matter
function getPost(slug: string) {
  const markdownFile = fs.readFileSync(path.join('blog', slug + '.mdx'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownFile)
  const wordCount = readingTime(content).words.toLocaleString()
  const datePublished = new Date(frontMatter.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  return {
    content,
    datePublished,
    frontMatter,
    slug,
    wordCount
  }
}

// Helper function to recursively read all files in folder
function getFilesInFolder(dir: string, files: string[] = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFilesInFolder(name, files)
    } else {
      // If it is a file, push the full path to the files array
      files.push(name)
    }
  }
  return files
}
