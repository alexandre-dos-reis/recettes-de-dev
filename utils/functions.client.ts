export const removeLastSlug = (slug: string) => {
  return slug.substring(0, slug.lastIndexOf("/"));
};
