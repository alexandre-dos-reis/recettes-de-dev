import "./globals.css";
import { getCommandsTree } from "~/mdx/commands/functions";
import { ReactNode } from "react";
import { RecursiveNavItems } from "~/components/RecursiveNavItems";

export default async (p: { children: ReactNode }) => {
  const command = await getCommandsTree();
  const headerHeight = "5rem";
  return (
    <html lang="fr">
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
              {command ? <RecursiveNavItems command={command} /> : null}
            </nav>
          </aside>
          <main className="bg-green-200">{p.children}</main>
        </div>
      </body>
    </html>
  );
};
