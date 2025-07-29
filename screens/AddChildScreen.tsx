import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import DateOfBirthInput from "../components/DateOfBirthInput";
import { getClassFromDOB } from "../utils/getClassFromDOB";

type Props = NativeStackScreenProps<RootStackParamList, "AddChildren">;

const AddChildrenScreen: React.FC<Props> = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");

    const handleAddChild = async () => {
        console.log("Adding child...");
        
        if (!fullName || !dob ) {
            setError("All fields are required.");
            return;
        }

        const assignedClass = getClassFromDOB(dob);

        try {
            const user = auth.currentUser;
            if (!user) throw new Error("User not logged in!");

            await addDoc(collection(db, "children"), {
                fullName,
                dob,
                parentId: user.uid,
                points: 0,
                class: assignedClass,
                createdAt: new Date().toISOString(),
            });

            navigation.replace("Home");
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
            <Text style={{ fontSize: 22, marginBottom: 16 }}>Add New Child</Text>

            <TextInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                style={{ borderBottomWidth: 1, marginBottom: 16 }}
            />

            <DateOfBirthInput onChange={(isoDate) => setDob(isoDate)} />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                    value="male"
                    status={gender === "male" ? "checked" : "unchecked"}
                    onPress={() => setGender("male")}
                />
                <Text>Male</Text>

                <RadioButton
                    value="female"
                    status={gender === "female" ? "checked" : "unchecked"}
                    onPress={() => setGender("female")}
                />
                <Text>Female</Text>
            </View>

            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <Button mode="contained" onPress={handleAddChild}>
                Add Child
            </Button>
        </View>
    );
};

export default AddChildrenScreen;