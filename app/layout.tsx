import "./globals.css";
import { getCommandsTree } from "~/mdx/commands/functions";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { RecursiveNavItems } from "~/components/RecursiveNavItems";

export default async (p: { children: ReactNode }) => {
  const commands = await getCommandsTree();
  const headerHeight = "5rem";

  return (
    <html lang="fr">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header
          className="sticky top-0 bg-blue-200 z-10"
          style={{ height: headerHeight }}
        >
          This is the header
        </header>
        <div className="grid grid-cols-[min-content_auto]">
          <aside
            className="bg-red-200 sticky p-10 overflow-y-auto"
            style={{
              top: headerHeight,
              height: `calc(100vh - ${headerHeight})`,
            }}
          >
            <nav>
              <RecursiveNavItems commands={commands} />
            </nav>
          </aside>
          <main className="bg-green-200">{p.children}</main>
        </div>
      </body>
    </html>
  );
};
