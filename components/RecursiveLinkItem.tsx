"use client";

import {
  ComponentPropsWithRef,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { Document } from "~/mdx/document";
import { Link } from "~/components/Link";
import { RecursiveNavbar } from "./ResursiveNavbar";

interface Props extends ComponentPropsWithRef<typeof Link> {
  doc: Document;
  parentIsOpen: boolean;
}

export const RecursiveLinkItem = ({
  doc,
  onClick,
  parentIsOpen,
  ...p
}: Props) => {
  const [localIsOpen, localSetIsOpen] = useState(false);

  const onClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    localSetIsOpen((v) => !v);
  };

  const showChildren =
    (localIsOpen && parentIsOpen) || (!localIsOpen && parentIsOpen);

  return (
    <>
      <Link
        {...p}
        className="block whitespace-nowrap"
        prefetch={false}
        onClick={onClickHandler}
      >
        {doc?.frontmatter.nav ?? doc?.frontmatter.title}
      </Link>
      {showChildren && doc.children ? (
        <div className="ml-3">
          <RecursiveNavbar docs={doc?.children!} />
        </div>
      ) : null}
    </>
  );
};
