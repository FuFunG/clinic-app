import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";

import { Colors } from "../constants";

type Props = {
  loading: boolean;
  onRefresh: () => void;
  refreshing: boolean;
};

const EmptyLoading = ({ loading, onRefresh, refreshing }: Props) => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 50,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text
            style={{
              color: Colors.Gray[500],
              fontSize: 18,
            }}
          >
            No Conculstaions
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default EmptyLoading;
