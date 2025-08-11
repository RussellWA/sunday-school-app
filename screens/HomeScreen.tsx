import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { RootStackParamList } from "../App";
import ExpandableCard from "../components/ExpandableCard";
import useHomeHandler from "../handler/useHomeHandler";
import { theme } from "../types/Theme";
import { LinearGradient } from "expo-linear-gradient";
import MainBackground from "../components/MainBackground";

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
        <MainBackground>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ fontSize: 22, marginBottom: 16, color: theme.colors.text, fontWeight: "bold" }}>
                    Welcome Home 👋
                </Text>
                <Text style={{ marginBottom: 16, color: theme.colors.text }}>
                    Here you can manage your children's registrations and schedules.
                </Text>
                <View
                    style={{
                        width: '100%',
                        height: 200,
                        backgroundColor: '#ccc',
                        borderRadius: 12,
                        marginBottom: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <Text style={{ color: '#666' }}>YouTube Video Placeholder</Text>
                </View>

                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: theme.colors.primary, // navy blue
                    marginBottom: 8,
                }}>
                    List of Children
                </Text>

                {children.length === 0 ? (
                    <Text>No Children Registered Yet</Text>
                    ) : (
                        children.map(child => (
                            <ExpandableCard key={child.id} child={child}/>
                        ))
                    )
                }

                <TouchableOpacity
                    onPress={() => navigation.navigate("AddChildren")}
                    style={{
                        borderWidth: 1,
                        borderColor: theme.colors.secondary, // teal green
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        alignSelf: "flex-start", // so it's smaller, not spanning full width
                        marginTop: 12,
                    }}
                    >
                    <Text style={{ color: theme.colors.secondary, fontWeight: "600" }}>
                        + Add Child
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </MainBackground>
    )
};

export default HomeScreen;