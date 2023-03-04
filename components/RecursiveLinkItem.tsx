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
import { RecursiveNavbar } from "./ResursiveNavbar";

interface Props extends ComponentPropsWithRef<typeof Link> {
  doc: Document;
  parentIsOpen: boolean;
  backPath?: string;
}

export const RecursiveLinkItem = ({
  doc,
  onClick,
  parentIsOpen,
  backPath,
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

  return (
    <>
      <Link
        {...p}
        className="block whitespace-nowrap"
        prefetch={false}
        onClick={onClickHandler}
      >
        {showChildren
          ? `../${backPath ?? ""}`
          : doc?.frontmatter.nav ?? doc?.frontmatter.title}
      </Link>
      {showChildren && doc.children ? (
        <div>
          <RecursiveNavbar backPath="../" docs={doc?.children!} />
        </div>
      ) : null}
    </>
  );
};
