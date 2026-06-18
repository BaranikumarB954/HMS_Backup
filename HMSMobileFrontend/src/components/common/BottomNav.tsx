import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { bottomNavStyles as styles } from "../../styles/bottomNav.styles";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: { name: string; route: Href; icon: any }[] = [
    { name: "Home", route: "/patient/dashboard", icon: "home-outline" },
    { name: "Appointments", route: "/patient/appointment", icon: "calendar-outline" },
    { name: "Records", route: "/patient/health-records", icon: "document-text-outline" },
    { name: "Profile", route: "/patient/profile", icon: "person-outline" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.route;

        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => router.replace(tab.route)}
          >
            <Ionicons
              name={isActive ? tab.icon.replace("-outline", "") : tab.icon}
              size={22}
              color={isActive ? "#2563eb" : "#94a3b8"}
            />

            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}