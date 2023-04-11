import "~/styles/globals.css";
import "~/styles/prism-theme.css";
import { getDocumentTree } from "~/mdx/document";
import { ReactNode } from "react";
import { Nav } from "~/components/Nav";
import { cn } from "~/utils/cn";
import { Header } from "~/components/Header";
import { LayoutAside } from "~/components/LayoutAside";
import { headerHeight } from "~/styles/constants";
import { SortSection } from "~/components/SortSection";

export default async (p: { children: ReactNode }) => {
  const cliDocument = await getDocumentTree("content/cli");
  const codeDocument = await getDocumentTree("content/code");

  return (
    // Usefull for not getting headings behind the header
    <html lang="fr" className="scroll-pt-20">
      <body
        className={cn(
          "bg-slate-100 text-gray-900 fill-gray-900",
          "dark:bg-[#111] dark:text-gray-100 dark:fill-gray-100"
        )}
      >
        <Header
          style={{ height: headerHeight }}
          className={cn("sticky top-0 z-10")}
        />
        <div className={cn("grid grid-cols-[20vw_auto_20vw]")}>
          <LayoutAside>
            <SortSection />
            {cliDocument && codeDocument ? (
              <Nav docs={[cliDocument, codeDocument]} className="mb-10 mx-10" />
            ) : null}
          </LayoutAside>
          {p.children}
        </div>
      </body>
    </html>
  );
};
