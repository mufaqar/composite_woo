import { gql } from "@apollo/client";

export const GET_FAQ_BY_CAT = gql`
  query Get_Faq_By_Cat($id: ID = "composite-fencing", $idType: FaqtypeIdType = SLUG) {
    faqtype(id: $id, idType: $idType) {
      faqs {
        nodes {
          title
          content
        }
      }
    }
  }
`;
