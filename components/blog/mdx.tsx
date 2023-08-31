// Custom components for mdx files
// Inserted via mdx-remote

import Image from 'next/image'

const customComponents = {
  h2: (props: any) => (
    <h2 {...props} className="bg-background mt-6 mb-3 text-3xl font-light tracking-tight leading-tight">
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="bg-background mt-6 mb-3 text-xl font-light tracking-tight leading-tight ">
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p {...props} className="bg-background mb-3 text-sm leading-5">
      {props.children}
    </p>
  ),
  ol: (props: any) => (
    <ol {...props} className="bg-background list-decimal list-inside">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="bg-background mb-3 text-sm leading-5">
      {props.children}
    </li>
  ),
  img: (props: any) => (
    <figure className="space-y-3 my-6">
      <Image
        alt={props.alt}
        className="w-full h-auto grayscale hover:cursor-pointer hover:filter-none"
        height="200"
        priority={false}
        src={props.src}
        width="300"
      />
      <figcaption className="bg-background text-sm font-light tracking-tight text-center">{props.alt}</figcaption>
    </figure>
  )
}

export default customComponents
