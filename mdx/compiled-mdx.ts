import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import { components } from "~/mdx/components";
import { z, ZodRawShape } from "zod";
import { options } from "./options";

export const getMdx = async (filepath: string) => {
  const raw = await fs.readFile(filepath, "utf-8");

  return await compileMDX({
    source: raw,
    components: { ...components },
    options,
  } as MDXRemoteProps);
};

export const getSafeMdx = async <T extends ZodRawShape>(
  filePath: string,
  zodObject: z.ZodObject<T>
) => {
  const { frontmatter: unsafeFrontmatter, ...rest } = await getMdx(filePath);

  const parsedFrontmatter = zodObject.safeParse(unsafeFrontmatter);

  if (!parsedFrontmatter.success) {
    throw new Error(
      `There's a problem with the frontmatter definition in the ${filePath} file.`
    );
  }

  return { frontmatter: parsedFrontmatter.data, ...rest };
};
