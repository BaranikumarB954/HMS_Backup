import { View, Text } from "react-native";
import BottomNav from "@/components/common/BottomNav";
export default function DashboardScreen() {
  return (
    <View style={{ flex: 1 }}>
      
      {/* Empty Content Area */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home Screen</Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}