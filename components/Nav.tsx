"use client";

import { usePathname } from "next/navigation";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSortDocument } from "~/hooks/useSortDocument";
import { Document } from "~/mdx/document";
import { sortAlphabetically, sortDocument } from "~/utils/functions";
import { navSortState } from "~/utils/store";
import { NavNode } from "./NavNode";

type Nav = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

interface Props extends Nav {
  docs: Document[];
}

export const Nav = ({ docs, ...p }: Props) => {
  const pathname = usePathname();
  const pathNameWithoutSlash = pathname?.slice(1) || "";
  const memoedDocs = useMemo(() => docs, []);
  const [navSort, setNavSort] = navSortState();
  const sortDocs = useSortDocument();

  return (
    <>
      <div className="flex mb-3 gap-3 justify-center sticky top-0">
        <button
          type="button"
          onClick={() => setNavSort("document")}
          className={navSort === "document" ? "underline" : ""}
        >
          Défaut
        </button>
        <button
          type="button"
          onClick={() => setNavSort("alphabetically")}
          className={navSort === "alphabetically" ? "underline" : ""}
        >
          A,B,C
        </button>
      </div>
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
