import { gql } from "@apollo/client";

export const GET_SAMPLE = gql`
  query SamplePage {
    page(id: "17886", idType: DATABASE_ID) {
      title
      productSampleInfo {
        sampleInfo {
          ...ProductSampleInfoSampleInfoFragment
        }
        samplesType {
          ...ProductSampleInfoSamplesTypeFragment
        }
      }
    }
  }

  fragment ProductSampleInfoSampleInfoFragment on ProductSampleInfoSampleInfo {
    description
    title
    image {
      node {
        mediaItemUrl
      }
    }
  }

  fragment ProductSampleInfoSamplesTypeFragment on ProductSampleInfoSamplesType {
    description
    title
    samples {
      title
      sampleImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
`;

export type SamplePageQuery = {
  page?: {
    title?: string | null;
    productSampleInfo?: {
      sampleInfo?: {
        title?: string | null;
        description?: string | null;
        image?: {
          node?: {
            mediaItemUrl?: string | null;
          } | null;
        } | null;
      } | null;

      samplesType?: {
        title?: string | null;
        description?: string | null;
        samples?: Array<{
          title?: string | null;
          sampleImage?: {
            node?: {
              mediaItemUrl?: string | null;
            } | null;
          } | null;
        }> | null;
      } | null;
    } | null;
  } | null;
};
