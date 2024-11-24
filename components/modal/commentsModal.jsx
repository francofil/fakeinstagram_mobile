import * as SecureStore from 'expo-secure-store';
import { Dimensions, View, Text, Modal, StyleSheet, FlatList, Pressable } from "react-native";
import { InputComponent } from "../input/InputComponent";
import { useState } from "react";
import CommentService from "../../services/CommentService";
import { BaseButton } from '../buttons/ButtonComponent';

export default function CommentsModal({ open, setOpen, postId, userName, caption, comments, update, setUpdate }) {
    const user = JSON.parse(SecureStore.getItem("user"));
    const [comment, setComment] = useState("");

    const postComment = async () => {
        if (comment === "")
            return;

        const res = await CommentService.comment_post(comment, postId, user.token);

        if (res.code === 201) {
            setUpdate(!update);
            setOpen(false);
        }
    };

    const deleteComment = async (commentid, authorid) => {
        if (user._id !== authorid)
            return;

        const res = await CommentService.delete_comment(postId, commentid, user.token);

        if (res.code === 200) {
            setUpdate(!update);
            setOpen(false);
        }
    }

    const renderComments = (item) => {
        return (
            <Pressable onPress={() => deleteComment(item.item._id, item.item.user._id)}>
            <Text style={styles.CaptionText}>
                <Text style={{ fontWeight: "bold" }}>{item.item.user.username} </Text>{item.item.content}
            </Text>
            </Pressable>
        );

    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.CenteredView}>
                <View style={styles.ModalView}>
                    <Text style={styles.CaptionText}>
                        <Text style={{ fontWeight: "bold" }}>{userName} </Text>{caption}
                    </Text>
                    {comments.length > 0 ?
                        <FlatList
                            data={comments}
                            renderItem={renderComments}
                            keyExtractor={item => item._id}
                            numColumns={1}
                            contentContainerStyle={{paddingBottom:30}} 
                        /> :
                        <Text style={styles.TextError}>No comments yet.</Text>
                    }

                    <View style={styles.InputBox}>
                        <InputComponent updateInput={setComment} />
                        <BaseButton
                            icon={"send"}
                            color={"black"}
                            size={30}
                            execute={postComment}
                        />
                        {/*<Pressable onPress={postComment}>
                            <Text style={styles.PostText}>Post</Text>
                        </Pressable>*/}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
    CenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ModalView: {
        maxHeight: window.height * 0.6,
        width: "95%",
        maxWidth: "95%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    TextError: {
        fontWeight: "bold",
        color: "darkgrey",
        paddingTop: 30,
    },

    CaptionText: {
        flex: 0,
        fontWeight: "normal",
        alignSelf: "flex-start",
        marginBottom: 20,
    },

    PostText: {
        flex: 0,
        fontWeight: "bold",
    },

    InputBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        maxWidth: "100%",
        position: "absolute",
        bottom: 0,

        margin: 10,
        backgroundColor: "white",
    }
});
