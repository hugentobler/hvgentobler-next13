"use client";

import { useEffect, useState, useCallback } from "react";
import { themeEffect } from "./theme-effect";
import DecoratedLink from "./decorated-link";

// we could store user preferences across sessions
// but in this version, we don't, every session starts with client preference

export function ThemeToggle() {
  // color scheme preference, null implies 'auto'
  const [preference, setPreference] = useState<undefined | null | string>(null);
  // color scheme to show
  const [currentTheme, setCurrentTheme] = useState<null | string>(null);
  // system preference
  const [systemTheme, setSystemTheme] = useState<null | string>(null);

  // when device preference changes, handle update theme
  const onMediaChange = useCallback(() => {
    const current = themeEffect();
    setCurrentTheme(current);
  }, []);

  useEffect(() => {
    // update theme preference
    setPreference(localStorage.getItem("theme"));
    // check the loaded theme, set theme
    setCurrentTheme(themeEffect());
    // set and cleanup listener on device preferred color scheme
    // save system media to state
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(matchMedia.matches ? "dark" : "light");
    matchMedia.addEventListener("change", onMediaChange);
    return () => matchMedia.removeEventListener("change", onMediaChange);
    // when device preference changes, update all
  }, [onMediaChange]);

  // user preference is stored and read from localStorage
  // when localStorage is updated, update preference state
  const onStorageChange = useCallback(
    (event: StorageEvent) => {
      console.log(event);
      if (event.key === "theme") setPreference(event.newValue);
    },
    [setPreference],
  );
  // whenever device preference changes, update theme
  useEffect(() => {
    // console.log(`set ${themeEffect()} theme`)
    setCurrentTheme(themeEffect());
  }, [preference]);

  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  });

  return (
    <DecoratedLink
      className="capitalize"
      href="#"
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        let newPreference: string | null =
          currentTheme === "dark" ? "light" : "dark";
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        if (preference !== null && systemTheme === currentTheme) {
          newPreference = null;
          localStorage.removeItem("theme");
        } else {
          localStorage.setItem("theme", newPreference);
        }
        setPreference(newPreference);
      }}
    >
      <p className="font-light">
        {preference == null
          ? currentTheme == "dark"
            ? "light"
            : "dark"
          : systemTheme == currentTheme
            ? "auto"
            : currentTheme == "dark"
              ? "light"
              : "dark"}
      </p>
    </DecoratedLink>
  );
}
