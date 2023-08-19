import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { MDXRemote } from 'next-mdx-remote/rsc'

/*
  Individual blog markdown content sits in /blog in project root
  We generate static params by reading all the files in the /blog folder
  These slugs are used with a 'catch-all' dynamic segment, as the user-facing
  blog urls don't include the 'blog' path
*/


// Generate params for 'catch-all' dynamic segments
// https://nextjs.org/docs/app/api-reference/functions/
// generate-static-params#catch-all-dynamic-segment
export function generateStaticParams() {
  // Retrieve all mdx content from the /blog folder
  const dir = path.join('blog')
  const files = getFilesInFolder(dir)
  console.log(files)
  // Drop the '/blog' path since it's not actually used in the slug
  return files.map(filename => ({
    slug: filename.replace('blog/', '').replace('.mdx', '').split('/')
  }))
}

export default function Page({ params }: { params: { slug: string[] } }) {
  // Slugs generated for catch all segments are an array of strings
  const { slug } = params
  const {
    frontMatter,
    content
  } = getPost(slug.flat().join('/'))

  return (
    <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto'>
      <h1>{frontMatter.title}</h1>
      {/* @ts-expect-error Server Component*/}
      <MDXRemote source={content} />
    </article>
  )
}

function getPost(slug: string) {
  const markdownFile = fs.readFileSync(path.join('blog', slug + '.mdx'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownFile)
  return {
    frontMatter,
    slug,
    content
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
