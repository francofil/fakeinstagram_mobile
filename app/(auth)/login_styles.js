import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

const window = Dimensions.get("window");

export const login_styles = StyleSheet.create({
    Outer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    MainView: {
        flex: 1,
        maxHeight: window.height * 0.5,
        width: "90%",
        borderRadius: 20,

        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "white",
    },

    BigTitleText: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20,
    },

    LittleNormalText: {
        alignSelf: "flex-start",
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 10,
        color: "darkgrey",
        marginTop: 20,
    },

    LittleLinkText: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 10,
        color: "darkgrey",
        margin:20,
    },

    LittleRedirectText: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 10,
        color: "lightblue",
        margin:20,
    },

    LittleErrorText: {
        color: "red",
        fontWeight: "normal",
        fontSize: 10,
    },

    LittleInputErrorText: {
        alignSelf: "flex-start",
        marginLeft: 20,
        color: "red",
        fontWeight: "normal",
        fontSize: 10,
    },

    LittleInvisibleText: {
        fontSize: 0,
    },
});
