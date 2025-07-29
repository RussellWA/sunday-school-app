import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import useHomeHandler from "../handler/useHomeHandler";
import { ScrollView } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const {
        userInfo,
        loading,
        children,
        fetchUser,
        fetchChildren
    } = useHomeHandler();

    useEffect(() => {
        fetchUser();
        fetchChildren();
    }, []);

    if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
        <ScrollView>
            <Text style={{ fontSize: 22, marginBottom: 16 }}>
                Welcome, {userInfo?.fullName || "Parent"} 👋
            </Text>

            {children.length === 0 ? (
                <Text>No Children Registered Yet</Text>
                ) : (
                    children.map(child => (
                        <View
                            key={child.id}
                            style={{
                            padding: 16,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 12,
                            backgroundColor: "#f0f0f0",
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>{child.fullName}</Text>
                            <Text style={{ color: "#555" }}>DOB: {child.dob}</Text>
                        </View>
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