import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import { components } from "~/mdx/components";
import { z, ZodRawShape } from "zod";
import { options } from "./options";

export const getMdx = async (filepath: string) => {
  const raw = await fs.readFile(filepath, "utf-8");

  const { content, frontmatter } = await compileMDX({
    source: raw,
    components: { ...components },
    options,
  } as MDXRemoteProps);

  return { content, frontmatter };
};

export const getSafeMdx = async <T extends ZodRawShape>(
  filePath: string,
  zodObject: z.ZodObject<T>
) => {
  const { content, frontmatter: unsafeFrontmatter } = await getMdx(filePath);

  const parsedFrontmatter = zodObject.safeParse(unsafeFrontmatter);

  if (!parsedFrontmatter.success) {
    throw new Error(
      `There's a problem with the frontmatter definition in the ${filePath} file.`
    );
  }

  return { content, frontmatter: parsedFrontmatter.data };
};
