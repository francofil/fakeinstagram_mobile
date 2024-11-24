import { View, Dimensions, Image, StyleSheet, Text, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { BaseButton } from "../buttons/ButtonComponent";
import ProfilePicComponent from "./ProfilePicComponent";
import { url } from "../../.url";
import LikeService from "../../services/LikeService";
import CommentsModal from "../modal/commentsModal";

export default function PostComponent({
    post, update, setUpdate
}) {
    const router = useRouter();
    const user = JSON.parse(SecureStore.getItem("user"));

    const [currentPost] = useState(post);
    const [liked, setLiked] = useState(
        currentPost.likes && currentPost.likes.some((like) => like === user._id) // verifica si ya se dio el like
    );
    const [likesCount, setLikesCount] = useState(
        currentPost.likes ? currentPost.likes.length : 0
    );

    const [open, setOpen] = useState(false); // modal comentarios

    const handlerLike = async () => {
        // primero cambiamos, así es más responsivo para el usuario. Después, cualquier cosa,
        // volvemos pa atrás.
        if (liked) {
            setLiked(!liked);
            setLikesCount((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
            const res = await LikeService.remove_like(post._id, user.token);
        } else {
            setLiked(!liked);
            setLikesCount((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
            const res = await LikeService.like_post(post._id, user.token);
        }

        if (res.code !== 200) {
            setLiked(!liked);
            setLikesCount((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
        }
    };

    const handlerComments = () => {
        setOpen(true);
    };

    const goToProf = () => {
        const user_id = post.user._id;

        // No podés entrar a tu perfil haciendo click en uno de tus posts
        // Tenés el botón abajo no jorobes
        if (user_id !== user._id)
            router.push({
                pathname: "/home/feedstuff/randomprofile",
                params: { user_id: post.user._id }
            })
    }

    //console.log(post)
    return (
        <View style={styles.Outer}>
            <CommentsModal
                open={open}
                setOpen={setOpen}
                postId={post._id}
                userName={post.user.username}
                caption={post.caption}
                comments={post.comments}
                update={update}
                setUpdate={setUpdate}
            />
            <Pressable onPress={goToProf}>
                <View style={styles.Bar}>
                    <ProfilePicComponent image={post.user.profilePicture} size={40} />
                    <Text style={styles.NameText}>{post.user.username}</Text>
                </View>
            </Pressable>
            <View style={styles.ImgContainter} >
                <Image style={styles.Image} source={{ uri: `${url}/${post.imageUrl}` }} />
            </View>
            <View style={styles.Bar}>
                {!liked ? <BaseButton
                    icon={"heart-outline"}
                    size={30}
                    color={"black"}
                    execute={handlerLike}
                /> : <></>}
                {liked ? <BaseButton
                    icon={"heart"}
                    size={30}
                    color={"red"}
                    execute={handlerLike}
                /> : <></>}
                <Text style={styles.NameText}>{likesCount}</Text>
                <BaseButton
                    icon={"chatbubble-outline"}
                    size={30}
                    color={"black"}
                    execute={handlerComments}
                />
            </View>
            <View style={styles.Bar}>
                <Text style={styles.CaptionText}>
                    <Text style={{fontWeight: "bold"}}>{post.user.username} </Text>{post.caption}
                </Text>
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
        //borderRadius: 8,
    },

    Outer: {
        flex: 1,
        width: window.width,
        maxWidth: window.width,

        paddingTop: 20,

        //borderWidth: 1,
        //borderColor: "red",
    },

    ImgContainter: {
        aspectRatio: 1,
        //padding: 10,

        //borderWidth: 1,
        //borderColor: "black",
    },

    Bar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

        height: 50,
        paddingLeft: 10,
        paddingRight: 10,

        //borderWidth: 1,
        //borderColor: "black",
    },

    NameText: {
        flex: 0,
        fontWeight: "bold",
        marginLeft: 10,
        marginRight: 20,
    },
    
    CaptionText: {
        flex: 0,
        fontWeight: "normal",
    },
});
