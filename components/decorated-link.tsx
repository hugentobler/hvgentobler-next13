import Link from 'next/link'

const styles = `
  bg-gradient-to-r from-zinc-300 to-zinc-300 group-[.vertical]:bg-gradient-to-b
  bg-[length:100%_1px] bg-[left_bottom] bg-no-repeat
  group-[.vertical]:bg-[length:1px_100%] group-[.vertical]:bg-[left_top]
  hover:from-zinc-600 hover:to-zinc-600
  hover:animate-underline group-[.vertical]:hover:animate-underline-vertical
  focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:ring-offset-1
  `

export default function DecoratedLink({
  href,
  target,
  children,
  ...props
}: {
  href: string,
  target?: string,
  children?: React.ReactNode
}) {
  if (href.charAt(0) == '#') {
    /* Looks like Next13 doesn't support scroll=false */
    return (
      <a href={href} className={styles} >
        {children}
      </a>
    )
  } else return (
    <Link href={href} target={target} className={styles} {...props}>
      {children}
    </Link>
  )
}
