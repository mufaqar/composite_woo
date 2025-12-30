import { gql } from "@apollo/client";

export const GET_FAQS = gql`
  query GetFaqs {
      faqs {
        nodes {
          title
          content
        }
      
    }
  }
`;
