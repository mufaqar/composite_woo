import { gql } from "@apollo/client";

export const GET_HOME = gql`
  query GetFrontPage {
    page(id: "2", idType: DATABASE_ID) {
      title
      homeInfo {
        whyChooseUs {
          ...HomeInfoWhyChooseUsFragment
           whyCards {
          ...HomeInfoWhyChooseUsWhyCardsFragment
        }
        }
        productRange {
          ...HomeInfoProductRangeFragment
        }
        trendingProducts {
          ...HomeInfoTrendingProductsFragment
        }
        whyWereDifferent {
          title
          subTitle
          options {
            ...HomeInfoWhyWereDifferentOptionsFragment1
          }
        }
        customersInnovate {
          ...HomeInfoCustomersInnovateFragment
        }
        dreamOutdoor {
          ...HomeInfoDreamOutdoorFragment
        }
      }
    }
  }

  fragment HomeInfoWhyChooseUsFragment on HomeInfoWhyChooseUs {
    title
    subTitle
  }

  fragment HomeInfoProductRangeFragment on HomeInfoProductRange {
    title
    subTitle
  }

  fragment HomeInfoTrendingProductsFragment on HomeInfoTrendingProducts {
    title
    subTitle
  }

  fragment HomeInfoWhyWereDifferentOptionsFragment1 on HomeInfoWhyWereDifferentOptions {
    title
    description
    icon {
      node {
        mediaItemUrl
      }
    }
  }

  fragment HomeInfoCustomersInnovateFragment on HomeInfoCustomersInnovate {
    title
    description
    customerName
    customerFeeback
  }

  fragment HomeInfoDreamOutdoorFragment on HomeInfoDreamOutdoor {
    title
    subTitle
  }
    fragment HomeInfoWhyChooseUsWhyCardsFragment on HomeInfoWhyChooseUsWhyCards {
  description
  title
  icon {
    node {
      mediaItemUrl
    }
  }
}
`;
