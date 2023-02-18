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
      {/* h-[calc(100vh-2.5rem)] */}
      <head />
      <body className="h-full min-h-full relative">
        <header className="sticky top-0 bg-blue-400 z-10 h-10">
          This is the header
        </header>
        <div className=" relative min-h-[100vh]">
          <div className="grid grid-cols-[min-content_auto] relative ">
            <nav className="bg-red-400 sticky top-10 p-10 h-[calc(100vh-2.5rem)]">
              {commands.map((s) => (
                <Fragment key={s.id}>
                  <Link className="block" href={s.slug}>
                    {s.fm?.title}
                  </Link>
                  {s.children?.length !== 0 ? (
                    <div>
                      {s.children?.map((c) => (
                        <Link className="block ml-5" key={c.id} href={c.slug}>
                          {c.fm?.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </nav>
            <main className="bg-green-400">{p.children}</main>
          </div>
        </div>
        {/* <footer></footer> */}
      </body>
    </html>
  );
};
