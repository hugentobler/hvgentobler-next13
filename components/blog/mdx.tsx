// Custom components for mdx files
// Inserted via mdx-remote

import Image from "next/image";
import DecoratedLink from "@/components/decorated-link";
import ImageProperties from "@/components/blog/image-handler";
import { ReactNode, FC } from "react";

const customComponents = {
  h2: (props: any) => (
    <h2
      {...props}
      className="break-inside-avoid break-after-avoid text-3xl leading-tight"
    >
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3
      {...props}
      className="break-inside-avoid break-after-avoid text-2xl leading-tight"
    >
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p {...props} className="text-sm leading-5">
      {props.children}
    </p>
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className="list-inside list-decimal break-before-avoid space-y-2"
    >
      {props.children}
    </ol>
  ),
  ul: (props: any) => (
    <ul
      {...props}
      className="list-inside list-disc break-before-avoid space-y-2"
    >
      {props.children}
    </ul>
  ),
  li: (props: any) => (
    <li {...props} className="text-sm leading-5">
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <DecoratedLink href={props.href} target="_blank">
      {props.children}
    </DecoratedLink>
  ),
  blockquote: (props: any) => (
    <blockquote className="!my-8 break-inside-avoid font-light tracking-tight [&_p]:text-2xl [&_p]:italic [&_p]:leading-7">
      {props.children}
    </blockquote>
  ),
  img: rsc(async (props: any) => {
    const { base64, height, width } = await ImageProperties(props.src);
    return (
      <figure className="!my-8 break-inside-avoid-column space-y-4">
        <Image
          alt={props.alt}
          className="h-auto w-full grayscale hover:cursor-pointer hover:filter-none"
          height={height}
          placeholder={`data:image/${base64}`}
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={props.src}
          width={width}
        />
        <figcaption className="text-center text-sm font-light tracking-tight">
          {props.alt}
        </figcaption>
      </figure>
    );
  }),
};

export default customComponents;

/*
  mdx-remote/rsc components currently don't accept async components
  for example the image component needs to get the placeholder
  in order to generate a typesafe component, we use the following function
  reference: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65003#issuecomment-1497205144
*/
function rsc<P>(fn: (props: P) => ReactNode | Promise<ReactNode>): FC<P> {
  return fn as any;
}
