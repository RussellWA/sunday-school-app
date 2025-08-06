import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Button, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import { RootStackParamList } from "../App";
import { auth, db } from "../firebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, "CompleteProfile">;

const CompleteProfileScreen: React.FC<Props> = ({ navigation }) => {
    const { colors } = useTheme();
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
                <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>Create Account</Text>
            </View>

            <TextInput
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
                keyboardType="default"
                autoCapitalize="words"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    marginBottom: 16,
                }}
            />

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", marginRight: 24 }}
                onPress={() => setParent("father")}
                >
                <RadioButton
                    value="father"
                    status={parent === "father" ? "checked" : "unchecked"}
                    onPress={() => setParent("father")}
                    color={colors.primary}
                />
                <Text>Father</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setParent("mother")}
                >
                <RadioButton
                    value="mother"
                    status={parent === "mother" ? "checked" : "unchecked"}
                    onPress={() => setParent("mother")}
                    color={colors.primary}
                />
                <Text>Mother</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder="Phone"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                }}
            />

            <Text variant="titleSmall">{error}</Text>

            <TouchableOpacity
                onPress={handleCompletion}
                style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 8,
                marginBottom: 16,
                }}
            >
                <Text style={{ color: colors.onPrimary, textAlign: "center", fontWeight: "bold" }}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CompleteProfileScreen;