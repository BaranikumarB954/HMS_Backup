import { View, Text, TouchableOpacity } from "react-native";

export default function SlotPicker({ slots, selected, onSelect }: any) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {slots.map((s: any, i: number) => (
        <TouchableOpacity
          key={i}
          disabled={s.isBooked}
          onPress={() => onSelect(s)}
          style={{
            padding: 10,
            margin: 5,
            borderRadius: 8,
            backgroundColor: s.isBooked
              ? "#ccc"
              : selected?.start === s.start
              ? "#4DA6FF"
              : "#eee"
          }}
        >
          <Text>
            {s.start} - {s.end}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}