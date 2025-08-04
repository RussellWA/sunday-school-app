import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";
import { Child } from "../types/Child";
import QRCode from "react-native-qrcode-svg";

type Props = {
    child: Child;
};

const ExpandableCard: React.FC<Props> = ({ child }) => {
    const [expanded, setExpanded] = useState(false);
    const [schedule, setSchedule] = useState("");
    const [showQR, setShowQR] = useState(false);
    const times = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM"];

    const handleRegister = () => {
        console.log("id ", child.id, " | schedule ", schedule);
        if (!schedule) return;
        setShowQR(true);
    }

    return (
        <Card style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => setExpanded(prev => !prev)}>
                <Card.Title title={child.fullName} />
            </TouchableOpacity>

            {expanded && (
                <Card.Content>
                    <Text>Date of Birth: {child.dob}</Text>
                    <Text>Class: {child.className}</Text>
                    <Text>Points: {child.points}</Text>

                    {!showQR ? (
                        <>
                            <Text>Select a service time:</Text>
                            {/* {["9.00 WIB", "11.00 WIB", "13.00 WIB", "15.00 WIB", "17.00 WIB"].map(time => (
                                <Button
                                    key={time}
                                    mode={schedule === time ? "contained" : "outlined"}
                                    onPress={() => setSchedule(time)}
                                    style={{ marginVertical: 4 }}
                                >
                                    {time}
                                </Button>
                            ))} */}
                            <View style={{ 
                                flexDirection: "row", 
                                flexWrap: "wrap", 
                                gap: 8, 
                                marginBottom: 12,
                                // justifyContent: "space-between"
                            }}>
                                {times.map(time => (
                                    // <Chip
                                    //     key={time}
                                    //     selected={schedule === time}
                                    //     onPress={() => setSchedule(time)}
                                    //     style={{
                                    //         marginRight: 8,
                                    //         backgroundColor: schedule === time ? "#6200ee" : undefined,
                                    //     }}
                                    //     textStyle={{ color: schedule === time ? "white" : "black" }}
                                    //     >
                                    //     {time}
                                    // </Chip>
                                    <Button
                                        key={time}
                                        mode={schedule === time ? "contained" : "outlined"}
                                        onPress={() => setSchedule(time)}
                                        style={{ width: "30%", marginVertical: 4 }}
                                        compact
                                        >
                                        {time}
                                    </Button>
                                ))}
                            </View>
                            <Button
                                mode="outlined"
                                onPress={() => handleRegister()}
                                style={{ marginVertical: 4 }}
                            >
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <View style={{ alignItems: "center", marginTop: 16 }}>
                                <Text>Show this at church 👇</Text>
                                <QRCode
                                    value={JSON.stringify({
                                        childId: child.id,
                                        fullName: child.fullName,
                                        dob: child.dob,
                                        time: schedule,
                                    })}
                                size={200}
                                />
                            </View>
                        </>
                    )}
                </Card.Content>
            )}
        </Card>
    );
};

export default ExpandableCard;
