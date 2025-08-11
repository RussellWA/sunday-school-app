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

type Props = NativeStackScreenProps<RootStackParamList, "Admin">;

const AdminScreen: React.FC<Props> = ({ navigation }) => {


    return (
        <ScrollView>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 22, marginBottom: 16 }}>
                    Admin Dashboard
                </Text>
                <Text>Manage your application settings and user accounts here.</Text>
                <Button
                    mode="contained"
                    style={{ marginTop: 24 }}
                    onPress={() => navigation.navigate("Scanner")}
                >
                    Open Camera
                </Button>
            </View>
        </ScrollView>
    )
};

export default AdminScreen;