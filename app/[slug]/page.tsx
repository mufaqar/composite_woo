import client from "@/lib/apollo-client";
import { GET_PAGE_BY_SLUG } from "@/lib/queries/getPageBySlug";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { data } = await client.query({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: params.slug },
  });

  const page = data?.page;

  if (!page) return notFound();

  return (
    <main className="container mx-auto py-10">
      {page.featuredImage?.node?.sourceUrl && (
        <img
          src={page.featuredImage.node.sourceUrl}
          alt={page.featuredImage.node.altText || page.title}
          className="rounded-xl mb-8 w-full max-h-[400px] object-cover"
        />
      )}
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}
