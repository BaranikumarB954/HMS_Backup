import { View, Text } from "react-native";
import BottomNav from "@/components/common/BottomNav";
export default function Appointment() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", marginTop: 50 }}>Appointments</Text>
      <BottomNav />
    </View>
  );
}