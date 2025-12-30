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
            mediaItemUrl
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
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`;

export const Query_ClientLogo = gql`
  query ClientLogos($first: Int = 10) {
    clientLogos(first: $first) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`;

export const Query_Post_Categories = gql`
  query PostCategories {
    categories {
      nodes {
        slug
        name
      }
    }
  }
`;

export const GET_POST_BY_CAT = gql`
  query getpostbycat($id: ID!) {
    category(id: $id, idType: SLUG) {
      name
      posts {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  }
`;
