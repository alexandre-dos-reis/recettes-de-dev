"use client";

import Link from "next/link";
import { useState } from "react";
import { Document } from "~/mdx/document";

interface Props {
  document: Document;
}

export const RecursiveNavItems = ({ document: command }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div>
      <Link
        className="block whitespace-nowrap"
        href={command?.slug}
        prefetch={false}
        onClick={onClick}
      >
        {command?.frontmatter.nav ?? command?.frontmatter.title}
      </Link>
      {isOpen &&
        command?.children?.map((c) => (
          <div className="ml-3" key={c.id}>
            {command.children !== null &&
            command.children?.length === 0 ? null : (
              <RecursiveNavItems document={c} />
            )}
          </div>
        ))}
    </div>
  );
};
