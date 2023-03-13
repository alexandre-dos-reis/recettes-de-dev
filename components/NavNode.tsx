import { Document } from "~/mdx/document";
import { Link } from "./Link";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSortDocument } from "~/hooks/useSortDocument";
import { removeLastSlug } from "~/utils/functions";
import { NavLink } from "./NavLink";

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
      <NavLink doc={doc} />
      {!doc.children ? null : (
        <div className="ml-3" ref={ref}>
          {doc.children
            .filter((d) =>
              pathname === doc.slug ? true : pathname.startsWith(d.slug)
            )
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
