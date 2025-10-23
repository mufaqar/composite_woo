import { gql } from "@apollo/client";

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      postInfo {
        postContent {
          ... on PostInfoPostContentFullContentLayout {
            fullContent
          }
          ... on PostInfoPostContentGetASampleFromUsLayout {
            description
            subTitle
            title
          }
          ... on PostInfoPostContentContentWithImageLayout {
            content
            imagePosition
            icon {
              ...AcfMediaItemConnectionEdgeFragment
            }
          }
        }
      }
    }
  }

  fragment AcfMediaItemConnectionEdgeFragment on AcfMediaItemConnectionEdge {
    node {
      mediaItemUrl
    }
  }
`;
