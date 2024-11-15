import { Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export function BaseButton({ icon, size, color, execute }) {
    return (
        <Pressable onPress={execute}>
            <Ionicons size={size} name={icon} color={color}/>
        </Pressable>
    );
};
