import client from "./apollo-client";
import { gql } from "@apollo/client";

interface PageByQuery {
  pageBy: {
    seo?: {
      title?: string;
      metaDesc?: string;
      canonical?: string;
    };
  } | null;
}

interface Metadata {
  title: string;
  description: string;
  canonical: string;
}

export async function generateWPMetadata(uri: string): Promise<Metadata> {
  const result = await client.query<PageByQuery>({
    query: gql`
      query GetMetadata($uri: String!) {
        pageBy(uri: $uri) {
          seo {
            title
            metaDesc
            canonical
          }
        }
      }
    `,
    variables: { uri },
  });

  // TypeScript sees result.data as possibly undefined, so we add a check
  if (!result || !result.data || !result.data.pageBy?.seo) {
    return { title: "Default Title", description: "", canonical: "" };
  }

  return {
    title: result.data.pageBy.seo.title || "Default Title",
    description: result.data.pageBy.seo.metaDesc || "",
     canonical: result.data.pageBy.seo.canonical || "",
  };
}
