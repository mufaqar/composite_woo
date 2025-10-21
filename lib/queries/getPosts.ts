import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($first: Int = 10) {
    posts(first: $first) {
      nodes {
        id
        slug
        title
        excerpt
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
        categories(first: 10) {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_INSPIRATIONS = gql`
  query GetInspration($first: Int = 10) {
    inspirations(first: $first) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;
