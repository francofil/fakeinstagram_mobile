import { Text, View, Image, FlatList } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { BaseButton } from "../../../components/buttons/ButtonComponent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import ProfileService from "../../../services/ProfileService";
import ProfilePicComponent from "../../../components/pictures/ProfilePicComponent";
import { url } from "../../../.url";
import { styles } from "../profile_styles";
import { FriendService } from "../../../services/FriendsService";

export default function RandomProfile() {
    const user = JSON.parse(SecureStore.getItem("user"));

    const { user_id } = useLocalSearchParams();

    const [user_profile, setProfile] = useState(null);
    const [myfriends, setMyFriends] = useState(null);
    const [isfriend, setIsFriend] = useState(false);

    const getFriends = async () => {
        const myprof = await ProfileService.get_profile(user._id, user.token);
        if (myprof.code === 200)
            setMyFriends(myprof.data.user.friends);
    };

    const checkFriend = () => {
        let boo = false
        myfriends.forEach(friend => { 
            if (friend._id === user_id)
                boo = true; 
        });
        setIsFriend(boo)
        return boo;
    };

    const addFriend = async () => {
        setIsFriend(true); // Actualizamos antes, así es más responsivo.
        const res = await FriendService.add(user_id, user.token);
        if (res.code !== 200)
            setIsFriend(false);
    }

    const removeFriend = async () => {
        setIsFriend(false);
        const res = await FriendService.remove(user_id, user.token);
        if (res.code !== 200)
            setIsFriend(true);
    }

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
        const ret = await ProfileService.get_profile(user_id, user.token);

        if (ret.code === 200)
            setProfile(ret.data)
    };

    useEffect(() => {
        getProfile();
        getFriends();
    }, [isfriend]);

    useEffect(() => {
        if(myfriends)
            checkFriend();
    }, [isfriend, myfriends]);

    if (!user_profile) {
        return <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={styles.TextError}>Oops! Still loading :^)</Text>
        </View>;
    }

    console.log(isfriend)
    return (
        <View style={styles.Outer} >
            <View style={styles.MainView} >
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
                        {!isfriend ? <BaseButton
                            icon={"person-add-outline"}
                            size={40}
                            color={"black"}
                            execute={addFriend}
                        /> : <></>}
                        {isfriend ? <BaseButton
                            icon={"person-remove"}
                            size={40}
                            color={"cyan"}
                            execute={removeFriend}
                        /> : <></>}
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
