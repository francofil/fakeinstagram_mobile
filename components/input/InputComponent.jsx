import { TextInput } from "react-native";

import { input_styles } from "./InputStyles.js";

export function InputComponent({ updateInput, type }) {
    return (
        <TextInput
            textContentType="password"
            style={input_styles.Input}
            onChangeText={updateInput}

        />
    );
};

export function EmailInput({ updateInput }) {
    return <InputComponent updateInput={updateInput} type={"email"} />
};

export function PasswordInput({ updateInput }) {
    return (
        <TextInput
            textContentType="password"
            style={input_styles.Input}
            onChangeText={updateInput}
            secureTextEntry={true}
        />
    );
};
