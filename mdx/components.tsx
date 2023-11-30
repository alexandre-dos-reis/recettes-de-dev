import CommandItem from "~/components/CommandItem";
import { AutoLinkHeading, HTMLHeading } from "~/components/AutoLinkHeading";
import { Link } from "~/components/Link";

export const components = {
  a: Link,
  C: CommandItem,
  h2: (props: HTMLHeading) => <AutoLinkHeading {...props} type="h2" />,
  h3: (props: HTMLHeading) => <AutoLinkHeading {...props} type="h3" />,
};
