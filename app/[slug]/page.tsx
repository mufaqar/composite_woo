import Banner from "@/components/Banner";
import client from "@/lib/apollo-client";
import { GET_PAGE_BY_SLUG } from "@/lib/queries/getPageBySlug";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { data } = await client.query<{ page: any }>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: params.slug },
  });

  const page = data?.page;

  if (!page) return notFound();

  return (
    <main>
      <Banner
        title={page.title}
        img={page?.featuredImage?.node?.sourceUrl}
        desc="" />
        {page.content && (
        <section className="py-16">
          <div className="max-w-[1130px] mx-auto md:px-0 px-4">
            <div
              className="post_content"
              dangerouslySetInnerHTML={{ __html: page.content || "" }}
            />
          </div>
        </section>
      )}
      {/* {page.featuredImage?.node?.sourceUrl && (
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
      /> */}
    </main>
  );
}
