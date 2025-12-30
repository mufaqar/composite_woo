// src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://woocommerce-1531534-5907732.cloudwaysapps.com/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
