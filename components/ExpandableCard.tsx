import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { theme } from "../types/Theme";
import { Child } from "../types/Child";

type Props = {
    child: Child;
};

const ExpandableCard: React.FC<Props> = ({ child }) => {
    const [expanded, setExpanded] = useState(false);
    const [schedule, setSchedule] = useState("");
    const [showQR, setShowQR] = useState(false);
    const times = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM"];

    const handleRegister = () => {
        if (!schedule) return;
        setShowQR(true);
    };

    return (
        <Card
            style={{
                marginBottom: 16,
                backgroundColor: theme.colors.surface,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { 
                    width: 0, 
                    height: 3 
                },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
            }}
        >

            <TouchableOpacity
                onPress={() => setExpanded((prev) => !prev)}
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: theme.colors.primary,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    borderRadius: expanded ? 0 : 16,
                }}
            >
                <Text
                style={{
                    color: theme.colors.onPrimary,
                    fontSize: 17,
                    fontWeight: "bold",
                }}
                >
                {child.fullName}
                </Text>
            </TouchableOpacity>

            {expanded && (
                <Card.Content style={{ paddingHorizontal: 16, paddingTop: 12 }}>
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                    📅 Date of Birth:{" "}
                    <Text style={{ fontWeight: "600" }}>{child.dob}</Text>
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                    🎓 Class:{" "}
                    <Text style={{ fontWeight: "600" }}>{child.className}</Text>
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 12 }}>
                    ⭐ Points: <Text style={{ fontWeight: "600" }}>{child.points}</Text>
                </Text>

                {!showQR ? (
                    <>
                    <Text style={{ marginBottom: 8, fontWeight: "500" }}>
                        Select a service time:
                    </Text>
                    <View
                        style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                        }}
                    >
                        {times.map((time) => (
                        <Button
                            key={time}
                            mode={schedule === time ? "contained" : "outlined"}
                            onPress={() => setSchedule(time)}
                            style={{
                            width: "30%",
                            marginVertical: 4,
                            borderColor:
                                schedule === time
                                ? theme.colors.primary
                                : theme.colors.outline,
                            backgroundColor:
                                schedule === time
                                ? theme.colors.primary
                                : "transparent",
                            }}
                            labelStyle={{
                            fontSize: 13,
                            color:
                                schedule === time
                                ? theme.colors.onPrimary
                                : theme.colors.text,
                            }}
                            compact
                        >
                            {time}
                        </Button>
                        ))}
                    </View>
                    <Button
                        mode="contained"
                        onPress={handleRegister}
                        style={{
                        backgroundColor: theme.colors.secondary,
                        borderRadius: 8,
                        paddingVertical: 4,
                        }}
                        labelStyle={{
                        color: theme.colors.onSecondary,
                        fontWeight: "bold",
                        }}
                    >
                        Register
                    </Button>
                    </>
                ) : (
                    <View style={{ alignItems: "center", marginTop: 16 }}>
                    <Text style={{ marginBottom: 8, fontWeight: "500" }}>
                        Show this at church 👇
                    </Text>
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
                )}
                </Card.Content>
            )}
        </Card>
    );
};

export default ExpandableCard;
