import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

const TodoItem = ({ item }) => {
  return <Text style={Styles.item}>{item.text}</Text>;
};

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const Styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 24,
  },
});

export default TodoItem;
