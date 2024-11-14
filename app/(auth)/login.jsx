import { Button, Text, TextInput, View } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { EmailInput, PasswordInput } from "../../components/input/InputComponent";
import { Link, useRouter } from "expo-router";
import AuthService from "../../services/AuthService";

import { login_styles } from "./login_styles";

export default function Login() {
    const router = useRouter();

    // Credenciales
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Mensajes de error
    const missclick = "Fields can't be left empty."
    const user_is_dumb = "Invalid username or password."
    const [err, setError] = useState();

    const [showError, setShowError] = useState(
        login_styles.LittleInvisibleText
    );

    const login = async () => {
        if (email === "" || password === "") {
            setError(missclick);
            setShowError(
                login_styles.LittleErrorText
            );

            return;
        }

        const user = await AuthService.login(email, password);

        if (user.code === 401) {
            setError(user_is_dumb);
            setShowError(
                login_styles.LittleErrorText
            );
        } else {
            setShowError(
                login_styles.LittleInvisibleText
            );
            
            SecureStore.setItem("user", JSON.stringify(user.data));
            router.replace("/");
        }
    };

    return (
        <View style={login_styles.Outer}>
            <View
                style={login_styles.MainView}
            >
                <Text style={login_styles.BigTitleText}>Fakestagram </Text>

                <Text style={login_styles.LittleNormalText}>Email</Text>
                <EmailInput updateInput={setEmail} />

                <Text style={login_styles.LittleNormalText}>Password</Text>
                <PasswordInput updateInput={setPassword} />

                <TextInput editable={false} style={showError}>{err}</TextInput>

                <Button title="Log in" onPress={login} />

                <Text style={login_styles.LittleLinkText}>Don't have an account?
                    <Link style={login_styles.LittleRedirectText} href={"/register"}> Create one here.</Link>
                </Text>
            </View>
        </View>
    );
};
