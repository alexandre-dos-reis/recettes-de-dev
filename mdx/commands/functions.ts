import { z } from "zod";
import { getSafeCompiledMdx } from "../functions";
import recursive from "recursive-readdir";

const frontmatterSchemaCommand = z.object({
  title: z.string(),
  date: z.string(),
  sort: z.number(),
  draft: z.boolean().optional(),
});

export const getCommand = async (pathFile: string) => {
  return await getSafeCompiledMdx(pathFile, frontmatterSchemaCommand);
};

export const listCommandsFile = async () => {
  const contentDir = "content/commands/";
  return (await recursive(contentDir))
    .map((cf) => ({
      id: cf,
      slug: cf
        .replace(contentDir, "")
        .replace(".mdx", "")
        .replace("/index", ""),
    }))
    .sort();
};
