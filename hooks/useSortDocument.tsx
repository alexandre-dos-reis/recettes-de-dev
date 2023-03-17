import { useCallback } from "react";
import { navSortState } from "~/utils/store";
import { Document } from "~/mdx/document";

const sortAlphabetically = (a: Document, b: Document) => {
  return a.frontmatter.title
    .toLowerCase()
    .localeCompare(b.frontmatter.title.toLowerCase());
};

const sortDocument = (a: Document, b: Document) => {
  return (a.frontmatter.sort || 0) - (b.frontmatter.sort || 0);
};

export const useSortDocument = () => {
  const [navSort] = navSortState();

  return useCallback(
    (a: Document, b: Document) =>
      navSort === "alphabetically"
        ? sortAlphabetically(a, b)
        : sortDocument(a, b),
    [navSort]
  );
};
