import { locations } from "@/data/locations";
import Clock from "@/components/clock";
import DecoratedLink from "@/components/decorated-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav: { [key: string]: string } = {
  Résumé: "#location",
  Contact: "#email",
  Colophon: "https://github.com",
};

export default function HomeHeader() {
  return (
    <header
      className="
        lg:homepage-grid homepage-header animate-fade-in
        top-0 flex grid-flow-col
        justify-between opacity-0 [animation-delay:1000ms]
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
        <p className="font-light">{key}</p>
      </DecoratedLink>
    ))}
  </nav>
);

const CurrentLocation = ({ className }: { className?: string }) => {
  const currentLocation = locations[0];

  return (
    <p className={cn(className, "font-light", "mb-0")}>
      {currentLocation.place}
    </p>
  );
};
