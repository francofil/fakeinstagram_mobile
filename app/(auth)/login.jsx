import { Text, View } from "react-native";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

import { login_styles } from "./login_styles";
import { InputComponent } from "../../components/input/InputComponent";

export default function Login() {

    const save = async (value) => {
        await SecureStore.setItemAsync("user", value);
    };

    return (
        <View style={login_styles.Outer}>
            <View
                style={login_styles.MainView}
            >
                <Text>.</Text>
                <InputComponent />
            </View>
        </View>
    );
};
