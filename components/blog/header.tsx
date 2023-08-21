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
        z-10 sticky top-1 py-4
        grid grid-cols-11 lg:grid-cols-3 gap-8
        text-sm lg:text-xs font-light leading-none
        opacity-0 animate-fade-in
        "
      style={{ animationDelay: "1000ms" }}>
      <Nav className="
        whitespace-nowrap
        space-x-3 col-span-4 col-start-1
        " />
      <div className="hidden"></div>
      <div className="col-span-7 col-start-5 text-right">
        <Clock />
        <CurrentLocation />
        <div className="inline md:float-right">
          <ThemeToggle />
        </div>
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
    <span {...props}>&nbsp;&nbsp; {currentLocation.place} &nbsp;&nbsp;</span>
  )
}
