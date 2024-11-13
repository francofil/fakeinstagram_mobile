import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Hangar() {
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        const getUser = async (key) => {
            let usr = await SecureStore.getItemAsync(key);
            return usr;
        }

        let user = getUser("user");

        /* async-await no funca??? no entiendo nada */
        user.then(usr => { if (usr) { console.log(usr); setLogged(true); } });

        //if (user) {
        //    console.log(user);
        //    setLogged(true);
        //}

    }, []);


    if (!isLogged)
        return <Redirect href={"/login"} />

    return (
        <View>
            <Text>No tendrías que poder ver esto :)</Text>
        </View>
    )
};
