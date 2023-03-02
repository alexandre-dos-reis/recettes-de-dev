import { z } from "zod";
import { asyncFileExists, getSafeCompiledMdx } from "./compiled";
import { readdir } from "node:fs/promises";

const documentFrontmatterSchema = z.object({
  title: z.string(),
  sort: z.number().optional(),
  draft: z.boolean().optional(),
  image: z.string().optional(),
  nav: z.string().optional(),
});

export interface Document {
  id: string;
  slug: string;
  children?: Document[];
  frontmatter: z.infer<typeof documentFrontmatterSchema>;
}

const createDocument = (
  path: string,
  frontmatter: z.infer<typeof documentFrontmatterSchema>
): Document => {
  const arraySlug = path.replace(".mdx", "").replace("/index", "").split("/");
  arraySlug.shift();

  return {
    id: path,
    slug: arraySlug.join("/"),
    frontmatter,
  };
};

const getMdxDocument = async (pathFile: string) => {
  return await getSafeCompiledMdx(pathFile, documentFrontmatterSchema);
};

export const getDocumentTree = async (directory: string) => {
  const content = await readdir(directory);

  if (content.includes("index.mdx")) {
    const document = await getPublishedDocument(`${directory}/index.mdx`);
    if (!document) {
      return null;
    } else {
      document.children = (
        await content
          .filter((x) => x !== "index.mdx")
          .reduce(async (acc, file) => {
            const path = `${directory}/${file}`;
            const isMDX = path.endsWith(".mdx");

            const document = isMDX
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
  const { frontmatter } = await getMdxDocument(filename);

  if (frontmatter.draft) {
    return null; // The file is a draft, skipping...
  }

  return createDocument(filename, frontmatter);
};

export const getDocumentBySlug = async (slugArray: string[]) => {
  const slug = slugArray.join("/");
  const nonIndexFile = `content/${slug}.mdx`;

  if (await asyncFileExists(nonIndexFile)) {
    return await getMdxDocument(nonIndexFile);
  }

  return await getMdxDocument(`content/${slug}/index.mdx`);
};

export type Slugs = { slug: string[] }[];

export const getRecursiveDocuments = (command: Document | null): Slugs => {
  const slugs: Slugs = [];
  if (command) {
    slugs.push({ slug: command.slug.split("/") });
    command.children?.map((c) => {
      slugs.concat(getRecursiveDocuments(c));
    });
    return slugs;
  }
  return [];
};
