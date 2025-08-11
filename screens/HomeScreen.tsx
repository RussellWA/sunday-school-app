import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Text } from "react-native-paper";
import { RootStackParamList } from "../App";
import ExpandableCard from "../components/ExpandableCard";
import MainBackground from "../components/MainBackground";
import YouTubeEmbed from "../components/YoutubeEmbed";
import useHomeHandler from "../handler/useHomeHandler";
import useYoutubeVideoHandler from "../handler/useYoutubeVideoHandler";
import { theme } from "../types/Theme";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const {
        userInfo,
        loading,
        children,
        authChecked,
        fetchChildren,
    } = useHomeHandler();

    const { fetchLatestVideo, videoId } = useYoutubeVideoHandler();

    useEffect(() => {
        if (loading) return;
        if (userInfo) {
            fetchChildren();
            fetchLatestVideo();
        } 
        else {
            navigation.replace("Welcome");
        }
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

                <YouTubeEmbed videoId={videoId} />

                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: theme.colors.primary,
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