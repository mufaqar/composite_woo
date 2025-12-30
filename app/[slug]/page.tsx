import Banner from "@/components/Banner";
import client from "@/lib/apollo-client";
import { GET_PAGE_BY_SLUG } from "@/lib/queries/getPageBySlug";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { data } = await client.query<{ page: any }>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  const page = data?.page;

  if (!page) return notFound();

  return (
    <main>
      <Banner
        title={page.title}
        img={page?.featuredImage?.node?.mediaItemUrl}
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
    </main>
  );
}
