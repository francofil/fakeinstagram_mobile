import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Hangar() {
    const router = useRouter(); // por ahora (?)

    const [canContinue, setContinue] = useState(false);
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        const user = SecureStore.getItemAsync("user");

        // Intentamos con async-await pero no quiso funcar. Cositas de react.
        user.then(usr => {
            if (usr) {
                setLogged(true);
            }
            setContinue(true);
        });

    }, []);

    if (!canContinue)
        return;

    if (!isLogged) {
        return <Redirect href={"/login"} />
    }

    return (
        <View>
            <Text>No tendrías que poder ver esto :)</Text>
            <Text>Hacé de cuenta que es el feed</Text>
            <Button onPress={() => {
                SecureStore.deleteItemAsync("user").then(
                    router.replace("/")
                )
            }} title="DESLOGUEAR" />
        </View>
    )
};
