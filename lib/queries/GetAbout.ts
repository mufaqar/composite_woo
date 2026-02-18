import { gql } from "@apollo/client";

export const GET_ABOUT = gql`
query AboutPage {
  page(id: "16700", idType: DATABASE_ID) {
    title
    slug
    seo {
        title
        metaDesc
        canonical
    }
    aboutInfo {
      aboutUs {
        ...AboutInfoAboutUsFragment
      }
      shopOnline {
        ...AboutInfoShopOnlineFragment
      }
    }
  }
}

fragment MediaItemFragment on MediaItem {
  mediaItemUrl
}
fragment AcfMediaItemConnectionEdgeFragment on AcfMediaItemConnectionEdge {
  node {
    ...MediaItemFragment
  }
}
fragment AboutInfoAboutUsFragment on AboutInfoAboutUs {
  title
  description
  aboutImage {
    ...AcfMediaItemConnectionEdgeFragment
  }
}

fragment AboutInfoShopOnlineFragment on AboutInfoShopOnline {
  description
  subTitle
  title
  whyCards {
    description
    title
    icon {
      ...AcfMediaItemConnectionEdgeFragment
    }
  }
}
`;


export type AboutPageQuery = {
  page?: {
    title?: string | null;
    slug?: string | null;
    seo?: {
      title?: string | null;
      metaDesc?: string | null;
      canonical?: string;
    } | null;
    aboutInfo?: {
      aboutUs?: {
        title?: string | null;
        description?: string | null;
        aboutImage?: {
          node?: {
            mediaItemUrl?: string | null;
          } | null;
        } | null;
      } | null;
      shopOnline?: {
        title?: string | null;
        subTitle?: string | null;
        description?: string | null;
        whyCards?: Array<{
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

// Normalized type for returning from getAboutPageData
export interface AboutUs {
  title: string;
  description: string;
  image: string;
}

export interface WhyCard {
  title: string;
  description: string;
  icon: string;
}

export interface ShopOnline {
  title: string;
  subTitle: string;
  description: string;
  whyCards: WhyCard[];
}

export interface SEO {
  title: string;
  metaDesc: string;
  canonical: string;
}

export interface AboutPageData {
  title: string;
  slug: string;
  seo: SEO;
  aboutUs: AboutUs | null;
  shopOnline: ShopOnline | null;
}
