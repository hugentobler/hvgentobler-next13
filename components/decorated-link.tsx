import Link from 'next/link'

export default function DecoratedLink({
  href,
  target,
  children,
  onClick,
  className,
  ...props
}: {
  href: string,
  target?: string,
  children?: React.ReactNode,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  className?: string,
}) {
  const styles = `
    bg-gradient-to-r from-secondary to-secondary group-[.vertical]:bg-gradient-to-b
    bg-[length:100%_1px] bg-[left_bottom] bg-no-repeat
    group-[.vertical]:bg-[length:1px_100%] group-[.vertical]:bg-[left_top]
    hover:from-primary hover:to-primary
    hover:animate-underline group-[.vertical]:hover:animate-underline-vertical
    focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
    ${className}`

  if (href.charAt(0) == '#') {
    /* Looks like Next13 doesn't support scroll=false */
    return (
      <a href={href} className={styles} onClick={onClick} >
        {children}
      </a>
    )
  } else return (
    <Link href={href} target={target} className={styles} onClick={onClick} {...props}>
      {children}
    </Link>
  )
}
