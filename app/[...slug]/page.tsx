import { ENV } from "~/utils/env";
import {
  getDocumentBySlug,
  getDocumentTree,
  getRecursiveSlugs,
} from "~/mdx/document";
import { PageParamsProps } from "~/types/generics";
import { cn } from "~/utils/cn";
import Image from "next/image";
import { createSlug } from "~/utils/functions.server";
export const generateStaticParams = async () => {
  // UGLY !
  // RangeError: Maximum call stack size exceeded on 404...
  return getRecursiveSlugs(
    (await getDocumentTree("content/code"))!,
    getRecursiveSlugs((await getDocumentTree("content/cli"))!)
  );
};

export default async ({
  params,
}: PageParamsProps<typeof generateStaticParams>) => {
  const doc = await getDocumentBySlug(params.slug);
  const headerHeight = "4rem";
  return (
    <>
      <main
        className={cn(
          "prose prose-h1:text-center",
          "prose-code:before:hidden prose-code:after:hidden",
          "dark:prose-invert",
          "max-w-2xl mx-auto w-full"
        )}
      >
        <article>
          <header className="mt-10">
            {doc.frontmatter.image ? (
              <div className="flex justify-center h-[200px] relative">
                <Image
                  className="object-contain m-0"
                  src={`${ENV.IMAGE_URL}/${doc.frontmatter.image}`}
                  alt={doc.frontmatter.title}
                  fill
                />
              </div>
            ) : (
              <h1>{doc.frontmatter.title}</h1>
            )}
          </header>
          <main className="max-w-2xl mx-auto">{doc.content}</main>
        </article>
      </main>
      <aside
        className="sticky overflow-y-auto pt-10"
        style={{
          top: headerHeight,
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        {doc.headings.length > 0 ? (
          <>
            <h3 className="font-bold mb-3">Sur cette page</h3>
            <ul className="text-sm text-gray-500">
              {doc.headings.map((h) => (
                <li key={h.value} className={`${h.depth} mb-2`}>
                  <a href={`#${createSlug(h.value)}`}>{h.value}</a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </aside>
    </>
  );
};
