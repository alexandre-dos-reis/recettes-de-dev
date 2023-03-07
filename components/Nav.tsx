"use client";

import { usePathname } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { Document } from "~/mdx/document";
import { isNavInitState } from "~/utils/store";
import { Link } from "./Link";
import { NavGroup } from "./NavGroup";
import { NavNode } from "./NavNode";

type Nav = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

interface Props extends Nav {
  docs: Document[];
}

export const Nav = ({ docs, ...p }: Props) => {
  const pathname = usePathname();
  const pathNameWithoutSlash = pathname?.slice(1) || "";

  return (
    <nav {...p}>
      {pathNameWithoutSlash === "" ? null : (
        <Link href="/" className={`block whitespace-nowrap`}>
          {"/"}
        </Link>
      )}
      <NavNode docs={docs} position={0} pathname={pathNameWithoutSlash} />
    </nav>
  );
};
