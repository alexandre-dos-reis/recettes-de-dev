"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { Document } from "~/mdx/document";
import { RecursiveLinkItem } from "./RecursiveLinkItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
  docs: Document[];
}

export const RecursiveNavbar = ({ docs }: Props) => {
  const [currentDocumentIdOpen, setCurrentDocumentIdOpen] = useState<
    string | null
  >();

  const [animationParent] = useAutoAnimate({
    duration: 250,
    easing: "ease-in",
  });

  return (
    <div ref={animationParent}>
      {docs?.map((d) => (
        <RecursiveLinkItem
          key={d.id}
          doc={d}
          href={d.slug}
          onClick={() => setCurrentDocumentIdOpen(d.id)}
          parentIsOpen={currentDocumentIdOpen === d.id}
        />
      ))}
    </div>
  );
};
