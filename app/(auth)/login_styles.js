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

        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "white",
    },

    MainRegisterView: {
        flex: 1,
        maxHeight: window.height * 0.7,
        width: "90%",
        borderRadius: 20,

        justifyContent: "space-around",
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
        marginTop: 10,

        flexShrink: 0,
    },

    LittleLinkText: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 10,
        color: "darkgrey",
        margin:20,
        
        flexShrink: 0,
    },

    LittleRedirectText: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 10,
        color: "lightblue",
        margin:20,

        flexShrink: 0,
    },

    LittleErrorText: {
        color: "red",
        fontWeight: "normal",
        fontSize: 10,

        flexShrink: 0,
    },

    LittleInputErrorText: {
        alignSelf: "flex-start",
        marginLeft: 20,
        color: "red",
        fontWeight: "normal",
        fontSize: 10,

        flexShrink: 0,
    },

    LittleInvisibleText: {
        color: "white",
        fontSize: 1,
        position: "absolute",
    },
});
