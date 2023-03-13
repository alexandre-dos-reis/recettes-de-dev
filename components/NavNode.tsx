import { Document } from "~/mdx/document";
import { Link } from "./Link";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSortDocument } from "~/hooks/useSortDocument";
import { removeLastSlug } from "~/utils/functions";

interface Props {
  doc: Document;
  pathname: string;
  position: number;
}

export const NavNode = ({ doc, pathname, position }: Props) => {
  const [ref] = useAutoAnimate();
  const sortDocs = useSortDocument();

  return (
    <>
      <Link href={doc.slug} className="block">
        {doc.frontmatter.nav ?? doc.frontmatter.title}
      </Link>
      {!doc.children ? null : (
        <div className="ml-3" ref={ref}>
          {doc.children
            .filter((d) => {
              if (doc.slug === pathname) {
                return true;
              } else {
                if (d.children && pathname.startsWith(d.slug)) {
                  return true;
                } else {
                  // 
                  return false;
                }
              }
            })
            .sort(sortDocs)
            .map((d) => (
              <NavNode
                key={d.id}
                doc={d}
                pathname={pathname}
                position={position + 1}
              />
            ))}
        </div>
      )}
    </>
  );
};
