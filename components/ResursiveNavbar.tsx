"use client";

import { useState } from "react";
import { Document } from "~/mdx/document";
import { Link } from "./Link";
import { RecursiveLinkItem } from "./RecursiveLinkItem";
import { usePathname } from "next/navigation";

interface Props {
  docs: Document[];
  backPath?: string;
}

export const RecursiveNavbar = ({ docs, backPath }: Props) => {
  const [docId, setDocId] = useState<string | null>(null);

  return (
    <>
      {docs?.map((d) =>
        docId === null || docId === d.id ? (
          d.children ? (
            <RecursiveLinkItem
              backPath={backPath}
              key={d.id}
              doc={d}
              href={d.slug}
              onClick={() => {
                setDocId((x) => (x === d.id ? null : d.id));
              }}
              parentIsOpen={docId === d.id}
            />
          ) : (
            <Link
              href={d.slug}
              key={d.id}
              className={`block whitespace-nowrap ${
                d.id === docId && "underline"
              }`}
              prefetch={false}
            >
              {d?.frontmatter.nav ?? d?.frontmatter.title}
            </Link>
          )
        ) : null
      )}
    </>
  );
};
