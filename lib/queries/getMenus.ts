import { gql } from "@apollo/client";
import client from "../apollo-client";

export const GET_Menus = gql`
 query Menus {
   menu(id: "primary_menu", idType: LOCATION) {
    id
    name
    menuItems {
      nodes {
        id
        label
        path
      }
    }
  }
}
`;
// graphql/types.ts

export interface MenuQuery {
  menu: Menu | null;
}

export interface Menu {
  id: string;
  name: string;
  menuItems: MenuItems;
}

export interface MenuItems {
  nodes: MenuItemNode[];
}

export interface MenuItemNode {
  id: string;
  label: string;
  path: string;
}


export type MenuItemType = {
  id: string;
  label: string;
  path: string;
};

export const getMenuItems = async (): Promise<MenuItemType[]> => {
  const { data } = await client.query<MenuQuery>({
    query: GET_Menus,
  });

  return data?.menu?.menuItems.nodes || [];
};