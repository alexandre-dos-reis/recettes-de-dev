"use client";

import { useEffect, useState } from "react";
import { BsSun, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const DARK = "dark";
const LIGHT = "light";
const COLOR_THEME = "theme";

export const ToggleTheme = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (
      localStorage.theme === DARK ||
      (!(COLOR_THEME in localStorage) &&
        window.matchMedia(`(prefers-color-scheme: ${DARK})`).matches)
    ) {
      document.documentElement.classList.add(DARK);
      setIsDarkModeEnabled(true);
    } else {
      document.documentElement.classList.remove(DARK);
      setIsDarkModeEnabled(false);
    }
  }, []);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          // if set via local storage previously
          if (localStorage.getItem(COLOR_THEME)) {
            if (localStorage.getItem(COLOR_THEME) === LIGHT) {
              document.documentElement.classList.add(DARK);
              localStorage.setItem(COLOR_THEME, DARK);
              setIsDarkModeEnabled(true);
            } else {
              document.documentElement.classList.remove(DARK);
              localStorage.setItem(COLOR_THEME, LIGHT);
              setIsDarkModeEnabled(false);
            }
            // if NOT set via local storage previously
          } else {
            if (document.documentElement.classList.contains(DARK)) {
              document.documentElement.classList.remove(DARK);
              localStorage.setItem(COLOR_THEME, LIGHT);
              setIsDarkModeEnabled(false);
            } else {
              document.documentElement.classList.add(DARK);
              localStorage.setItem(COLOR_THEME, DARK);
              setIsDarkModeEnabled(true);
            }
          }
        }}
      >
        {isDarkModeEnabled ? <BsSun className="text-xl" /> : <BsFillMoonFill />}
      </button>
    </div>
  );
};
