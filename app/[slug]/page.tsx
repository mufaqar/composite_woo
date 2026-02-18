import Banner from "@/components/Banner";
import client from "@/lib/apollo-client";
import { GET_PAGE_BY_SLUG } from "@/lib/queries/getPageBySlug";
import { generateWPMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

interface SEOData {
  seo?: {
    title?: string;
    metaDesc?: string;
    canonical?: string;    
  };
  slug: string;
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;

  try {
    const { data } = await client.query<{ page: SEOData }>({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
    });

    const page = data?.page;

    if (!page) return generateWPMetadata(''); // fallback

    // Only pass a string (e.g., page.slug or page.seo.title)
    return generateWPMetadata(page.seo?.title || page.slug);
  } catch (err) {
    return generateWPMetadata(''); // fallback
  }
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
