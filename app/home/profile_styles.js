import { Dimensions, StyleSheet } from "react-native";

const window = Dimensions.get("window");

export const styles = StyleSheet.create({
    Outer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    MainView: {
        flex: 1,
        maxHeight: window.height, // * 0.9,
        //minHeight: window.height, // * 0.9,
        width: window.width, //"93%",
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
        //marginTop: 22,

        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "white",
    },

    HeaderBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "space-around",

        top: 0,
        position: "absolute",

        width: "100%",
        height: "10%",

        //borderWidth: 1,
        //borderColor: "black",
    },

    ButtonBox: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",

        maxHeight: 40,
        maxWidth: 100,

        //borderWidth: 1,
        //borderColor: "black",
    },

    DescriptionBox: {
        flex: 1,
        flexShrink: 0,
        overflow: "visible",

        position: "absolute",
        top: window.height * 0.10,
        alignSelf: "flex-start",

        width: "100%",
        maxHeight: 40, // lo justo para que se vean 2 renglones. es una descripción no tu cv hijo de

        paddingLeft: 20,
        paddingRight: 20,

        //borderWidth: 1,
        //borderColor: "black",
    },

    PicturesBox: {
        flex: 1,
        flexDirection: "row",

        alignItems: "flex-start",
        justifyContent: "center",

        position: "absolute",
        top: window.height * 0.16,

        width: "100%",
        height: window.height * 0.77,

        //borderWidth: 1,
        //borderColor: "black",
    },

    TextError: {
        fontWeight: "bold",
        color: "darkgrey",
    },

    Item: {
        width: window.width / 3,
        aspectRatio: 1,
        padding: 2,
    },

    ItemImage: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 8,
    },
});
