import { locations } from '@/data/locations'
import Clock from '@/components/clock'
import DecoratedLink from '@/components/decorated-link'
import { ThemeToggle } from '@/components/theme-toggle'

const nav: { [key: string]: string } = {
  'Résumé': '#location',
  'Contact': '#email',
  'Colophon': 'https://github.com'
}

export default function HomeHeader() {
  return (
    <div className="
        z-10 sticky top-1 py-4
        grid grid-cols-11 gap-x-8
        text-sm lg:text-xs font-light leading-none
        opacity-0 animate-fade-in [animation-delay:1000ms]
        ">
      <Nav className="space-x-3 col-start-1" />
      <div className="
          hidden lg:block whitespace-nowrap lg:col-start-7
          ">
        <Clock />
        <CurrentLocation />
      </div>
      <div className="
          whitespace-nowrap justify-self-end col-end-12">
        <Clock className="lg:hidden" />
        <CurrentLocation className="lg:hidden" />
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
    <span {...props}>&nbsp;&nbsp; {currentLocation.place} &nbsp;&nbsp;</span>
  )
}
