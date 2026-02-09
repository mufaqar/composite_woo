import { gql } from "@apollo/client";

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      date
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
            blockImage {
              node {
                mediaItemUrl
                altText
              }
            }
          }
          ... on PostInfoPostContentFullWidthImageLayout {
            fullImage {
              node {
                mediaItemUrl
              }
            }
          
          }
            ... on PostInfoPostContentLineBoxLayout {
          lineboxContent
        }
           ... on PostInfoPostContentBgBoxLayout {
          
          box {
            content
            layout
            type
          }
        }
            
        }
      }
    }
  }
`;
