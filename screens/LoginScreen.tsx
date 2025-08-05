import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useState } from "react";
import { View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, Text, TextInput } from 'react-native-paper';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Fetch user document to get role
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data() as { role?: string };
                console.log("User role:", data.role); // <-- Add this line
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
            <Text variant="titleLarge">Login</Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
            />

            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                autoCapitalize="none"
                secureTextEntry
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