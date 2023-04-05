import Link from 'next/link'

const styles = `
  underline underline-offset-2 hover:no-underline decoration-zinc-300
  bg-gradient-to-r from-zinc-600 to-zinc-600
  bg-[length:0_0] bg-[left_bottom] bg-no-repeat
  transition-[background-size] duration-300 hover:bg-[length:100%_1px]
  `

export default function DecoratedLink({
  href,
  children
}: {
  href: string,
  children?: React.ReactNode
}) {
  if (href.charAt(0) == '#') {
    /* Looks like Next13 doesn't support scroll=false */
    return (
      <a href={href} data-text={children}
        className={styles} >
        {children}
      </a >
    )
  } else return (
    <Link href={href} data-text={children}
      className={styles}>
      {children}
    </Link>
  )
}
