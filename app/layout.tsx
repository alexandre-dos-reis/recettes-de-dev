import "./globals.css";
import { getCommandsTree } from "~/mdx/commands/functions";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  children: React.ReactNode;
}

export default async (p: Props) => {
  const commands = await getCommandsTree();

  return (
    <html lang="fr">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header></header>
        <div>
          <nav>
            {commands.map((s) => (
              <Fragment key={s.id}>
                <Link style={{ display: "block" }} href={s.slug}>
                  {s.fm?.title}
                </Link>
                {s.children?.length !== 0 ? (
                  <div style={{ paddingLeft: 20 }}>
                    {s.children?.map((c) => (
                      <Link
                        key={c.id}
                        style={{ display: "block" }}
                        href={c.slug}
                      >
                        {c.fm?.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </Fragment>
            ))}
          </nav>
          <main>{p.children}</main>
        </div>
        <footer></footer>
      </body>
    </html>
  );
};
