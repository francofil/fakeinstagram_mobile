import { View, Dimensions, Image, StyleSheet, Text } from "react-native";
import { url } from "../../.url";
import ProfilePicComponent from "./ProfilePicComponent";

export default function PostComponent({ post, setOpenComments, setComments }) {
    console.log(post)
    return (
        <View style={styles.Outer}>
            <View style={styles.BottomBar}>
                <ProfilePicComponent image={post.user.profilePicture} size={40} />
                <Text style={styles.NameText}>{post.user.username}</Text>
            </View>
            <View style={styles.ImgContainter} >
                <Image style={styles.Image} source={{ uri: `${url}/${post.imageUrl}` }} />
            </View>
            <View style={styles.BottomBar}>
            </View>
        </View>
    );
}

const window = Dimensions.get("window");

const styles = StyleSheet.create({
    Image: {
        flex: 1,
        maxWidth: window.width,
        resizeMode: "cover",
        borderRadius: 8,
    },

    Outer: {
        flex: 1,
        width: window.width,
        maxWidth: window.width,

        padding: 10,

        //borderWidth: 1,
        //borderColor: "red",
    },

    ImgContainter: {
        aspectRatio: 1,
        padding: 10,

        //borderWidth: 1,
        //borderColor: "black",
    },

    TopBar: {
        flex: 1,
        height: 40,

        //borderWidth: 1,
        //borderColor: "black",
    },

    BottomBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

        height: 40,

        //borderWidth: 1,
        //borderColor: "black",
    },

    NameText: {
        flex: 0,
        fontWeight: "bold",
        marginLeft: 10,
    },
});
