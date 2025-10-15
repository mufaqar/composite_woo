// lib/api/getHomeData.ts
import client from "@/lib/apollo-client";
import { GET_HOME } from "../queries/GetFrontPage";
import { GetHomeQuery } from "../gql-types";


export async function getHomeData() {
  const { data } = await client.query<GetHomeQuery>({ query: GET_HOME });
  return data?.page?.homeInfo || {};
}
