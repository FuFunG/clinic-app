import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../constants";

type Props = {
  title: string;
  onLeftArrowPress: () => void;
  onRightArrowPress: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons
        name={"chevron-left"}
        size={24}
        color={Colors.tintColor}
        style={{ padding: 5 }}
        onPress={props.onLeftArrowPress}
      />
      <Text style={{ textAlign: "center" }}>{props.title}</Text>
      <MaterialCommunityIcons
        name={"chevron-right"}
        size={24}
        color={Colors.tintColor}
        style={{ padding: 10 }}
        onPress={props.onRightArrowPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderBottomColor: Colors.Gray[100],
    borderBottomWidth: 1,
  },
  text: {
    color: "#000",
  },
});
