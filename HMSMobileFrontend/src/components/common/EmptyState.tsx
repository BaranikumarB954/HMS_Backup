import { View, Text } from "react-native";

export default function EmptyState({ message }: any) {
  return (
    <View
      style={{
        marginTop: 60,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: 16, color: "#888" }}>
        {message || "No data available"}
      </Text>
    </View>
  );
}