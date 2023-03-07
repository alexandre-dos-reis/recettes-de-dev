"use client";

import { useEffect, useState } from "react";
import { Document } from "~/mdx/document";
import { Link } from "./Link";
import { NavItem } from "./NavItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { isNavInitState, navSlugState } from "~/utils/store";
import router from "next/dist/client/router";

interface Props {
  docs: Document[];
  pathname: string;
}

export const NavGroup = ({ docs, pathname }: Props) => {
  const [docSlug, setDocslug] = useState<string | null>(null);
  const [animationParent] = useAutoAnimate();

  // Needed to update navbar state from url
  useEffect(() => {
    docs.map((d) => {
      if (d.children && pathname.startsWith(d.slug)) {
        setDocslug(d.slug);
      }
    });

    // listen to back and forward button to update state
    addEventListener("popstate", updateState);
    return () => removeEventListener("popstate", updateState);
  }, []);

  const updateState = () => {
    // setDocslug(null); // ok if back button is clicked
    // What about the forward button ?
    // if (docSlug === null) {
    //   docs.map((d) => {
    //     setDocslug((x) => (x === d.slug ? null : d.slug));
    //   });
    // }
  };

  return (
    <div ref={animationParent}>
      {docs?.map((d) =>
        docSlug === null || docSlug === d.slug ? (
          d.children ? (
            <NavItem
              key={d.id}
              doc={d}
              href={d.slug}
              pathname={pathname}
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
                pathname === d.slug ? "underline" : ""
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
