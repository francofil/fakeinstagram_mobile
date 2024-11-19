import { Text, View, StyleSheet, Dimensions, Image, FlatList } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { BaseButton } from "../../components/buttons/ButtonComponent";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import ProfileService from "../../services/ProfileService";
import ProfilePicComponent from "../../components/pictures/ProfilePicComponent";
import { url } from "../../.url";
import { SettingsModal } from "../../components/modal/settingsModal";

export default function Profile() {
    const router = useRouter();
    const user = JSON.parse(SecureStore.getItem("user"));

    const [user_profile, setProfile] = useState(null);

    const [open, setOpen] = useState(false); // modal config
    const [update, setUpdate] = useState(false); // ir a buscar de nuevo cuando cambiamos algo

    const logout = () => {
        SecureStore.deleteItemAsync("user")
            .then(router.replace("/"));
    };

    const settings = () => {
        setOpen(true);
    };

    const renderImages = (item) => {
        return (
            <View style={styles.Item}>
                <Image
                    style={styles.ItemImage}
                    source={{
                        uri: `${url}/${item.item.imageUrl}`
                    }}
                />
            </View>
        );
    };

    const getProfile = async () => {
        console.log("A")
        const ret = await ProfileService.get_profile(user._id, user.token);

        if (ret.code === 200)
            setProfile(ret.data)
    };

    useEffect(() => {
        getProfile();
    }, []);


    useEffect(() => {
        getProfile();
    }, [update]);

    if (!user_profile) {
        return <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={styles.TextError}>Oops! An error happened :^)</Text>
        </View>;
    }

    //console.log(user_profile)
    return (
        <View style={styles.Outer} >
            <View style={styles.MainView} >
                <SettingsModal open={open} setOpen={setOpen} update={update} setUpdate={setUpdate} />
                <View style={styles.HeaderBox}>
                    <ProfilePicComponent size={60} image={user_profile.user.profilePicture} />
                    <View>
                        <Text style={{ flex: 0, fontWeight: "bold" }}>
                            {user_profile.user.username}
                        </Text>
                        <Text style={{ flex: 0, fontWeight: "normal", fontSize: 12 }}>
                            {user_profile.user.friends.length} friends
                        </Text>
                    </View>
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

                <View style={styles.DescriptionBox}>
                    <Text style={{ flex: 0, fontWeight: "normal", fontSize: 12 }}>
                        {user_profile.user.description}
                    </Text>
                </View>

                <View style={styles.PicturesBox}>
                    {user_profile.posts.length > 0 ?
                        <FlatList
                            data={user_profile.posts}
                            renderItem={renderImages}
                            keyExtractor={item => item._id}
                            numColumns={3}
                        /> :
                        <Text style={styles.TextError}>No posts yet.</Text>
                    }
                </View>
            </View>
        </View>
    );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

    Outer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    MainView: {
        flex: 1,
        maxHeight: window.height, // * 0.9,
        //minHeight: window.height, // * 0.9,
        width: window.width, //"93%",
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
        //marginTop: 22,

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

        top: 0,
        position: "absolute",

        width: "100%",
        height: "20%",

        //borderWidth: 1,
        //borderColor: "black",
    },

    ButtonBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        maxHeight: 40,
        maxWidth: 100,

        //borderWidth: 1,
        //borderColor: "black",
    },

    DescriptionBox: {
        flex: 1,
        flexShrink: 0,
        overflow: "visible",

        position: "absolute",
        top: window.height * 0.15,
        alignSelf: "flex-start",

        width: "100%",
        maxHeight: 40, // lo justo para que se vean 2 renglones. es una descripción no tu cv hijo de

        paddingLeft: 20,
        paddingRight: 20,

        //borderWidth: 1,
        //borderColor: "black",
    },

    PicturesBox: {
        flex: 1,
        flexDirection: "row",

        alignItems: "flex-start",
        justifyContent: "center",

        position: "absolute",
        top: window.height * 0.23,

        width: "100%",
        height: "78%",

        //borderWidth: 1,
        //borderColor: "black",
    },

    TextError: {
        fontWeight: "bold",
        color: "darkgrey",
    },

    Item: {
        width: window.width / 3,
        aspectRatio: 1,
        padding: 2,
    },

    ItemImage: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 8,
    },
});
