import { Text, View, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';

export default function Profile() {
    const user = JSON.parse(SecureStore.getItem("user"));

    return (
        <View
            style={styles.Profile}
        >
            <Text style={{ fontWeight: "bold" }}>Profile</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Profile: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
