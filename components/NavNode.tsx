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
  const choosenDoc = doc.children?.find((d) => d.slug === pathname);
  const isCurrentDocHasChildren = choosenDoc?.children ? true : false;
  const pathnameLenght = pathname.split("/").length;

  // console.log({ position, isCurrentDocHasChildren });

  return (
    <>
      <NavLink doc={doc} pathname={pathname} />
      {!doc.children ? null : (
        <div className="ml-3" ref={ref}>
          {doc.children
            .filter((d) => {
              if (pathname === doc.slug) {
                return true;
              } else {
                if (
                  position + 1 < pathnameLenght &&
                  !isCurrentDocHasChildren &&
                  d.slug.startsWith(removeLastSlug(pathname))
                ) {
                  return true;
                }
                return pathname.startsWith(d.slug);
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
