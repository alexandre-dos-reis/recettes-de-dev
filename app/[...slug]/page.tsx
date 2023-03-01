import {
  Command,
  getCommandBySlug,
  getCommandsTree,
  getRecursiveSlugs,
  Slugs,
} from "~/mdx/commands/functions";
import { PageParamsProps } from "~/types/generics";

export const generateStaticParams = async () => {
  const command = await getCommandsTree();
  return getRecursiveSlugs(command);
};

export default async ({
  params,
}: PageParamsProps<typeof generateStaticParams>) => {
  const command = await getCommandBySlug(params.slug);
  return <div>{command.content}</div>;
};
