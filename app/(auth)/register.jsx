import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { EmailInput, PasswordInput } from "../../components/input/InputComponent";
import { useRouter } from "expo-router";
import AuthService from "../../services/AuthService";

import { login_styles } from "./login_styles";

export default function Register() {
    const router = useRouter();

    // Credenciales
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Mensajes de error
    const missclick = "Fields can't be left empty."
    const user_is_dumb = "User already exists."
    const [err, setError] = useState();

    const mail_err = "Invalid email."
    const pass_err = "Password must be 8 characters or longer."

    const [showError, setShowError] = useState(
        login_styles.LittleInvisibleText
    );

    const [showMailError, setShowMailError] = useState(
        login_styles.LittleInvisibleText
    );

    const [showPassError, setShowPassError] = useState(
        login_styles.LittleInvisibleText
    );

    useEffect(() => {
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email) && email !== "")
            setShowMailError(
                login_styles.LittleInputErrorText
            );
        else
            setShowMailError(
                login_styles.LittleInvisibleText
            );
    }, [email]);

    useEffect(() => {
        if (password.length != 0 && password.length < 8)
            setShowPassError(
                login_styles.LittleInputErrorText
            );
        else
            setShowPassError(
                login_styles.LittleInvisibleText
            );

    }, [password]);

    const register = async () => {
        if (name === "" || email === "" || password === "") {
            setError(missclick);
            setShowError(
                login_styles.LittleErrorText
            );

            return;
        }

        const user = await AuthService.register(
            name,
            email,
            password
        );

        if (user.code === 401) {
            setError(user_is_dumb);
            setShowError(
                login_styles.LittleErrorText
            );
        } else {
            setShowError(
                login_styles.LittleInvisibleText
            );

            router.back();
        }
    };

    return (
        <View style={login_styles.Outer}>
            <View
                style={login_styles.MainRegisterView}
            >
                <Text style={login_styles.BigTitleText}>Create Account</Text>

                <Text style={login_styles.LittleNormalText}>Username</Text>
                <EmailInput updateInput={setName} />

                <Text style={login_styles.LittleNormalText}>Email</Text>
                <EmailInput updateInput={setEmail} />
                <TextInput editable={false} style={showMailError}>{mail_err}</TextInput>

                <Text style={login_styles.LittleNormalText}>Password</Text>
                <PasswordInput updateInput={setPassword} />
                <TextInput editable={false} style={showPassError}>{pass_err}</TextInput>

                <TextInput editable={false} style={showError}>{err}</TextInput>

                <Button title="Register" onPress={register} />

                {/* Sacamos <Link> así no se acumula mugre en el stack */}
                <Pressable onPress={() => router.back()}>
                    <Text style={login_styles.LittleLinkText}>Already have an account?
                        <Text style={login_styles.LittleRedirectText}> Log in.</Text>
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};
