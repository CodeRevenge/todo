import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import PropTypes from "prop-types";
import { GRAPHQL_ENDPOINT } from "../config";
import { INSERT_USERS } from "../data/mutations";

import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

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
        mutation: INSERT_USERS,
        variables: { id, name },
      });
    }

    setClient(client);
  }, []);

  if (!client) {
    return <ActivityIndicator size="large" color="" />;
  }

  return (
    <ApolloProvider client={client}>
      <View>
        <AddTodo />
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
