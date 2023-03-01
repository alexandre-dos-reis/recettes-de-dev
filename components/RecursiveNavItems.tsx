"use client";

import Link from "next/link";
import { useState } from "react";
import { Command } from "~/mdx/commands/functions";

interface Props {
  command: Command;
}

export const RecursiveNavItems = ({ command }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div>
      <Link
        className="block"
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
              <RecursiveNavItems command={c} />
            )}
          </div>
        ))}
    </div>
  );
};
