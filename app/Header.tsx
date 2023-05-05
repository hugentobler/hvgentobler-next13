import { cloneElement } from 'react'
import Clock from './Clock'
import { locations } from '@data/locations'
import DecoratedLink from './DecoratedLink'

export default function Header() {
  const currentLocation = locations[0]

  const nav = [
    <DecoratedLink href="#">About</DecoratedLink>,
    <DecoratedLink href="#">Résumé</DecoratedLink>,
    <DecoratedLink href="#">Email</DecoratedLink>,
  ]

  return (
    <>
      <div className="
        z-10 sticky top-1 my-3
        grid grid-cols-11 gap-x-6 gap-y-3
        text-sm lg:text-xs text-zinc-400
        opacity-0 animate-fade-in
        "
        style={{ animationDelay: "1000ms" }}>
        <nav className="hidden lg:block
          col-span-7 col-start-1">
          {nav.map((e, i) => (
            cloneElement(e, {
              key: i,
              className: ""
            })
          ))}
        </nav>
        <div className="col-span-4 col-start-10 sm:col-start-8">
          <span> {currentLocation.place} &nbsp;</span>
          <Clock className="float-right sm:float-none" />
          <div className="float-right"><DecoratedLink href="#">Dark Mode</DecoratedLink></div>
        </div>
      </div>
      <div className="
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
      </div>
    </>
  )
}
