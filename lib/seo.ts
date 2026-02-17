import client from "./apollo-client";
import { gql } from "@apollo/client";

interface PageByQuery {
  pageBy: {
    seo?: {
      title?: string;
      metaDesc?: string;
    };
  } | null;
}

export async function generateWPMetadata(uri: string) {
  const result = await client.query<PageByQuery>({
    query: gql`
      query GetMetadata($uri: String!) {
        pageBy(uri: $uri) {
          seo {
            title
            metaDesc
          }
        }
      }
    `,
    variables: { uri },
  });

  const data = result.data;

  if (!data?.pageBy?.seo) {
    return { title: "Default Title", description: "" };
  }

  return {
    title: data.pageBy.seo.title || "Default Title",
    description: data.pageBy.seo.metaDesc || "",
  };
}
