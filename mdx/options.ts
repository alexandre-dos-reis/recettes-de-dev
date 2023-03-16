import { SerializeOptions } from "next-mdx-remote/dist/types";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkHeadings from "@vcarl/remark-headings";

export const options: SerializeOptions = {
  mdxOptions: {
    rehypePlugins: [rehypePrismPlus, rehypeSlug],
    remarkPlugins: [remarkHeadings],
  },
  parseFrontmatter: true,
};
