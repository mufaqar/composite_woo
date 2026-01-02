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
       informationMenu {
        link
        title
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
  informationMenu: InformationMenuItem[];
}

export interface ProductMenuItem {
  title: string;
  link: string;
}

export interface InformationMenuItem {
  title: string;
  link: string;
}

