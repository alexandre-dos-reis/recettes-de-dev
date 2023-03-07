export const getLastSlug = (slug: string) => {
  return slug.split("/").at(-1) || "";
};
