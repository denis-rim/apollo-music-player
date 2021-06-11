import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://apollo-player2021.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "9K1imn4Khvpefy5k5uyc7MoCHgH6s0Sxeh1WBN6dp4UrxZHr1whg6S6V9WR4dky0",
  },
});
