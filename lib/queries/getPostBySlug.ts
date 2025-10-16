import { gql } from "@apollo/client";

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      excerpt
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      postInfo {
        upperContent {
          ...PostInfoUpperContentFragment
        }
        lowerContent {
          ...PostInfoLowerContentFragment
        }
      }
    }
  }

  fragment PostInfoUpperContentFragment on PostInfoUpperContent {
    data
    dataImage {
      node {
        mediaItemUrl
      }
    }
  }

  fragment PostInfoLowerContentFragment on PostInfoLowerContent {
    data
  }
`;
