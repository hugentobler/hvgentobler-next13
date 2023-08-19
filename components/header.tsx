import { locations } from '@/data/locations'
import Clock from './clock'
import DecoratedLink from '@/components/decorated-link'
import { ThemeToggle } from '@/components/theme-toggle'

const nav: { [key: string]: string } = {
  'About': '/',
  'Résumé': '/blog',
  'Email': '/email'
}

export default function Header() {
  return (
    <>
      <div className="
        z-10 sticky top-1 my-4
        grid grid-cols-11 gap-x-8 gap-y-3
        text-sm lg:text-xs font-light leading-none
        opacity-0 animate-fade-in
        "
        style={{ animationDelay: "1000ms" }}>
        <Nav className="space-x-3 hidden lg:block
          col-span-6 col-start-1" />
        <div className="
          hidden lg:block
          lg:col-span-3 lg:col-start-7
          xl:col-span-3 xl:col-start-7
          ">
          <Clock />
          <CurrentLocation />
        </div>
        <div className="
          col-span-8 col-end-11
          sm:col-end-12
          md:col-end-11
          lg:col-span-1 lg:col-start-11 lg:col-end-auto">
          <div className="float-right">
            <Clock className="lg:hidden" />
            <CurrentLocation className="lg:hidden" />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="
        z-50 fixed left-1/2 -translate-x-1/2 bottom-4 lg:hidden
        p-2
        bg-zinc-50 border border-solid border-zinc-400
        ">
        <span>Menu</span>
      </div>
      {/* <div className="
        z-50 fixed inset-x-0 bottom-0 lg:hidden
        bg-white opacity-0 animate-fade-in
        text-sm lg:text-xs text-zinc-400
        "
        style={{ animationDelay: "1000ms" }}>
        <nav>
          {nav.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: ""
            })
          ))}
        </nav>
      </div> */}
    </>
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
