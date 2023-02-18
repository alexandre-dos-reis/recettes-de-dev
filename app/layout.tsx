import "./globals.css";
import { getCommandsTree } from "~/mdx/commands/functions";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

export default async (p: { children: ReactNode }) => {
  const commands = await getCommandsTree();

  return (
    <html lang="fr">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header className="sticky top-0 bg-blue-400 z-10 h-20">
          This is the header
        </header>
        <div className="grid grid-cols-[min-content_auto]">
          <nav className="bg-red-400 sticky top-20 p-10 h-[calc(100vh-5rem)]">
            {commands.map((s) => (
              <Fragment key={s.id}>
                <Link className="block" href={s.slug}>
                  {s.fm?.title}
                </Link>
                {s.children?.length === 0 ? null : (
                  <div>
                    {s.children?.map((c) => (
                      <Link className="block ml-5" key={c.id} href={c.slug}>
                        {c.fm?.title}
                      </Link>
                    ))}
                  </div>
                )}
              </Fragment>
            ))}
          </nav>
          <main className="bg-green-400">{p.children}</main>
        </div>
        {/* <footer></footer> */}
      </body>
    </html>
  );
};
