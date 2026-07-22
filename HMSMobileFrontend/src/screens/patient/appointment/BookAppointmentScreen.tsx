import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import CalendarStrip from "@/src/components/appointment/CalendarStrip";
import SlotPicker from "@/src/components/appointment/SlotPicker";
import DoctorHeader from "@/src/components/doctor/DoctorHeader";

import {
  createAppointment,
  getSlots,
} from "@/src/services/appointment.service";

import { bookAppointmentStyles as styles } from "@/src/styles/bookAppointment.styles";

export default function BookAppointmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const empId =
    typeof params.empId === "string"
      ? params.empId
      : params.empId?.[0] || "";

  const doctor = {
    doctorName:
      typeof params.doctorName === "string"
        ? params.doctorName
        : params.doctorName?.[0] || "Doctor",

    specialization:
      typeof params.specialization === "string"
        ? params.specialization
        : params.specialization?.[0] || "General",

    fee:
      typeof params.fee === "string"
        ? params.fee
        : params.fee?.[0] || "0",

    deptName:
      typeof params.deptName === "string"
        ? params.deptName
        : params.deptName?.[0] || "",
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSlots = async () => {
    if (!selectedDate || !empId) return;

    try {
      const res = await getSlots(empId, selectedDate);
      setSlots(res);
    } catch (err: any) {
      console.log(err);
      Alert.alert(
        "Slots",
        err?.response?.data?.message || "Unable to load slots."
      );
    }
  };

  useEffect(() => {
    loadSlots();
  }, [selectedDate]);

  const handleBook = async () => {
    if (!selectedDate) {
      Alert.alert("Validation", "Please select appointment date.");
      return;
    }

    if (!selectedSlot) {
      Alert.alert("Validation", "Please select a time slot.");
      return;
    }

    if (!reason.trim()) {
      Alert.alert("Validation", "Please enter the reason for your visit.");
      return;
    }

    try {
      setLoading(true);
      console.log("Time slot is : ", selectedSlot)
      await createAppointment({
        patientUHID: "PAT-260007",
        doctorEmployeeId: empId,
        deptName: doctor.deptName,
        appointmentDate: selectedDate,
        timeslot: selectedSlot,
        reason,
      });

      Alert.alert(
        "Success",
        "Appointment booked successfully.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (err: any) {
      Alert.alert(
        "Booking Failed",
        err?.response?.data?.message || "Unable to book appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}

        <Text style={styles.title}>
          Book Appointment
        </Text>

        {/* Doctor */}

        <DoctorHeader doctor={doctor} />

        {/* Date */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Appointment Date
          </Text>

          <CalendarStrip
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </View>

        {/* Time */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Available Time
          </Text>

          <SlotPicker
            slots={slots}
            selected={selectedSlot}
            onSelect={setSelectedSlot}
          />
        </View>

        {/* Reason */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Reason for doctor's visit
          </Text>

          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Describe your symptoms & complaints"
            multiline
            textAlignVertical="top"
            style={styles.reasonInput}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            loading && { opacity: 0.7 },
          ]}
          onPress={handleBook}
          disabled={loading}
        >
          <Text style={styles.bookButtonText}>
            {loading ? "Booking..." : "Book Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}