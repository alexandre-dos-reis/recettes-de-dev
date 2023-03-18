import { SerializeOptions } from "next-mdx-remote/dist/types";
import rehypePrismPlus from "rehype-prism-plus";
// import rehypeSlug from "rehype-slug"; // Replaced by slugify
import remarkHeadings from "@vcarl/remark-headings";

export const options: SerializeOptions = {
  mdxOptions: {
    rehypePlugins: [rehypePrismPlus],
    remarkPlugins: [remarkHeadings],
  },
  parseFrontmatter: true,
};
