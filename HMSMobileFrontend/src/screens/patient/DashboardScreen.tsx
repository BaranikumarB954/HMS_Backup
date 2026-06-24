import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import BottomNav from "@/src/components/common/BottomNav";
import { dashboardStyles as styles } from "@/src/styles/dashboard.styles";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>

      {/* 🔹 MAIN CONTENT */}
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Patient Overview</Text>
        </View>

        {/* PRIMARY ACTION (IMPORTANT UX) */}
        <TouchableOpacity
          style={styles.primaryCard}
          onPress={() => router.push("/patient/appointment/bookAppointment")}
        >
          <Text style={styles.primaryCardTitle}>Book Appointment</Text>
          <Text style={styles.primaryCardSub}>
            Schedule a consultation with a doctor
          </Text>
        </TouchableOpacity>

        {/* SECONDARY ACTIONS */}
        <View style={styles.row}>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/patient/appointment/appointmentDashboard")}
          >
            <Text style={styles.actionTitle}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/patient/health-records")}
          >
            <Text style={styles.actionTitle}>Health Records</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.row}>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/patient/profile")}
          >
            <Text style={styles.actionTitle}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/patient/appointment/myAppointment")}
          >
            <Text style={styles.actionTitle}>History</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* 🔻 BOTTOM NAV (FIXED) */}
      <BottomNav />
    </View>
  );
}