import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "https://apollo-player2021.hasura.app/v1/graphql",
});

const wsLink = new WebSocketLink({
  uri: "wss://apollo-player2021.hasura.app/v1/graphql",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// import ApolloClient from "apollo-boost";
//
// const client = new ApolloClient({
//   uri: "https://apollo-player2021.hasura.app/v1/graphql",
//   headers: {
//     "x-hasura-admin-secret":
//       "9K1imn4Khvpefy5k5uyc7MoCHgH6s0Sxeh1WBN6dp4UrxZHr1whg6S6V9WR4dky0",
//   },
// });

export default client;
