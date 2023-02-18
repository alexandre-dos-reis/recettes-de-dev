import { getCommandBySlug, getCommandsTree } from "~/mdx/commands/functions";
import { PageParamsProps } from "~/types/generics";

export const generateStaticParams = async () => {
  let slugs: { slug: string[] }[] = [];

  (await getCommandsTree()).forEach((c) => {
    slugs.push({ slug: c.slug.split("/") });
    if (c.children?.length !== 0) {
      c.children?.forEach((cc) => slugs.push({ slug: cc.slug.split("/") }));
    }
  });

  return slugs;
};

export default async ({
  params,
}: PageParamsProps<typeof generateStaticParams>) => {
  const command = await getCommandBySlug(params.slug);
  return <div>{command.content}</div>;
};
