import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { RootStackParamList } from "../App";
import ExpandableCard from "../components/ExpandableCard";
import useHomeHandler from "../handler/useHomeHandler";

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
        else navigation.replace("Welcome");
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