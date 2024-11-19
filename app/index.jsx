import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Hangar() {
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        const user = SecureStore.getItem("user");

        if (user) {
            setLogged(true);
        }
    }, []);

    if (!isLogged) {
        return <Redirect href={"/login"} />
    }

    return <Redirect href={"/home/feedstuff/feed"} />
};
