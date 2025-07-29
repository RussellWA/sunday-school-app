import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Child } from "../types/Child";

type Props = {
    child: Child;
};

const ExpandableCard: React.FC<Props> = ({ child }) => {
    const [expanded, setExpanded] = useState(false);

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
                    <Text>Select a service time:</Text>
                    {["9.00 WIB", "11.00 WIB", "13.00 WIB", "15.00 WIB", "17.00 WIB"].map(time => (
                        <Button
                            key={time}
                            mode="outlined"
                            // onPress={() => handleRegister(child.id, time)}
                            style={{ marginVertical: 4 }}
                        >
                            {time}
                        </Button>
                    ))}
                </Card.Content>
            )}
        </Card>
    );
};

export default ExpandableCard;
