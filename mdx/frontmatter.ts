import { matter } from "vfile-matter";
import { read } from "to-vfile";
import { z, ZodRawShape } from "zod";

export const getFrontmatter = async (pathname: string) => {
  const vFile = await read(pathname);
  return matter(vFile, { strip: true }).data.matter as Promise<
    Record<string, unknown>
  >;
};

export const getSafeFrontmatter = async <T extends ZodRawShape>(
  filePath: string,
  zodObject: z.ZodObject<T>
) => {
  const unsafeFrontmatter = await getFrontmatter(filePath);

  const parsedFrontmatter = zodObject.safeParse(unsafeFrontmatter);

  if (!parsedFrontmatter.success) {
    throw new Error(
      `There's a problem with the frontmatter definition in the ${filePath} file.`
    );
  }

  return parsedFrontmatter.data;
};
