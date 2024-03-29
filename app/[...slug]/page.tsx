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
import { LayoutAside } from "~/components/LayoutAside";
import { Main } from "~/components/Main";
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

  return (
    <>
      <Main>
        <article>
          <header>
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
      </Main>
      <LayoutAside>
        {doc.headings.length > 0 ? (
          <div className="pt-10">
            <h3 className="font-bold mb-3">Sur cette page</h3>
            <ul className="text-sm text-gray-500">
              {doc.headings.map((h) => (
                <li
                  key={h.value}
                  className={cn(
                    "mb-2",
                    h.depth === 3 && "ml-3",
                    "hover:text-gray-700 hover:dark:text-gray-400"
                  )}
                >
                  <a href={`#${createSlug(h.value)}`}>{h.value}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </LayoutAside>
    </>
  );
};
