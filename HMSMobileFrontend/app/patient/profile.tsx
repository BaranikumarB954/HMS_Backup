import { View, Text } from "react-native";
import BottomNav from "@/components/common/BottomNav";

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", marginTop: 50 }}>Profile</Text>
      <BottomNav />
    </View>
  );
}