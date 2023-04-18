import Clock from "./Clock"

export default function Header() {
  return (
    <div className="
        sticky top-1
        grid grid-cols-11 gap-x-6 gap-y-3
        my-3 z-10
        text-sm lg:text-xs font-light
        opacity-0 animate-fade-in
        "
      style={{ animationDelay: "1000ms" }}>
      <h3 className="
        col-span-6 sm:col-span-3
        col-start-3 sm:col-start-3
        ">Santa Ana, California</h3>
      <p className="
        col-span-1
        col-start-10 sm:col-start-8 lg:col-start-8">
        <Clock className="float-right sm:float-none" />
      </p>
    </div>
  )
}
