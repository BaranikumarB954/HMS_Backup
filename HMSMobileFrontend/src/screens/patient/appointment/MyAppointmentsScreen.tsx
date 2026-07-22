import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import BottomNav from "@/src/components/common/BottomNav";

import { getMyAppointments } from "@/src/services/appointment.service";
import AppointmentCard from "@/src/components/appointment/AppointmentCard";
import EmptyState from "@/src/components/common/EmptyState"; // ✅ NEW
import {myAppointmentStyles as styles} from "@/src/styles/myAppointment.styles"
export default function MyAppointmentsScreen() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("UPCOMING");

  const router = useRouter();

  const load = async () => {
    try {
      setLoading(true);
      const res = await getMyAppointments();
      setAppointments(res);
    } catch (err) {
      console.log("Load appointments error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleReschedule = ({ doctorId, appointmentId }: any) => {
    router.push({
      pathname: "/patient/appointment/reschedule",
      params: { doctorId, appointmentId }
    });
  };

  // ✅ FILTER
  const filteredAppointments = appointments.filter((a) => {
    if (activeTab === "UPCOMING") return a.status === "BOOKED";
    if (activeTab === "COMPLETED") return a.status === "COMPLETED";
    if (activeTab === "CANCELLED") return a.status === "CANCELLED";
    return true;
  });

  return (
  <View style={{ flex: 1, paddingTop: 50 }}>

    {/* TABS */}
    <View style={styles.tabContainer}>
      {["UPCOMING", "COMPLETED", "CANCELLED"].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    {/* CONTENT */}
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : filteredAppointments.length === 0 ? (
        <EmptyState
          message={
            activeTab === "UPCOMING"
              ? "No upcoming appointments"
              : activeTab === "COMPLETED"
              ? "No completed appointments"
              : "No cancelled appointments"
          }
        />
      ) : (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <AppointmentCard
              appointment={item}
              onRefresh={load}
              onReschedule={handleReschedule}
            />
          )}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 100 // space for bottom nav
          }}
        />
      )}
    </View>

    {/* FIXED BOTTOM NAV */}
    <BottomNav />

  </View>
);
}