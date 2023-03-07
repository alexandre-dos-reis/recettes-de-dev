import { Document } from "~/mdx/document";
import { NavDocumentLink } from "./NavDocumentLink";
import { navSortState } from "~/utils/store";
import { sortAlphabetically, sortDocument } from "~/utils/functions";
import { useCallback, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  const [animationParent, enable] = useAutoAnimate({
    duration: 333,
  });

  const disableAnimation = () => {
    enable(false);
  };

  const enableAnimation = () => {
    enable(true);
  };

  disableAnimation();

  const sort = useCallback(
    (a: Document, b: Document) =>
      navSort === "alphabetically"
        ? sortAlphabetically(a, b)
        : sortDocument(a, b),
    [navSort]
  );

  // useEffect(() => {
  //   disableAnimation();
  // }, [pathname]);

  return (
    <>
      <div ref={animationParent}>
        {currentDoc && currentDoc?.children ? (
          <NavDocumentLink
            doc={currentDoc}
            pathname={pathname}
            onClick={enableAnimation}
          />
        ) : (
          docs.sort(sort).map((d) => (
            <NavDocumentLink key={d.id} doc={d} pathname={pathname}>
              {d.children ? "> " : ""}
            </NavDocumentLink>
          ))
        )}
      </div>

      {currentDoc?.node === lastNode ? (
        <div className="ml-3" ref={animationParent}>
          {currentDoc?.children?.sort(sort).map((d) => (
            <NavDocumentLink
              key={d.id}
              doc={d}
              pathname={pathname}
              // onClick={disableAnimation}
            >
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
