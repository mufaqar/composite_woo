// lib/api/getHomeData.ts
import client from "@/lib/apollo-client";
import { GET_HOME } from "../queries/GetFrontPage";
import {
  ClientsResponse,
  Faq,
  GetFaqByCatQuery,
  GetHomeQuery,
  GetPostsByCategorySlugQuery,
  GetPostsQuery,
  Inspiration,
  InspirationsResponse,
  Post,
} from "../gql-types";
import {
  GET_INSPIRATIONS,
  GET_POST_BY_CAT,
  GET_POSTS,
  Query_ClientLogo,
} from "../queries/getPosts";
import { GET_FAQ_BY_CAT } from "../queries/getFaqsbyCat";
import { AboutPageQuery, GET_ABOUT } from "../queries/GetAbout";

export async function getHomeData() {
  const { data } = await client.query<GetHomeQuery>({ query: GET_HOME });
  return data?.page?.homeInfo || {};
}

export async function getBlogData(): Promise<Post[]> {
  try {
    const { data } = await client.query<GetPostsQuery>({
      query: GET_POSTS,
      variables: { first: 6 }, // optional
    });

    // Ensure only valid posts are returned
    return (data?.posts?.nodes ?? []).filter((p): p is Post => !!p);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getPostByCateSlug(slug: string): Promise<Post[]> {
  try {
    const { data } = await client.query<GetPostsByCategorySlugQuery>({
      query: GET_POST_BY_CAT,
      variables: { id: slug }, // ✅ correct variable name for WPGraphQL
    });

    const posts = data?.category?.posts?.nodes ?? [];
    return posts.filter((p): p is Post => !!p);
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return [];
  }
}

export async function getInspirtionData(): Promise<Inspiration[]> {
  try {
    const { data } = await client.query<InspirationsResponse>({
      query: GET_INSPIRATIONS,
    });

    // Ensure only valid posts are returned
    return data?.inspirations?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getClientLogoData(): Promise<Inspiration[]> {
  try {
    const { data } = await client.query<ClientsResponse>({
      query: Query_ClientLogo,
    });

    // Ensure only valid posts are returned
    return data?.clientLogos?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Fetch FAQs by category slug (e.g., "home")
 */
export async function getFaqData(
  categorySlug: string = "home"
): Promise<Faq[]> {
  try {
    const { data } = await client.query<GetFaqByCatQuery>({
      query: GET_FAQ_BY_CAT,
      variables: { id: categorySlug },
    });

    return (data?.faqtype?.faqs?.nodes ?? []).filter(
      (faq): faq is Faq => !!faq
    );
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export async function getAboutPageData() {
  try {
    const { data } = await client.query<AboutPageQuery>({
      query: GET_ABOUT,
    });

    const page = data?.page;
    const aboutUs = page?.aboutInfo?.aboutUs;
    const shopOnline = page?.aboutInfo?.shopOnline;

    return {
      title: page?.title ?? "",
      aboutUs: aboutUs
        ? {
            title: aboutUs.title ?? "",
            description: aboutUs.description ?? "",
            image: aboutUs.aboutImage?.node?.mediaItemUrl ?? "",
          }
        : null,
      shopOnline: shopOnline
        ? {
            title: shopOnline.title ?? "",
            subTitle: shopOnline.subTitle ?? "",
            description: shopOnline.description ?? "",
            whyCards:
              shopOnline.whyCards?.map((card) => ({
                title: card?.title ?? "",
                description: card?.description ?? "",
                icon: card?.icon?.node?.mediaItemUrl ?? "",
              })) ?? [],
          }
        : null,
    };
  } catch (error) {
    console.error("Error fetching About Page:", error);
    return null;
  }
}
