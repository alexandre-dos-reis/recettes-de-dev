import { array, z } from "zod";
import { asyncFileExists, getSafeCompiledMdx } from "../functions";
import { readdir } from "node:fs/promises";

const contentDir = "content/cli";

const commandfrontmatterSchema = z.object({
  title: z.string(),
  sort: z.number().optional(),
  draft: z.boolean().optional(),
  image: z.string().optional(),
  nav: z.string().optional(),
});

export interface Command {
  id: string;
  slug: string;
  children?: Command[];
  frontmatter: z.infer<typeof commandfrontmatterSchema>;
}

const makeCommandFile = (
  path: string,
  frontmatter: z.infer<typeof commandfrontmatterSchema>
): Command => {
  const arraySlug = path.replace(".mdx", "").replace("/index", "").split("/");
  arraySlug.shift();

  return {
    id: path,
    slug: arraySlug.join("/"),
    frontmatter,
  };
};

const getCommandMdx = async (pathFile: string) => {
  return await getSafeCompiledMdx(pathFile, commandfrontmatterSchema);
};

const getRecursiveCommandsTree = async (directory: string) => {
  const content = await readdir(directory);

  if (content.includes("index.mdx")) {
    const command = await getPublishCommand(`${directory}/index.mdx`);
    if (!command) {
      return null;
    } else {
      command.children = (
        await content
          .filter((x) => x !== "index.mdx")
          .reduce(async (acc, file) => {
            const path = `${directory}/${file}`;
            const isMDX = path.endsWith(".mdx");

            const command = isMDX
              ? await getPublishCommand(path)
              : await getRecursiveCommandsTree(path);

            if (!command) {
              return acc; // The file is a draft, skipping...
            }

            // The file is ready to be shown, command is valid...
            return (await acc).concat(command);
          }, Promise.resolve([] as Command[]))
      ).sort((a, b) => (a.frontmatter?.sort || 0) - (b.frontmatter?.sort || 0));
      return command;
    }
  }
  return null;
};

const getPublishCommand = async (filename: string) => {
  const { frontmatter } = await getCommandMdx(filename);

  if (frontmatter.draft) {
    return null; // The file is a draft, skipping...
  }

  return makeCommandFile(filename, frontmatter);
};

export const getCommandsTree = async () => {
  return await getRecursiveCommandsTree(contentDir);
};

export const getCommandBySlug = async (slugArray: string[]) => {
  const slug = slugArray.join("/");
  const nonIndexFile = `content/${slug}.mdx`;

  if (await asyncFileExists(nonIndexFile)) {
    return await getCommandMdx(nonIndexFile);
  }

  return await getCommandMdx(`content/${slug}/index.mdx`);
};

export type Slugs = { slug: string[] }[];

export const getRecursiveSlugs = (command: Command | null): Slugs => {
  const slugs: Slugs = [];
  if (command) {
    slugs.push({ slug: command.slug.split("/") });
    command.children?.map((c) => {
      slugs.concat(getRecursiveSlugs(c));
    });
    return slugs;
  }
  return [];
};