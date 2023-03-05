"use client";

import {
  ComponentPropsWithRef,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Document } from "~/mdx/document";
import { Link } from "~/components/Link";
import { NavGroup } from "./NavGroup";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props extends ComponentPropsWithRef<typeof Link> {
  doc: Document;
  parentIsOpen: boolean;
  initialPath: string | null;
}

export const NavItem = ({
  doc,
  onClick,
  parentIsOpen,
  initialPath,
  ...p
}: Props) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);

  const onClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    // Disable navigation if link is already open
    if (localIsOpen) {
      e.preventDefault();
    }
    setLocalIsOpen((v) => !v);
  };

  const showChildren =
    ((localIsOpen && parentIsOpen) || (!localIsOpen && parentIsOpen)) &&
    localIsOpen;

  useEffect(() => {
    if (!parentIsOpen) {
      setLocalIsOpen(false);
    }
  }, [parentIsOpen]);

  const pathname = usePathname();
  const [animationParent] = useAutoAnimate();

  return (
    <>
      <Link
        {...p}
        onClick={onClickHandler}
        className={`block whitespace-nowrap ${
          pathname === `/${doc.slug}` && "underline"
        }`}
      >
        {`>`} {doc?.frontmatter.nav ?? doc?.frontmatter.title}
      </Link>
      {showChildren && doc.children ? (
        <div ref={animationParent}>
          <NavGroup docs={doc?.children!} initialPath="" />
        </div>
      ) : null}
    </>
  );
};
