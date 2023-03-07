import NextLink from "next/link";
import { ComponentPropsWithRef } from "react";

// https://beta.nextjs.org/docs/configuring/typescript#statically-typed-links

interface Props extends ComponentPropsWithRef<typeof NextLink> {}

export const Link = ({ href, ...p }: Props) => {
  const localHref = href.toString();
  if (localHref.startsWith("http")) {
    return (
      <a
        {...p}
        href={href.toString()}
        target="_blank"
        rel="noreferrer noopener"
      >
        {p.children}
      </a>
    );
  } else {
    return <NextLink href={localHref} {...p} />;
  }
};
