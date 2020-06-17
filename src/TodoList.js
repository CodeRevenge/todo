import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <View style={Styles.container}>
      <FlatList
        data={[
          { id: 1, text: "React native" },
          { id: 2, text: "React Expo" },
          { id: 3, text: "React CLI" },
        ]}
        renderItem={({ item }) => <TodoItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 500,
  },
});

export default TodoList;
