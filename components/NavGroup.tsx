"use client";

import { useEffect, useState } from "react";
import { Document } from "~/mdx/document";
import { Link } from "./Link";
import { NavItem } from "./NavItem";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
  docs: Document[];
  initialPath: string | null;
}

export const NavGroup = ({ docs, initialPath }: Props) => {
  const [docSlug, setDocslug] = useState<string | null>(null);
  const pathname = usePathname();
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    // Compare initial path and docs to get correct nav state
    console.log(initialPath);
  }, []);

  return (
    <div ref={animationParent}>
      {docs?.map((d) =>
        docSlug === null || docSlug === d.slug ? (
          d.children ? (
            <NavItem
              key={d.id}
              doc={d}
              initialPath=""
              href={d.slug}
              onClick={() => {
                setDocslug((x) => (x === d.slug ? null : d.slug));
              }}
              parentIsOpen={docSlug === d.slug}
            />
          ) : (
            <Link
              href={d.slug}
              key={d.id}
              className={`block whitespace-nowrap ${
                pathname === `/${d.slug}` && "underline"
              }`}
            >
              - {d?.frontmatter.nav ?? d?.frontmatter.title}
            </Link>
          )
        ) : null
      )}
    </div>
  );
};
