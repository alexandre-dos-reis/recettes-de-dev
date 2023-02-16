import { z } from "zod";
import { getSafeCompiledMdx } from "../functions";
import { readdir, stat } from "node:fs/promises";

const contentDir = "content/commands";

const fmSchema = z.object({
  title: z.string(),
  date: z.string(),
  sort: z.number(),
  draft: z.boolean().optional(),
});

interface CommandFile {
  id: string;
  slug: string;
  children?: CommandFile[];
  fm?: z.infer<typeof fmSchema>;
}

const makeCommandFile = (path: string): CommandFile => ({
  id: path,
  slug: path
    .replace(contentDir, "")
    .replace(".mdx", "")
    .replace("/index", "")
    .substring(1),
});

const getCommandMdx = async (pathFile: string) => {
  return await getSafeCompiledMdx(pathFile, fmSchema);
};

const asyncFileExists = async (path: string) => {
  return !!(await stat(path).catch((e) => false));
};

const getRecursiveCommandsTree = async (directory: string) => {
  const content = (await readdir(directory)).filter((x) => x !== "index.mdx");

  return (
    await content.reduce(async (acc, file) => {
      const fullPath = `${directory}/${file}`;
      const filename = file.endsWith(".mdx")
        ? fullPath
        : `${fullPath}/index.mdx`;

      const frontmatter = (await getCommandMdx(filename)).frontmatter;

      if (frontmatter.draft) {
        return acc; // The file is a draft, skipping...
      }

      const command = makeCommandFile(filename);
      command.fm = frontmatter;

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
  ).sort((a, b) => (a.fm?.sort || 0) - (b.fm?.sort || 0));
};

export const getCommandsTree = async () => {
  return await getRecursiveCommandsTree(contentDir);
};

export const getCommandBySlug = async (slugArray: string[]) => {
  const slug = slugArray.join("/");
  const simpleFile = `${contentDir}/${slug}.mdx`;

  if (slugArray.length === 1) {
    if (await asyncFileExists(simpleFile)) {
      return await getCommandMdx(simpleFile);
    } else {
      return await getCommandMdx(`${contentDir}/${slug}/index.mdx`);
    }
  } else {
    return await getCommandMdx(simpleFile);
  }
};
