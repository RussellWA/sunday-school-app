import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Dimensions, Image, Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
    const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 44;
    const { colors } = useTheme();
    
    return (
        <View style={{ alignItems: 'center', backgroundColor: "#fff" }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Image 
                source={require("../assets/moreBnw.jpg")}
                style={{
                width: "100%",
                height: 200,
                }}
                resizeMode="cover"
            />
            <Image 
                source={require("../assets/bnw.png")}
                style={{
                width: "100%",
                height: 180,
                }}
                resizeMode="cover"
            />
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
                <View style={{ alignItems: "center" }}>
                    <Image
                    source={require("../assets/logo_kids.png")}
                    style={{
                        width: 250,
                        height: 200,
                    }}
                    resizeMode="contain"
                    />
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={{
                    backgroundColor: colors.primary,
                    borderRadius: 8,
                    width: 250,
                    height: 56,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 16,
                    }}
                >
                    <Text style={{ color: colors.onPrimary, textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                    style={{
                    borderColor: colors.primary,
                    borderWidth: 2,
                    borderRadius: 8,
                    width: 250,
                    height: 56,
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                >
                    <Text style={{ color: colors.primary, textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
                        Create Account
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WelcomeScreen;