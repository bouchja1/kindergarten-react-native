import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  bubble: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#ffbbbb",
    padding: 4,
    borderRadius: 4,
    borderColor: "#ffbbbb",
    borderWidth: 1
  },
  count: {
    color: "#fff",
    fontSize: 13
  }
});

const ClusterMarker = ({ count }) => (
  <View style={styles.container}>
    <View style={styles.bubble}>
      <Text style={styles.count}>{count}</Text>
    </View>
  </View>
);

export default ClusterMarker;