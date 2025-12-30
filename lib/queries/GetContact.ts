import { gql } from "@apollo/client";

export const GET_Contact = gql`
query ContactPage {
  page(id: "17858", idType: DATABASE_ID) {
    title
    contactInfo {
      contactUs {
        ...ContactInfoContactUsFragment
      }
      contactDetails {
        ...ContactInfoContactDetailsFragment
      }
    }
  }
}

fragment ContactInfoContactUsFragment on ContactInfoContactUs {
  title
  description
  banner {
    node {
      mediaItemUrl
    }
  }
}

fragment ContactInfoContactDetailsFragment on ContactInfoContactDetails {
  title
  subTitle
  contactBox {
    title
    description
    icon {
      node {
        mediaItemUrl
      }
    }
  }
}

`;


export type ContactPageQuery = {
  page?: {
    title?: string | null;
    contactInfo?: {
      contactUs?: {
        title?: string | null;
        description?: string | null;
        banner?: {
          node?: {
            mediaItemUrl?: string | null;
          } | null;
        } | null;
      } | null;
      contactDetails?: {
        title?: string | null;
        subTitle?: string | null;
        contactBox?: Array<{
          title?: string | null;
          description?: string | null;
          icon?: {
            node?: {
              mediaItemUrl?: string | null;
            } | null;
          } | null;
        }> | null;
      } | null;
    } | null;
  } | null;
};
