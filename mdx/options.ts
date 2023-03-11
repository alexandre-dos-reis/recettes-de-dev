import { SerializeOptions } from "next-mdx-remote/dist/types";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const options: SerializeOptions = {
  mdxOptions: {
    rehypePlugins: [rehypePrismPlus, rehypeSlug, rehypeAutolinkHeadings],
  },
  parseFrontmatter: true,
};
