import { ENV } from "~/utils/env";
import {
  getDocumentBySlug,
  getDocumentTree,
  getRecursiveSlugs,
} from "~/mdx/document";
import { PageParamsProps } from "~/types/generics";

export const generateStaticParams = async () => {
  const document = await getDocumentTree("content/cli");
  return getRecursiveSlugs(document!);
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
