import { TextInput } from "react-native";

import { input_styles } from "./InputStyles.js";

export function InputComponent() {
    return (
        <TextInput style={input_styles.Input}/>
    );
}
