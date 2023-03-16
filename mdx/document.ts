import { z } from "zod";
import { getSafeMdx } from "./compiled-mdx";
import { readdir } from "node:fs/promises";
import { getSafeFrontmatter } from "./frontmatter";
import { asyncFileExists } from "./utils";

const frontmatterDocumentSchema = z.object({
  title: z.string(),
  sort: z.number().optional(),
  draft: z.boolean().optional(),
  image: z.string().optional(),
  nav: z.string().optional(),
});

export interface Document {
  id: string;
  slug: string;
  node: string;
  children?: Document[];
  frontmatter: z.infer<typeof frontmatterDocumentSchema>;
}

const createDocument = (
  path: string,
  frontmatter: z.infer<typeof frontmatterDocumentSchema>
): Document => {
  const arraySlug = path.replace(".mdx", "").replace("/index", "").split("/");
  arraySlug.shift();

  return {
    id: path,
    slug: `${arraySlug.join("/")}`,
    node: arraySlug.at(-1) || "",
    frontmatter,
  };
};

export const getDocumentTree = async (directory: string) => {
  const content = await readdir(directory);

  if (content.includes("index.mdx")) {
    const document = await getPublishedDocument(`${directory}/index.mdx`);
    if (document) {
      document.children = (
        await content
          .filter((x) => x !== "index.mdx")
          .reduce(async (acc, file) => {
            const path = `${directory}/${file}`;
            const document = path.endsWith(".mdx")
              ? await getPublishedDocument(path)
              : await getDocumentTree(path);

            if (!document) {
              return acc; // Document is a draft, skipping...
            }

            // The file is ready to be shown, document is valid...
            return (await acc).concat(document);
          }, Promise.resolve([] as Document[]))
      ).sort((a, b) => (a.frontmatter?.sort || 0) - (b.frontmatter?.sort || 0));
      return document;
    }
  }
  return null;
};

const getPublishedDocument = async (filename: string) => {
  const frontmatter = await getSafeFrontmatter(
    filename,
    frontmatterDocumentSchema
  );

  if (frontmatter.draft) {
    return null; // The file is a draft, skipping...
  }

  return createDocument(filename, frontmatter);
};

export const getDocumentBySlug = async (slugArray: string[]) => {
  const slug = slugArray.join("/");
  const nonIndexFile = `content/${slug}.mdx`;

  if (await asyncFileExists(nonIndexFile)) {
    return await getSafeMdx(nonIndexFile, frontmatterDocumentSchema);
  }

  return await getSafeMdx(
    `content/${slug}/index.mdx`,
    frontmatterDocumentSchema
  );
};

export type Slugs = { slug: string[] }[];

export const getRecursiveSlugs = (
  command: Document,
  slugs: Slugs = []
): Slugs => {
  slugs.push({ slug: command.slug.split("/") });
  command.children?.map((c) => {
    slugs.concat(getRecursiveSlugs(c, slugs));
  });
  return slugs;
};
