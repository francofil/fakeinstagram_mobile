import { Text, View, Image, FlatList } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { BaseButton } from "../../components/buttons/ButtonComponent";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import ProfileService from "../../services/ProfileService";
import ProfilePicComponent from "../../components/pictures/ProfilePicComponent";
import { url } from "../../.url";
import { SettingsModal } from "../../components/modal/settingsModal";
import { styles } from "./profile_styles";

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
            <Text style={styles.TextError}>Oops! Still loading :^)</Text>
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
