// lib/api/getHomeData.ts
import client from "@/lib/apollo-client";
import { GET_HOME } from "../queries/GetFrontPage";
import { Faq, GetFaqByCatQuery, GetHomeQuery, GetPostsQuery, Post } from "../gql-types";
import { GET_POSTS } from "../queries/getPosts";
import { GET_FAQ_BY_CAT } from "../queries/getFaqsbyCat";


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

/**
 * Fetch FAQs by category slug (e.g., "home")
 */
export async function getFaqData(categorySlug: string = "home"): Promise<Faq[]> {
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
