import { useState } from "react";
import { Modal, StyleSheet, View, Text, Pressable, Alert, Image } from "react-native"
import * as SecureStore from 'expo-secure-store';
import { InputComponent } from "../input/InputComponent";
import PostService from "../../services/PostService";
import { useRouter } from "expo-router";

export function PostModal({ uri, open, setOpen, update, setUpdate }) {
    const user = JSON.parse(SecureStore.getItem("user"));
    const router = useRouter();

    const [description, setDescription] = useState("");

    const postPic = async () => {
        const formData = new FormData();
        formData.append("image", {
            uri: uri,
            name: 'img.jpg',
            type: 'image/jpg'
        });
        formData.append("caption", description);

        const res = await PostService.upload_post(formData, user.token);

        if (res.code === 201) {
            setUpdate(!update);
            setOpen(false);
            router.back();
        } else {
            setOpen(false);
            Alert.alert("Error", "Couldn't post picture");
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.CenteredView}>
                <View style={styles.ModalView}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        Post picture
                    </Text>

                    <View style={{ aspectRatio: 1 }} >
                        <Image style={styles.Image} source={{ uri: uri }} />
                    </View>

                    <InputComponent updateInput={setDescription} />
                    <Text style={styles.Label}>
                        Caption
                    </Text>

                    <Pressable onPress={postPic}>
                        <Text style={styles.Button}>Post</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    CenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ModalView: {
        width: "90%",
        maxWidth: "90%",
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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

    Label: {
        fontWeight: "normal",
        fontSize: 10,
        alignSelf: "flex-start",
        marginLeft: 10,
    },

    Button: {
        fontWeight: "bold",
        marginTop: 10,
        color: "red",
    },

    Image: {
        flex: 1,
        maxWidth: 200,
        maxHeight: 200,
        resizeMode: "cover",
        borderRadius: 8,
        margin: 10,
    },
});
