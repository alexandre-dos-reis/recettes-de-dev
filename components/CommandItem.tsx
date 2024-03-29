import { ReactNode } from "react";
import { monoFont } from "~/styles/fonts";
import { cn } from "~/utils/cn";

interface Props {
  i: string; // The command
  children: ReactNode; // The description
  env?: string; // The environment for the user, ex: $
}

export const CommandItem = (p: Props) => (
  <section className="mb-10 w-full rounded-lg">
    {p.children ? <div className="mb-3">{p.children}</div> : null}
    <div className="flex items-center gap-3">
      {/* Todo, add copy */}
      <code
        className={cn(
          "bg-slate-800",
          "dark:bg-black dark:border-gray-600",
          "border whitespace-nowrap overflow-x-auto overflow-y-hidden rounded-lg",
          "w-full",
          "text-gray-100 p-2",
          "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300",
          monoFont.className,
        )}
      >
        <span className="text-gray-500">{p.env ?? "$"}</span> {p.i}
      </code>
    </div>
  </section>
);
