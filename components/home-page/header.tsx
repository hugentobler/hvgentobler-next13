import { locations } from "@/data/locations";
import Clock from "@/components/clock";
import DecoratedLink from "@/components/decorated-link";
import { ThemeToggle } from "@/components/theme-toggle";

const nav: { [key: string]: string } = {
  Résumé: "#location",
  Contact: "#email",
  Colophon: "https://github.com",
};

export default function HomeHeader() {
  return (
    <header
      className="
        animate-fade-in sticky top-0 z-10 flex
        grid-flow-col grid-cols-11 justify-between gap-x-3 bg-neutral-100/75 py-3 text-sm
        font-light leading-none opacity-0
        backdrop-blur [animation-delay:1000ms] dark:bg-neutral-900/75 md:py-4
        lg:grid lg:gap-x-16 lg:text-xs
        "
    >
      <Nav className="flex items-start gap-x-3 gap-y-2 lg:col-span-6" />
      <div
        className="
          hidden gap-x-3 gap-y-2 lg:flex
          "
      >
        <Clock />
        <CurrentLocation className="whitespace-nowrap" />
      </div>
      <div
        className="
          flex flex-wrap justify-end gap-x-3 gap-y-2 justify-self-end lg:col-end-12"
      >
        <Clock className="lg:hidden" />
        <CurrentLocation className="whitespace-nowrap lg:hidden" />
        <div className="inline">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const Nav = ({ ...props }) => (
  <nav {...props}>
    {Object.keys(nav).map((key: string, i: number) => (
      <DecoratedLink key={i} href={nav[key]}>
        {key}
      </DecoratedLink>
    ))}
  </nav>
);

const CurrentLocation = ({ ...props }) => {
  const currentLocation = locations[0];

  return <span {...props}>{currentLocation.place}</span>;
};
