import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { COLORS } from "../../constants/colors";

export default function AppointmentListScreen() {
  const [appointments, setAppointments] = useState([
    { id: "1", doctor: "Dr. John", date: "2026-06-01", status: "Pending" },
    { id: "2", doctor: "Dr. Smith", date: "2026-06-02", status: "Approved" }
  ]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.doctor}</Text>
      <Text style={styles.text}>Date: {item.date}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Appointments</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 15
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  text: {
    color: "#555",
    marginTop: 5
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#4DA6FF"
  }
});