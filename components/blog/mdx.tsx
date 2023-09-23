// Custom components for mdx files
// Inserted via mdx-remote

import Image from 'next/image'
import DecoratedLink from '@/components/decorated-link'
import ImageProperties from '@/components/blog/image-handler'
import { ReactNode, FC } from 'react'

const customComponents = {
  h2: (props: any) => (
    <h2 {...props} className="bg-background mt-6 mb-3 text-3xl font-light tracking-tight leading-tight break-inside-avoid break-after-avoid">
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="bg-background mt-6 mb-3 text-xl font-light tracking-tight leading-tight break-inside-avoid break-after-avoid">
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p {...props} className="bg-background mb-3 text-sm leading-5">
      {props.children}
    </p>
  ),
  ol: (props: any) => (
    <ol {...props} className="bg-background mb-3 list-decimal list-inside space-y-1 break-before-avoid">
      {props.children}
    </ol>
  ),
  ul: (props: any) => (
    <ul {...props} className="bg-background mb-3 list-disc list-inside space-y-1 break-before-avoid">
      {props.children}
    </ul>
  ),
  li: (props: any) => (
    <li {...props} className="bg-background text-sm leading-5">
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <DecoratedLink href={props.href} target="_blank">
      {props.children}
    </DecoratedLink>
  ),
  blockquote: (props: any) => (
    <blockquote className="bg-background [&_p]:text-2xl [&_p]:italic font-light tracking-tight [&_p]:leading-7 my-6 break-inside-avoid">
      {props.children}
    </blockquote>
  ),
  img: rsc(async (props: any) => {
    const { base64, height, width } = await ImageProperties(props.src)
    return (
      <figure className="space-y-3 my-6 break-inside-avoid-column">
        <Image
          alt={props.alt}
          className="w-full h-auto grayscale hover:cursor-pointer hover:filter-none"
          height={height}
          placeholder={`data:image/${base64}`}
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={props.src}
          width={width}
        />
        <figcaption className="bg-background text-sm font-light tracking-tight text-center">{props.alt}</figcaption>
      </figure>
    )
  }),
}

export default customComponents

/*
  mdx-remote/rsc components currently don't accept async components
  for example the image component needs to get the placeholder
  in order to generate a typesafe component, we use the following function
  reference: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65003#issuecomment-1497205144
*/
function rsc<P>(fn: (props: P) => ReactNode | Promise<ReactNode>): FC<P> {
  return fn as any
}
