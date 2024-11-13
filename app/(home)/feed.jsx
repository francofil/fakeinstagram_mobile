import { Text, View, StyleSheet } from "react-native";

export default function Feed() {
  return (
    <View
      style={styles.Feed}
    >
      <Text>Feed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    Feed: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
