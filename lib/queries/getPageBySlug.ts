import { gql } from "@apollo/client";

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!, $idType: PageIdType = URI) {
    page(id: $slug, idType: $idType) {
      id
      slug
      title
      content
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
    }
  }
`;
