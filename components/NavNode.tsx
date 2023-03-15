import { Document } from "~/mdx/document";
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
  const choosenDoc = doc.children?.find((d) => d.slug === pathname);
  const isCurrentDocHasChildren = choosenDoc?.children ? true : false;
  const pathnameLenght = pathname.split("/").length;

  return (
    <>
      <NavLink doc={doc} pathname={pathname} />
      {!doc.children ? null : (
        <div className="ml-3" ref={ref}>
          {doc.children
            .filter(
              (d) =>
                pathname === doc.slug ||
                (position + 1 < pathnameLenght &&
                  !isCurrentDocHasChildren &&
                  d.slug.startsWith(removeLastSlug(pathname))) ||
                pathname.startsWith(d.slug)
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
