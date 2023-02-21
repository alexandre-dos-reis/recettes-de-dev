import { z } from "zod";
import { asyncFileExists, getSafeCompiledMdx } from "../functions";
import { readdir } from "node:fs/promises";

const contentDir = "content/cli";

const frontmatterCommandSchema = z.object({
  title: z.string(),
  sort: z.number().optional(),
  draft: z.boolean().optional(),
  image: z.string().optional(),
  nav: z.string().optional(),
});

export interface CommandFile {
  id: string;
  slug: string;
  children?: CommandFile[];
  frontmatter: z.infer<typeof frontmatterCommandSchema>;
}

const makeCommandFile = (
  path: string,
  frontmatter: z.infer<typeof frontmatterCommandSchema>
): CommandFile => ({
  id: path,
  slug: path
    .replace(contentDir, "")
    .replace(".mdx", "")
    .replace("/index", "")
    .substring(1),
  frontmatter,
});

const getCommandMdx = async (pathFile: string) => {
  return await getSafeCompiledMdx(pathFile, frontmatterCommandSchema);
};

const getRecursiveCommandsTree = async (directory: string) => {
  const content = (await readdir(directory)).filter((x) => x !== "index.mdx");

  return (
    await content.reduce(async (acc, file) => {
      const fullPath = `${directory}/${file}`;
      const filename = file.endsWith(".mdx")
        ? fullPath
        : `${fullPath}/index.mdx`;

      const { frontmatter } = await getCommandMdx(filename);

      if (frontmatter.draft) {
        return acc; // The file is a draft, skipping...
      }

      const command = makeCommandFile(filename, frontmatter);

      if (command.id.endsWith("index.mdx")) {
        command.children = await getRecursiveCommandsTree(
          command.id.replace("/index.mdx", "")
        );
      } else {
        command.children = [];
      }

      // The file is ready to be shown, command is valid...
      return (await acc).concat(command);
    }, Promise.resolve([] as CommandFile[]))
  ).sort((a, b) => (a.frontmatter?.sort || 0) - (b.frontmatter?.sort || 0));
};

export const getCommandsTree = async () => {
  return (await getRecursiveCommandsTree(contentDir));
};

export const getCommandBySlug = async (slugArray: string[]) => {
  const slug = slugArray.join("/");
  const nonIndexFile = `${contentDir}/${slug}.mdx`;

  if (await asyncFileExists(nonIndexFile)) {
    return await getCommandMdx(nonIndexFile);
  }

  return await getCommandMdx(`${contentDir}/${slug}/index.mdx`);
};
