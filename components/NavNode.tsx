import { Document } from "~/mdx/document";
import { NavDocumentLink } from "./NavDocumentLink";
import { navSortState } from "~/utils/store";
import { sortAlphabetically, sortDocument } from "~/utils/functions";
import { useCallback, useEffect } from "react";

interface Props {
  docs: Array<Document>;
  pathname: string;
  position: number;
}

export const NavNode = ({ docs, pathname, position }: Props) => {
  const pathNode = pathname.split("/")[position];
  const currentDoc = docs.find((x) => x.node === pathNode);
  const lastNode = pathname.split("/").at(-1);
  const [navSort] = navSortState();

  const sort = useCallback(
    (a: Document, b: Document) =>
      navSort === "alphabetically"
        ? sortAlphabetically(a, b)
        : sortDocument(a, b),
    [navSort]
  );

  return (
    <>
      <div>
        {currentDoc && currentDoc?.children ? (
          <NavDocumentLink doc={currentDoc} pathname={pathname} />
        ) : (
          docs.sort(sort).map((d) => (
            <NavDocumentLink key={d.id} doc={d} pathname={pathname}>
              {d.children ? "> " : ""}
            </NavDocumentLink>
          ))
        )}
      </div>

      {currentDoc?.node === lastNode ? (
        <div className="ml-3">
          {currentDoc?.children?.sort(sort).map((d) => (
            <NavDocumentLink key={d.id} doc={d} pathname={pathname}>
              {d.children ? "> " : ""}
            </NavDocumentLink>
          ))}
        </div>
      ) : (
        <div className="ml-3">
          <NavNode
            docs={currentDoc?.children ?? []}
            pathname={pathname}
            position={position + 1}
          />
        </div>
      )}
    </>
  );
};
