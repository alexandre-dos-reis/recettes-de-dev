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
import { Document } from "~/mdx/document";
import { sortAlphabetically, sortDocument } from "~/utils/functions";
import { navSortState } from "~/utils/store";
import { Link } from "./Link";
import { NavDocumentLink } from "./NavDocumentLink";
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

  const sort = useCallback(
    (a: Document, b: Document) =>
      navSort === "alphabetically"
        ? sortAlphabetically(a, b)
        : sortDocument(a, b),
    [navSort]
  );

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
        {pathNameWithoutSlash === "" ? (
          memoedDocs
            .sort(sort)
            .map((d) => (
              <NavDocumentLink
                key={d.id}
                doc={d}
                pathname={pathNameWithoutSlash}
              />
            ))
        ) : (
          <>
            <Link
              href="/"
              className={`block whitespace-nowrap border p-1 border-black mb-2 text-center`}
            >
              {"<-"} Retour
            </Link>
            <NavNode
              docs={memoedDocs}
              position={0}
              pathname={pathNameWithoutSlash}
            />
          </>
        )}
      </nav>
    </>
  );
};
