"use client";

import { usePathname } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import { useSortDocument } from "~/hooks/useSortDocument";
import { Document } from "~/mdx/document";
import { NavNode } from "./NavNode";
import { SortSection } from "./SortSection";

type Nav = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

interface Props extends Nav {
  docs: Document[];
}

export const Nav = ({ docs, ...p }: Props) => {
  const pathname = usePathname();
  const pathNameWithoutSlash = pathname?.slice(1) || "";
  const memoedDocs = useMemo(() => docs, []);
  const sortDocs = useSortDocument();

  return (
    <>
      <SortSection />
      <nav {...p}>
        {memoedDocs.sort(sortDocs).map((d) => (
          <NavNode
            key={d.id}
            doc={d}
            position={0}
            pathname={pathNameWithoutSlash || ""}
          />
        ))}
      </nav>
    </>
  );
};
