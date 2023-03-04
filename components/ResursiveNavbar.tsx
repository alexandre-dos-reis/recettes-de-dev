"use client";

import { useState } from "react";
import { Document } from "~/mdx/document";
import { RecursiveLinkItem } from "./RecursiveLinkItem";

interface Props {
  docs: Document[];
}

export const RecursiveNavbar = ({ docs }: Props) => {
  const [currentDocumentIdOpen, setCurrentDocumentIdOpen] = useState<
    string | null
  >();

  return (
    <>
      {docs?.map((d) => (
        <RecursiveLinkItem
          key={d.id}
          doc={d}
          href={d.slug}
          onClick={() => setCurrentDocumentIdOpen(d.id)}
          parentIsOpen={currentDocumentIdOpen === d.id}
        />
      ))}
    </>
  );
};
