import { TextInput } from "react-native";

import { input_styles } from "./InputStyles.js";

export function InputComponent({ updateInput }) {
    return (
        <TextInput
            style={input_styles.Input}
            onChangeText={updateInput}
        />
    );
};

export function EmailInput({ updateInput }) {
    return <InputComponent updateInput={updateInput} />
};

export function PasswordInput({ updateInput }) {
    return (
        <TextInput
            style={input_styles.Input}
            onChangeText={updateInput}
            secureTextEntry={true}
        />
    );
};
