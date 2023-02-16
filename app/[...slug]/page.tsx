import { getCommandBySlug, getCommandsTree } from "~/mdx/commands/functions";

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

interface Props {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
  searchParams: unknown;
}

export default async (p) => {
  const command = await getCommandBySlug(
    p.params.slug as Props["params"]["slug"]
  );
  return <div>{command.content}</div>;
};
