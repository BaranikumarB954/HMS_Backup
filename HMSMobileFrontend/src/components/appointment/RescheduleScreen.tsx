import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router"; // ✅ FIX

import {
  getAvailableSlots,
  rescheduleAppointment
} from "@/src/services/appointment.service";

import { RescheduleCardStyle as styles } from "@/src/styles/reschedule.styles";

export default function RescheduleScreen() {

  // ✅ GET PARAMS FROM ROUTER
  const { doctorId, appointmentId } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  // 🔥 LOAD SLOTS
  const loadSlots = async () => {
    try {
      setLoading(true);

      const res = await getAvailableSlots(doctorId as string);

      setSlots(res);
    } catch (err) {
      console.log("Slot error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      loadSlots();
    }
  }, [doctorId]);

  // 🔥 RESCHEDULE
  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) {
      Alert.alert("Select slot", "Please choose date & time");
      return;
    }

    try {
      await rescheduleAppointment(appointmentId as string, {
        appointmentDate: selectedDate,
        timeslot: selectedSlot
      });

      Alert.alert("Success", "Appointment rescheduled");

      router.back(); // ✅ FIX
    } catch (err: any) {
      Alert.alert("Error", err?.message || "Failed");
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>

      {/* 🔥 HEADER */}
      <Text style={styles.title}>Reschedule Appointment</Text>

      {/* 📅 DATE LIST */}
      <FlatList
        horizontal
        data={slots}
        keyExtractor={(item) => item.date}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateBox,
              selectedDate === item.date && styles.activeDate
            ]}
            onPress={() => {
              setSelectedDate(item.date);
              setSelectedSlot(null);
            }}
          >
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />

      {/* ⏰ TIME SLOTS */}
      <View style={styles.slotContainer}>
        <Text style={styles.sectionTitle}>Available Slots</Text>

        <View style={styles.slotGrid}>
          {slots
            .find((s) => s.date === selectedDate)
            ?.timeslots?.map((slot: any, index: number) => {

              const isSelected =
                selectedSlot?.start === slot.start;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.slotBox,
                    isSelected && styles.activeSlot
                  ]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Text style={styles.slotText}>
                    {slot.start} - {slot.end}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>

      {/* ✅ CONFIRM */}
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmText}>
          Confirm Reschedule
        </Text>
      </TouchableOpacity>
    </View>
  );
}