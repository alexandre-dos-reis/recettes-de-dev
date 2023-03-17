import { ENV } from "~/utils/env";
import {
  getDocumentBySlug,
  getDocumentTree,
  getRecursiveSlugs,
} from "~/mdx/document";
import { PageParamsProps } from "~/types/generics";
import { cn } from "~/utils/cn";

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
    <article
      className={cn(
        "max-w-2xl mx-auto",
        "prose prose-h1:text-center",
        "prose-code:before:hidden prose-code:after:hidden",
        "dark:prose-invert"
      )}
    >
      <header className="mt-10">
        {doc.frontmatter.image ? (
          <img src={`${ENV.IMAGE_URL}/${doc.frontmatter.image}`} />
        ) : (
          <h1>{doc.frontmatter.title}</h1>
        )}
      </header>
      <main>{doc.content}</main>
      {doc.headings.length > 0 ? (
        <nav>
          <ul>
            {doc.headings.map((h) => (
              <li key={h.value} className={`${h.depth}`}>
                {h.value}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  );
};
