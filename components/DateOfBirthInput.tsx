import React, { useState } from "react";
import { View, Text, Button, Platform, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

export default function DateOfBirthInput({ onChange }: { onChange: (date: string) => void }) {
    const [date, setDate] = useState(new Date(2015, 0, 1));
    const [show, setShow] = useState(false);

    const onChangeDate = (_event: any, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
        setDate(selectedDate);
        onChange(selectedDate.toISOString());
        }
    };

  return (
    <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 4 }}>Date of Birth</Text>
        <Pressable onPress={() => setShow(true)} style={{ borderBottomWidth: 1, padding: 8 }}>
            <Text>{format(date, "yyyy-MM-dd")}</Text>
        </Pressable>

        {show && (
            <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
            maximumDate={new Date()} 
            />
        )}
    </View>
  );
}
