import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "~/utils/cn";
import { ToggleTheme } from "./ToggleTheme";
import { Link } from "./Link";
import { headerFont } from "~/styles/fonts";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Header = (p: Props) => {
  return (
    <header {...p} className={cn(p.className, "")}>
      <section
        className={cn(
          "flex justify-between items-center h-full py-3 px-10",
          "text-gray-200",
          "bg-slate-800 dark:bg-black"
        )}
      >
        <div className={cn(headerFont.className, "text-3xl")}>
          <Link href="/">Recettes de dev 👨🏻‍🍳</Link>
        </div>
        <ToggleTheme />
      </section>
    </header>
  );
};
