import React from 'react';
import { View, Image } from 'react-native';

const ProfilePicComponent = ({ size, image }) => {
    return (
        <View style={{}}>
            <Image
                source={
                    image !== "" ? { uri: image } : require(
                        '../../assets/images/Profile_avatar_placeholder_large.png'
                    )
                }
                style={{ width: size, height: size, borderRadius: size / 2 }}
            />
        </View>
    );
};

export default ProfilePicComponent;
