import { locations } from '@/data/locations'
import Clock from '@/components/clock'
import DecoratedLink from '@/components/decorated-link'
import { ThemeToggle } from '@/components/theme-toggle'

const nav: { [key: string]: string } = {
  'Christopher Hugentobler': '/',
}

export default function BlogHeader() {
  return (
    <div className="
        z-10 sticky top-0 py-3 md:py-4
        grid grid-cols-11 gap-x-3 lg:gap-x-8
        text-sm lg:text-xs font-light leading-none
        opacity-0 animate-fade-in [animation-delay:1000ms]
        ">
      <Nav className="col-span-4 flex flex-wrap gap-x-3 gap-y-2 whitespace-nowrap self-baseline" />
      <div className="justify-self-end col-span-7 sm:col-end-11 md:col-end-12 flex flex-wrap-reverse justify-end gap-x-3 gap-y-2">
        <Clock />
        <CurrentLocation />
        <div className="inline"><ThemeToggle /></div>
      </div>
    </div>
  )
}

const Nav = ({ ...props }) => (
  <nav {...props}>
    {Object.keys(nav).map((key: string, i: number) => (
      <DecoratedLink key={i} href={nav[key]}>
        {key}
      </DecoratedLink>
    ))}
  </nav>
)

const CurrentLocation = ({ ...props }) => {
  const currentLocation = locations[0]

  return (
    <span {...props}>{currentLocation.place}</span>
  )
}
