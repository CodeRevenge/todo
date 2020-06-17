import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { UPDATE_TODO, DELETE_TODO } from "../data/mutations";
import { GET_TODOS } from "../data/queries";

const TodoItem = ({ item }) => {
  const { id, text, is_completed } = item;
  const [
    deleteTodo,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_TODO);
  const [
    updateTodo,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_TODO);

  if (deleteError || updateError) return <Text>`Error! ${error.message}`</Text>;

  return (
    <View style={Styles.container}>
      <Text
        style={[Styles.icon, is_completed ? Styles.completed : {}]}
        onPress={() => {
          if (!updateLoading) {
            updateTodo({
              variables: { id, isCompleted: !is_completed },
            });
          }
        }}
      >
        {is_completed ? "✔️" : "❌"}
      </Text>
      <Text style={[Styles.item, is_completed ? Styles.completed : {}]}>
        {text}
      </Text>
      <TouchableOpacity
        style={Styles.deleteBtn}
        onPress={() => {
          deleteTodo({
            variables: { id },
            refetchQueries: [{ query: GET_TODOS }],
          });
        }}
        disabled={deleteLoading}
      >
        <Text style={Styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  item: {
    padding: 10,
    fontSize: 24,
  },
  completed: {
    color: "lightgray",
  },
  deleteBtn: {
    marginLeft: "auto",
    backgroundColor: "green",
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
});

export default TodoItem;
