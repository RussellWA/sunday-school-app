import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import { Button, RadioButton, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from "../App";
import { auth, db } from "../firebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, "CompleteProfile">;

const CompleteProfileScreen: React.FC<Props> = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [parent, setParent] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleCompletion = async () => {
        console.log("Saving profile...");

        if (!fullName || !parent || !phone) {
            setError("All fields are required.");
            return;
        }

        try {
            const user = auth.currentUser;

            if (user != null) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    fullName,
                    parentType: parent,
                    phone,
                    role: "parent",
                    createdAt: new Date().toISOString(),
                });
            }

            navigation.replace("Login");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Text variant="titleLarge">Create Account</Text>

            <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={text => setFullName(text)}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                    value="father"
                    status={parent === "father" ? "checked" : "unchecked"}
                    onPress={() => setParent("father")}
                />
                <Text>Father</Text>

                <RadioButton
                    value="mother"
                    status={parent === "mother" ? "checked" : "unchecked"}
                    onPress={() => setParent("mother")}
                />
                <Text>Mother</Text>
            </View>

            <TextInput
                label="Phone"
                keyboardType="phone-pad"
                autoComplete="tel"
                value={phone}
                onChangeText={text => setPhone(text)}
            />

            <Text variant="titleSmall">{error}</Text>

            <Button mode="contained" onPress={handleCompletion}>
                Submit
            </Button>

        </View>
    );
};

export default CompleteProfileScreen;