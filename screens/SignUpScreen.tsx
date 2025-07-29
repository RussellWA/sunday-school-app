import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { View } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper';
import { getFirestore, doc, setDoc } from "firebase/firestore";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
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
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Text variant="titleLarge">Create Account</Text>

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
            />

            <TextInput
                label="Confirm Password"
                value={confirm}
                onChangeText={text => setConfirm(text)}
                autoCapitalize="none"
            />

            <Text variant="titleSmall">{error}</Text>

            <Button mode="contained" onPress={handleSignUp}>
                Sign Up
            </Button>


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