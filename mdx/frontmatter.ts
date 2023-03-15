import { join } from "node:path";

import { matter } from "vfile-matter";
import { read } from "to-vfile";
import { unknown } from "zod";

export const getFrontmatter = async (pathname: string) => {
  const vFile = await read(pathname);
  return matter(vFile, { strip: true }).data.matter as Promise<
    Record<string, unknown>
  >;
};
