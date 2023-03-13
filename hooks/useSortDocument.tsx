import { useCallback } from "react";
import { sortAlphabetically, sortDocument } from "~/utils/functions";
import { navSortState } from "~/utils/store";
import { Document } from "~/mdx/document";

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
