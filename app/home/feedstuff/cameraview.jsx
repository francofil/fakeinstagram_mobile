import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BaseButton } from '../../../components/buttons/ButtonComponent';
import { setOptions } from 'expo-splash-screen';
import { PostModal } from '../../../components/modal/postModal';
import { UpdateContext } from '../../../services/UpdateContext';
import { useContext } from 'react';

export default function CameraPage() {
    const manager = useContext(UpdateContext)

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [open, setOpen] = useState(false);
    const [uri, setUri] = useState(null);

    if (!permission) {
        return <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={styles.TextError}>Oops! We need permission :^)</Text>
        </View>;
    };

    if (!permission.granted) {
        requestPermission()
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const savePhoto = async (pic) => {
        setUri(pic.uri);
        setOpen(true);
    };

    const takePhoto = async () => {
        const res = await camera.takePictureAsync();
        await savePhoto(res)
    };

    return (
        <View style={styles.container}>
            <PostModal
                uri={uri}
                open={open}
                setOpen={setOpen}
                update={manager.update}
                setUpdate={manager.setUpdate}
            />
            <CameraView style={styles.camera} facing={facing} ref={setCamera}>
                <View style={styles.takeContainer}>
                    <BaseButton
                        icon={"camera"}
                        size={80}
                        color={"white"}
                        execute={takePhoto}
                    />
                </View>
                <View style={styles.reverseContainer}>
                    <BaseButton
                        icon={"camera-reverse"}
                        size={40}
                        color={"white"}
                        execute={toggleCameraFacing}
                    />
                </View>
            </CameraView>
        </View>
    );
}

const window = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },

    camera: {
        flex: 1,
    },

    takeContainer: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        bottom: 5,
        right: window.width / 2 - 40,
    },

    reverseContainer: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});

