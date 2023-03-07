import { Document } from "~/mdx/document";
import { Link } from "./Link";

interface Props {
  docs: Array<Document>;
  pathname: string;
  position: number;
}

export const NavNode = ({ docs, pathname, position }: Props) => {
  const pathNode = pathname.split("/")[position];
  const lastNode = pathname.split("/").at(-1);

  const currentDoc = docs.find((x) => x.node === pathNode);
  const currentDocChildren = currentDoc?.children;

  // console.log({ position, currentDoc, currentDocChildren, docs });

  if (lastNode === "") {
    return (
      <>
        {docs.map((d) => (
          <Link
            key={d.id}
            href={d.slug}
            className={`block whitespace-nowrap ${
              pathname === d.slug ? "underline" : ""
            }`}
          >
            - {d.frontmatter.nav ?? d.frontmatter.title}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {currentDoc && currentDocChildren ? (
        <Link
          href={currentDoc?.slug || ""}
          className={`block whitespace-nowrap ${
            pathname === currentDoc?.slug ? "underline" : ""
          }`}
        >
          - {currentDoc?.frontmatter.nav ?? currentDoc?.frontmatter.title}
        </Link>
      ) : null}
      <div>
        {currentDocChildren === undefined
          ? docs.map((d) => (
              <Link
                key={d.id}
                href={d.slug}
                className={`block whitespace-nowrap ${
                  pathname === d.slug ? "underline" : ""
                }`}
              >
                - {d.frontmatter.nav ?? d.frontmatter.title}
              </Link>
            ))
          : null}
      </div>
      <div className="ml-3">
        {currentDoc?.node === lastNode ? (
          currentDocChildren?.map((d) => (
            <Link
              key={d.id}
              href={d.slug}
              className={`block whitespace-nowrap ${
                pathname === d.slug ? "underline" : ""
              }`}
            >
              - {d.frontmatter.nav ?? d.frontmatter.title}
            </Link>
          ))
        ) : (
          <>
            <NavNode
              docs={currentDoc?.children ?? []}
              pathname={pathname}
              position={position + 1}
            />
          </>
        )}
      </div>
    </>
  );
};
