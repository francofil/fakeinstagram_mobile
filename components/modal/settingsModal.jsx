import { useState } from "react";
import { Modal, StyleSheet, View, Text, Pressable, Alert } from "react-native"
import * as SecureStore from 'expo-secure-store';
import { InputComponent } from "../input/InputComponent";
import ProfileService from "../../services/ProfileService";

export function SettingsModal({ open, setOpen, update, setUpdate }) {
    const user = JSON.parse(SecureStore.getItem("user"));

    const [username, setName] = useState("");
    const [profilePicture, setPicture] = useState("");
    const [description, setDescription] = useState("");

    const updateProfile = async () => {
        const res = await ProfileService.update_profile(
            {
                username: username,
                profilePicture: profilePicture,
                description: description,
            },
            user.token
        );

        if (res.code === 200) {
            setUpdate(!update);
        } else {
            setOpen(false);
            Alert.alert("Error", "Couldn't update profile");
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
                        Edit profile
                    </Text>

                    <InputComponent updateInput={setName} />
                    <Text style={styles.Label}>
                        Username
                    </Text>

                    <InputComponent updateInput={setPicture} />
                    <Text style={styles.Label}>
                        Profile pic (paste URL)
                    </Text>

                    <InputComponent updateInput={setDescription} />
                    <Text style={styles.Label}>
                        Description
                    </Text>

                    <Pressable onPress={updateProfile}>
                        <Text style={styles.Button}>Confirm changes</Text>
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
        marginTop: 20,
        color: "red",
    }
});
