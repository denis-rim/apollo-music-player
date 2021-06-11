import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  subscription getSongs {
    songs(order_by: { created_at: desc }) {
      artist
      created_at
      duration
      thumbnail
      title
    }
  }
`;
