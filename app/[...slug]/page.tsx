import { ENV } from "~/utils/env";
import {
  getDocumentBySlug,
  getDocumentTree,
  getRecursiveSlugs,
} from "~/mdx/document";
import { PageParamsProps } from "~/types/generics";

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
    <div className="max-w-2xl mx-auto">
      <section>
        {doc.frontmatter.image ? (
          <img src={`${ENV.IMAGE_URL}/${doc.frontmatter.image}`} />
        ) : (
          <h1>{doc.frontmatter.title}</h1>
        )}
      </section>
      <section>
        <div>{doc.content}</div>
      </section>
    </div>
  );
};
