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
        z-10 sticky top-0 py-3 md:py-4
        flex justify-between lg:grid grid-cols-11 grid-flow-col gap-x-3 lg:gap-x-8
        bg-neutral-100/75 dark:bg-neutral-900/75 backdrop-blur
        text-sm lg:text-xs font-light leading-none
        opacity-0 animate-fade-in [animation-delay:1000ms]
        ">
      <Nav className="flex items-start gap-x-3 gap-y-2 lg:col-span-6" />
      <div className="
          hidden lg:flex gap-x-3 gap-y-2
          ">
        <Clock />
        <CurrentLocation className="whitespace-nowrap" />
      </div>
      <div className="
          flex flex-wrap gap-x-3 gap-y-2 lg:col-end-12 justify-end justify-self-end">
        <Clock className="lg:hidden" />
        <CurrentLocation className="whitespace-nowrap lg:hidden" />
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
