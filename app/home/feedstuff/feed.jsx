import { Text, Button, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Feed() {
    const router = useRouter();
    return (
        <View
            style={styles.Feed}
        >
            <Text style={{ fontWeight: "bold" }}>Feed</Text>
            <Button title="X" onPress={() => {router.push("./randomprofile")}} />
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
