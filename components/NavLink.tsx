import { ComponentPropsWithRef } from "react";
import { Document } from "~/mdx/document";
import { Link } from "./Link";
import { AiTwotoneFolderAdd, AiTwotoneFolderOpen } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { cn } from "~/utils/cn";
import { removeLastSlug } from "~/utils/functions.client";
import { navFont } from "~/styles/fonts";

interface Props extends Omit<ComponentPropsWithRef<typeof Link>, "href"> {
  doc: Document;
  pathname: string;
}

export const NavLink = ({ doc, pathname, children, ...p }: Props) => {
  const isSelected = pathname === doc.slug;
  const hasChildren = doc.children ? true : false;
  const href =
    isSelected && hasChildren ? doc.slug.replace(doc.node, "") : doc.slug;
  const isChildSelected = !hasChildren && removeLastSlug(pathname) === doc.slug;

  return (
    <Link
      {...p}
      href={href}
      className={cn(
        "block whitespace-nowrap p-1 mb-2 text-center rounded-sm",
        navFont.className,
        isSelected ? "text-inherit" : "text-gray-500"
      )}
    >
      <div className={cn("flex gap-3 justify-start items-center")}>
        {doc.children ? (
          isSelected || isChildSelected ? (
            <AiTwotoneFolderOpen className={cn("text-xl")} />
          ) : (
            <AiTwotoneFolderAdd className={cn("text-xl")} />
          )
        ) : (
          <BsDot className={cn("text-xl")} />
        )}
        {doc.frontmatter.nav ?? doc.frontmatter.title}
      </div>
    </Link>
  );
};
