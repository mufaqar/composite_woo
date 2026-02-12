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
          video_image
          image {
            node {
              mediaItemUrl
            }
          }
          video
        }
          ... on PostInfoPostContentFullWidthImageLayout {
            fullImage {
              node {
                mediaItemUrl
              }
            }
          
          }
           ... on PostInfoPostContentBgBoxLayout {
          title
          box {
            content
            layout
            type
          }
        }
        ... on PostInfoPostContentLeftBorderBoxLayout {
          title
          box {
            layout
            content
          }
        }
            
        }
      }
    }
  }
`;
