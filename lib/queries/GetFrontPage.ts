import { gql } from "@apollo/client";

export const GET_HOME = gql`
  query GetFrontPage {
    page(id: "2", idType: DATABASE_ID) {
      title
      homeInfo {
        sliderInfo {
          ...HomeInfoSliderInfoFragment
        }
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
        advantages {
          ...HomeInfoAdvantagesFragment
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

  fragment HomeInfoSliderInfoFragment on HomeInfoSliderInfo {
    subTitle
    title
  }

  fragment HomeInfoWhyChooseUsFragment on HomeInfoWhyChooseUs {
    title
    subTitle
  }

  fragment HomeInfoProductRangeFragment on HomeInfoProductRange {
    title
    subTitle
    categoryInfo {
      title
      link
      desc
      image {
        node {
          mediaItemUrl
        }
      }
    }
  }

  fragment HomeInfoTrendingProductsFragment on HomeInfoTrendingProducts {
    title
    subTitle
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
  fragment HomeInfoAdvantagesOptionsFragment on HomeInfoAdvantagesOptions {
    description
    icon {
      node {
        mediaItemUrl
      }
    }
    title
  }

  fragment HomeInfoAdvantagesFragment on HomeInfoAdvantages {
    title
    subTitle
    options {
      ...HomeInfoAdvantagesOptionsFragment
    }
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
