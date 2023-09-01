// Custom components for mdx files
// Inserted via mdx-remote

import Image from 'next/image'
import DecoratedLink from '@/components/decorated-link'
import ImageProperties from '@/components/blog/image-handler'

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
    <ol {...props} className="bg-background list-decimal list-inside break-inside-avoid-column">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="bg-background mb-3 text-sm leading-5">
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <DecoratedLink href={props.href} target="_blank">
      {props.children}
    </DecoratedLink>
  ),
  img: async function(props: any) {
    const { base64, height, width } = await ImageProperties(props.src)
    return (
      <figure className="space-y-3 my-6 break-inside-avoid-column">
        <Image
          alt={props.alt}
          className="w-full h-auto grayscale hover:cursor-pointer hover:filter-none"
          height={height}
          placeholder={`data:image/${base64}`}
          src={props.src}
          width={width}
        />
        <figcaption className="bg-background text-sm font-light tracking-tight text-center">{props.alt}</figcaption>
      </figure>
    )
  },
}

export default customComponents
