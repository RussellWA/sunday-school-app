import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data() as { role?: string };
                console.log("User role:", data.role);
                if (data.role === "admin") {
                    navigation.replace("Admin");
                } else {
                    navigation.replace("Home");
                }
            } else {
                setError("User data not found.");
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: "absolute",
                    top: 50,
                    left: 16,
                    zIndex: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                    borderWidth: 1,
                    borderColor: "#eee",
                }}
            >
                <Text style={{ fontSize: 18, color: colors.primary }}>{'<'}</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", marginBottom: 40 }}>
                <Image
                    source={require("../assets/logo_kids.png")}
                    style={{ width: 200, height: 160 }}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>Login</Text>
            </View>

            <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    marginBottom: 16,
                }}
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    marginBottom: 24,
                }}
            />

            <Text variant="titleSmall">{error}</Text>

            <Button mode="contained" onPress={handleSignUp}>
                Login
            </Button>


            <Text
                onPress={() => navigation.navigate("SignUp")}
                style={{ marginTop: 16, textAlign: "center", color: "blue" }}
            >
                Don't have an account? Sign in
            </Text>
        </View>
    );
};

export default LoginScreen;