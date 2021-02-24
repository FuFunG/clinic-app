import React from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator
} from "react-native";

import { Colors, Layout } from "../constants";

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
};

export default (props: Props) => {

  const handlePress = () => {
    if (!props.loading) {
      props.onPress()
    }
  }
  return (
    <TouchableOpacity onPress={handlePress} style={props.style}>
      <View style={[styles.container, props.containerStyle]}>
        {
          props.loading ?
            <ActivityIndicator size="small" />
            :
            <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    backgroundColor: Colors.tintColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
  },
});
