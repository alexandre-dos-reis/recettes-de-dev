import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CommandItem } from "~/components/CommandItem";

export const components = {
  h1: (
    p: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  ) => (
    <h1 {...p} style={{ backgroundColor: "red" }}>
      {p.children}
    </h1>
  ),
  C: CommandItem,
};
