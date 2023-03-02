import "./globals.css";
import { getDocumentTree } from "~/mdx/document";
import { ReactNode } from "react";
import { RecursiveNavItems } from "~/components/RecursiveNavItems";

export default async (p: { children: ReactNode }) => {
  const cliDocument = await getDocumentTree("content/cli");
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
        <div className="grid grid-cols-[250px_auto]">
          <aside
            className="bg-red-200 sticky p-10 overflow-y-auto"
            style={{
              top: headerHeight,
              height: `calc(100vh - ${headerHeight})`,
            }}
          >
            <nav>
              {cliDocument ? (
                <RecursiveNavItems document={cliDocument} />
              ) : null}
            </nav>
          </aside>
          <main className="bg-green-200">{p.children}</main>
        </div>
      </body>
    </html>
  );
};
