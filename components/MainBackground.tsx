import { LinearGradient } from "expo-linear-gradient";
import React, { PropsWithChildren } from "react";
import { Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

type Props = PropsWithChildren<{}>;

const MainBackground: React.FC<Props> = ({ children }) => {
    return (
        <View 
            style={{ flex: 1, backgroundColor: "#FFFFFF" 
                , position: "relative", overflow: "hidden", paddingTop: 60
                , padding: 30, justifyContent: "center", alignItems: "center"
            }}
        >
            <LinearGradient
                colors={["rgba(255, 153, 0, 0.59)", "transparent"]}
                style={{
                position: "absolute",
                top: -100,
                left: -100,
                width: width * 0.8,
                height: height * 0.4,
                borderRadius: width,
                transform: [{ rotate: "30deg" }]
                }}
            />
            <LinearGradient
                colors={["rgba(0,168,157,0.1)", "transparent"]}
                style={{
                position: "absolute",
                bottom: -120,
                right: -120,
                width: width * 0.9,
                height: height * 0.4,
                borderRadius: width,
                transform: [{ rotate: "-25deg" }]
                }}
            />
            <View style={{
                position: "absolute",
                top: 80,
                right: 30,
                width: 40,
                height: 40,
                backgroundColor: "#D2E100",
                borderRadius: 20,
                opacity: 0.7
            }} />
            <View style={{
                position: "absolute",
                bottom: 180,
                left: 40,
                width: 25,
                height: 25,
                backgroundColor: "#F7931E",
                borderRadius: 12.5,
                opacity: 0.6
            }} />
            {children}
        </View>
    );
}

export default MainBackground;
