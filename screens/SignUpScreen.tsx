import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { View, Image, TouchableOpacity } from "react-native";
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { getFirestore, doc, setDoc } from "firebase/firestore";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        console.log("Signing up...");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        if (password != confirm) {
            setError("Password not the same.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User created:", user.uid);

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: "parent",
                createdAt: new Date().toISOString(),
            });

            navigation.replace("CompleteProfile");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24, backgroundColor: "#fff" }}>
            <TouchableOpacity
                onPress={() => navigation.replace("Welcome")}
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
                <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>Create Account</Text>
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

            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    marginBottom: 24,
                }}
            />

            <Text variant="titleSmall">{error}</Text>

            <TouchableOpacity
                onPress={handleSignUp}
                style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 8,
                marginBottom: 16,
                }}
            >
                <Text style={{ color: colors.onPrimary, textAlign: "center", fontWeight: "bold" }}>
                    Create Account
                </Text>
            </TouchableOpacity>


            <Text
                onPress={() => navigation.navigate("Login")}
                style={{ marginTop: 16, textAlign: "center", color: "blue" }}
            >
                Already have an account? Log in
            </Text>
        </View>
    );
};

export default SignUpScreen;