import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useState } from "react";
import { View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, Text, TextInput } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace("Home");
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