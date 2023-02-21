import Link from "next/link";
import { Fragment } from "react";
import { CommandFile } from "~/mdx/commands/functions";

interface Props {
  commands: CommandFile[];
}

export const RecursiveNavItems = ({ commands }: Props) => {
  return (
    <>
      {commands.map((c) => (
        <Fragment key={c.id}>
          <Link className="block" href={c.slug}>
            {c.frontmatter.nav ?? c.frontmatter?.title}
          </Link>
          {c.children !== null && c.children?.length === 0 ? null : (
            <div className="ml-3">
              <RecursiveNavItems commands={c.children!} />
            </div>
          )}
        </Fragment>
      ))}
    </>
  );
};
