import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import PropTypes from "prop-types";
import { GRAPHQL_ENDPOINT } from "../config";
import { insertUsers } from "../data/mutations";

import { TodoList } from "./index";

const Main = ({ token, user }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const { id, name, isNewUser } = user;

    const client = new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (isNewUser) {
      client.mutate({
        mutation: insertUsers,
        variables: { id, name },
      });
    }

    setClient(client);
  }, []);

  if (!client) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ApolloProvider client={client}>
      <View>
        <TodoList />
      </View>
    </ApolloProvider>
  );
};

Main.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Main;
