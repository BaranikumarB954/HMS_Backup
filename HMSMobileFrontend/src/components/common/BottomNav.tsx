import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { bottomNavStyles as styles } from "../../styles/bottomNav.styles";
import { COLORS } from "../../styles/themeColors";

// ✅ define props type
type BottomNavProps = {
  patient?: any;
};

export default function BottomNav({ patient }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: { name: string; route: Href; icon: any }[] = [
    { name: "Home", route: "/patient/dashboard", icon: "home-outline" },
    { name: "Appointments", route: "/patient/appointment/appointmentDashboard", icon: "calendar-outline" },
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
            onPress={() => router.push(tab.route)}
          >
            <View style={styles.iconWrapper}>
              <Ionicons
                name={isActive ? tab.icon.replace("-outline", "") : tab.icon}
                size={22}
                color={
                  isActive ? COLORS.primary600 : COLORS.textSecondary
                }
              />

              {/* 🔴 Profile incomplete indicator */}
              {tab.name === "Profile" &&
                patient &&
                !patient.isProfileCompleted && (
                  <View style={styles.redDot} />
                )}
            </View>

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}