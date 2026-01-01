import { gql } from "@apollo/client";

export const GET_ThemeOption = gql`
 query ThemeOption {
  themeOptions {
    footerInfo {
      address
      productMenu {
        title
        link
      }
      emailAddress
      tel
    }
  }
}
`;


export interface ThemeOptionQuery {
  themeOptions: {
    footerInfo: FooterInfo;
  };
}

export interface FooterInfo {
  address: string;
  emailAddress: string;
  tel: string;
  productMenu: ProductMenuItem[];
}

export interface ProductMenuItem {
  title: string;
  link: string;
}
