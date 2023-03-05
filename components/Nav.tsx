"use client";

import { usePathname } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { Document } from "~/mdx/document";
import { NavGroup } from "./NavGroup";

type Nav = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

interface Props extends Nav {
  docs: Document[];
}

export const Nav = ({ docs, ...p }: Props) => {
  const pathname = usePathname();

  return (
    <nav {...p}>
      <NavGroup docs={docs} initialPath={pathname} />
    </nav>
  );
};
