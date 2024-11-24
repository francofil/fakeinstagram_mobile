import { Text, Button, View, StyleSheet, Dimensions, FlatList } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import PostService from "../../../services/PostService";
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect, useCallback, useContext } from "react";
import PostComponent from "../../../components/pictures/PostComponent";
import { Camera } from "expo-camera";
import { BaseButton } from "../../../components/buttons/ButtonComponent";
import { UpdateContext } from "../../../services/UpdateContext";

export default function Feed() {
    const router = useRouter();
    const user = JSON.parse(SecureStore.getItem("user"));
    const manager = useContext(UpdateContext)

    const [posts, setPosts] = useState([]);

    const renderPosts = (item) => {
        return <PostComponent post={item.item} update={manager.update} setUpdate={manager.setUpdate} />;
    };

    const fetchImages = async () => {
        const res = await PostService.get_feed(user.token) // Falta token


        if (res.code === 200) setPosts(res.data);
    };

    const openCamera = () => {
        router.push({
            pathname: "/home/feedstuff/cameraview",
        })
    }

    useEffect(() => {
        fetchImages();
    }, [manager.update]);


    return (
        <View style={styles.Outer} >
            <View style={styles.MainView} >
                {/*<View
                    style={styles.Feed}
                >
                    <Text style={{ fontWeight: "bold" }}>Feed</Text>
                    <Button title="X" onPress={() => { router.push("./randomprofile") }} />
                </View>*/}

                <View style={styles.Header}>
                    <Text style={styles.HeaderText}>Fakestagram</Text>
                    <BaseButton
                        icon={"add-circle-outline"}
                        size={40}
                        color={"black"}
                        execute={openCamera}
                    />
                </View>

                <View style={styles.PicturesBox}>
                    {posts.length > 0 ?
                        <FlatList
                            data={posts}
                            renderItem={renderPosts}
                            keyExtractor={item => item._id}
                            numColumns={1}
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
    Outer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    MainView: {
        flex: 1,
        maxHeight: window.height,
        width: window.width,

        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "white",
    },

    Feed: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    Header: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",

        position: "absolute",
        top: 0,
        width: window.width * 0.9,
        height: 40,
    },

    HeaderText: {
        fontWeight: "bold",
        fontSize: 20,
    },

    PicturesBox: {
        flex: 1,
        flexDirection: "row",

        alignItems: "flex-start",
        justifyContent: "center",

        position: "absolute",
        top: 40,

        width: "100%",
        height: "100%",

        //borderWidth: 1,
        //borderColor: "black",
    },

    TextError: {
        fontWeight: "bold",
        color: "darkgrey",
    },
});
