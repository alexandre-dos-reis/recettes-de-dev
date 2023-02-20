import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import { components } from "~/mdx/custom-mapping";
import { z, ZodRawShape } from "zod";
import { stat } from "node:fs/promises";

export const getCompiledMdx = async (filepath: string) => {
  const raw = await fs.readFile(filepath, "utf-8");

  const { content, frontmatter } = await compileMDX({
    source: raw,
    components: { ...(components || {}) },
    options: { parseFrontmatter: true },
  } as unknown as MDXRemoteProps);

  return { content, frontmatter };
};

export const getSafeCompiledMdx = async <T extends ZodRawShape>(
  filePath: string,
  zodObject: z.ZodObject<T>
) => {
  const { content, frontmatter: unsafeFrontmatter } = await getCompiledMdx(
    filePath
  );

  const parsedFrontmatter = zodObject.safeParse(unsafeFrontmatter);

  if (!parsedFrontmatter.success) {
    throw new Error(
      `There's a problem with the frontmatter definition in the ${filePath} file.`
    );
  }

  return { content, frontmatter: parsedFrontmatter.data };
};

export const asyncFileExists = async (path: string) => {
  return !!(await stat(path).catch((e) => false));
};
