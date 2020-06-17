import gql from "graphql-tag";

export const insertUsers = gql`
  mutation($id: String, $name: String) {
    insert_user(objects: { name: $name, id: $id }) {
      affected_rows
    }
  }
`;
