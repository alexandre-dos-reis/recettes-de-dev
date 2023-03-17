import "./globals.css";
import "./prism-theme.css";
import { getDocumentTree } from "~/mdx/document";
import { ReactNode } from "react";
import { Nav } from "~/components/Nav";
import { cn } from "~/utils/cn";
import { Header } from "~/components/Header";

export default async (p: { children: ReactNode }) => {
  const cliDocument = await getDocumentTree("content/cli");
  const codeDocument = await getDocumentTree("content/code");

  const headerHeight = "4rem";
  return (
    <html lang="fr">
      <body
        className={cn(
          "bg-slate-100 text-gray-900 fill-gray-900",
          "dark:bg-[#111] dark:text-gray-100 dark:fill-gray-100"
        )}
      >
        <Header
          className={cn("sticky top-0 z-10")}
          style={{ height: headerHeight }}
        />
        <div className={cn("grid grid-cols-[250px_auto]")}>
          <aside
            className={cn("sticky p-10 overflow-y-auto")}
            style={{
              top: headerHeight,
              height: `calc(100vh - ${headerHeight})`,
            }}
          >
            {cliDocument && codeDocument ? (
              <Nav docs={[cliDocument, codeDocument]} />
            ) : null}
          </aside>
          <main className={cn("")}>{p.children}</main>
        </div>
      </body>
    </html>
  );
};
