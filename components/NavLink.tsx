import { Url } from "next/dist/shared/lib/router/router";
import { ComponentPropsWithRef } from "react";
import { Document } from "~/mdx/document";
import { Link } from "./Link";

interface Props extends Omit<ComponentPropsWithRef<typeof Link>, "href"> {
  doc: Document;
  pathname?: string;
}

export const NavLink = ({ doc, pathname, children, ...p }: Props) => (
  <Link
    {...p}
    href={doc?.slug}
    className={`block whitespace-nowrap border p-1 border-black mb-2 text-center rounded-sm ${
      pathname === doc.slug ? "underline" : ""
    }`}
  >
    {children}
    {doc.children ? "> " : ""}
    {doc.frontmatter.nav ?? doc.frontmatter.title}
  </Link>
);
