import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { BaseButton } from "../../components/buttons/ButtonComponent";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import ProfileService from "../../services/ProfileService";
import ProfilePicComponent from "../../components/pictures/ProfilePicComponent";

export default function Profile() {
    const router = useRouter();
    const user = JSON.parse(SecureStore.getItem("user"));

    const [user_profile, setProfile] = useState(null);

    const logout = () => {
        SecureStore.deleteItemAsync("user")
            .then(router.replace("/"));
    }

    const settings = () => {
        console.log("Ponele que pasa algo...");
    }

    useEffect(() => {
        const getProfile = async () => {
            const ret = await ProfileService.get_profile(user._id, user.token);

            if (ret.code === 200)
                setProfile(ret.data)
        };

        getProfile();
    }, []);

    if (!user_profile) {
        return <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={styles.TextError}>Oops! An error happened :^)</Text>
        </View>;
    }

    console.log(user_profile)
    return (
        <View style={styles.Outer} >
            <View style={styles.MainView} >
                <View style={styles.HeaderBox}>
                    <ProfilePicComponent size={60} image={user_profile.user.profilePicture} />
                    <Text style={{ flex: 0, fontWeight: "bold" }}>{user_profile.user.username}</Text>
                    <View style={styles.ButtonBox}>
                        <BaseButton
                            icon={"settings-outline"}
                            size={40}
                            color={"black"}
                            execute={settings}
                        />
                        <BaseButton
                            icon={"log-out"}
                            size={40}
                            color={"red"}
                            execute={logout}
                        />
                    </View>
                </View>

                <View style={styles.PicturesBox}>
                    {
                        user_profile.posts.length > 0
                            ? user_profile.posts.map(post, key => {
                                return; // POSTS - POR HACER
                            })
                            : <Text style={styles.TextError}>No posts yet.</Text>
                    }
                </View>
            </View>
        </View>
    );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
    Outer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    MainView: {
        flex: 1,
        maxHeight: window.height * 0.9,
        width: "93%",
        borderRadius: 20,
        marginTop: 20,

        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "white",
    },

    HeaderBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "space-around",

        position: "absolute",
        top: 0,

        width: "100%",
        height: "20%",

        borderWidth: 1,
        borderColor: "black",
    },

    ButtonBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        maxHeight: 40,
        maxWidth: 100,

        borderWidth: 1,
        borderColor: "black",
    },

    PicturesBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "center",

        position: "absolute",
        top: window.height * 0.2,

        width: "100%",
        height: "78%",

        borderWidth: 1,
        borderColor: "black",
    },

    TextError: {
        fontWeight: "bold",
        color: "darkgrey",
    }
});
