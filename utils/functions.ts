import { Document } from "~/mdx/document";

export const sortAlphabetically = (a: Document, b: Document) => {
  return a.frontmatter.title
    .toLowerCase()
    .localeCompare(b.frontmatter.title.toLowerCase());
};

export const sortDocument = (a: Document, b: Document) => {
  return (a.frontmatter.sort || 0) - (b.frontmatter.sort || 0);
};

export const removeLastSlug = (slug: string) => {
  return slug.substring(0, slug.lastIndexOf("/"));
};
