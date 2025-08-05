import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import useHomeHandler from "../handler/useHomeHandler";
import { ScrollView } from "react-native-gesture-handler";
import ExpandableCard from "../components/ExpandableCard";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const {
        userInfo,
        loading,
        children,
        authChecked,
        fetchChildren,
    } = useHomeHandler();

    useEffect(() => {
        if (loading) return;
        if (userInfo) fetchChildren();
        else navigation.replace("Login");
    }, [loading, userInfo]);

    if (!authChecked) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView>
            <Text style={{ fontSize: 22, marginBottom: 16 }}>
                Welcome, {userInfo?.fullName || "Parent"} 👋
            </Text>

            {children.length === 0 ? (
                <Text>No Children Registered Yet</Text>
                ) : (
                    children.map(child => (
                        <ExpandableCard key={child.id} child={child}/>
                    ))
                )
            }

            <Button mode="contained" onPress={() => navigation.replace("AddChildren")}>
                Add Child
            </Button>
            
        </ScrollView>
    )
};

export default HomeScreen;