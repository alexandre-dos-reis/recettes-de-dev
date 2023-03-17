import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "~/utils/cn";
import { ToggleTheme } from "./ToggleTheme";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Header = (p: Props) => {
  return (
    <header {...p} className={cn(p.className, "")}>
      <section
        className={cn(
          "flex justify-between py-3 px-10",
          "text-gray-200",
          "bg-black dark:bg-black"
        )}
      >
        <div>Recettes de dev </div>
        <ToggleTheme />
      </section>
    </header>
  );
};
