"use client";

import {
  ComponentPropsWithRef,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Document } from "~/mdx/document";
import { Link } from "~/components/Link";
import { NavGroup } from "./NavGroup";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props extends ComponentPropsWithRef<typeof Link> {
  doc: Document;
  parentIsOpen: boolean;
  pathname: string;
}

export const NavItem = ({
  doc,
  onClick,
  parentIsOpen,
  pathname,
  ...p
}: Props) => {
  const [isOpen, setIsOpen] = useState(
    pathname.startsWith(doc.slug) || parentIsOpen
  );

  const onClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    setIsOpen((v) => !v);
  };

  const updateState = () => {
    if (doc.slug !== location.pathname.slice(1)) {
      setIsOpen(false);
    } else {
      setIsOpen(true); // only work on different document...
    }
  };

  useEffect(() => {
    // listen to back and forward button to update state
    addEventListener("popstate", updateState);
    return () => removeEventListener("popstate", updateState);
  }, []);

  const [animationParent] = useAutoAnimate();

  return (
    <>
      <Link
        {...p}
        onClick={onClickHandler}
        className={`block whitespace-nowrap ${
          pathname === `${doc.slug}` ? "underline" : ""
        }`}
      >
        {`>`} {doc?.frontmatter.nav ?? doc?.frontmatter.title}
      </Link>
      {isOpen && doc.children ? (
        <div ref={animationParent}>
          <NavGroup docs={doc?.children!} pathname={pathname} />
        </div>
      ) : null}
    </>
  );
};
