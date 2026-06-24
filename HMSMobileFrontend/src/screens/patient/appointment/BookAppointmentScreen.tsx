import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getSlots, createAppointment } from "@/src/services/appointment.service";
import SlotPicker from "@/src/components/appointment/SlotPicker";

export default function BookAppointmentScreen() {
  const params = useLocalSearchParams();

  // ✅ FIX: FORCE STRING
  const empId =
    typeof params.empId === "string"
      ? params.empId
      : params.empId?.[0] || "";

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [reason, setReason] = useState("");

  const loadSlots = async () => {
    if (!date || !empId) return;

    const res = await getSlots(empId, date);

    const now = new Date();

    const filtered = res.filter((s: any) => {
      const [h, m] = s.start.split(":");
      const slotTime = new Date();
      slotTime.setHours(Number(h), Number(m));
      return slotTime > now;
    });

    setSlots(filtered);
  };

  useEffect(() => {
    loadSlots();
  }, [date]);

  const handleBook = async () => {
    if (!selectedSlot || !reason || !date) {
      alert("Fill all fields");
      return;
    }

    await createAppointment({
      patientUHID: "PAT-260007",
      doctorEmployeeId: empId,
      deptName: "GENERAL",
      appointmentDate: date,
      timeslot: selectedSlot,
      reason
    });

    alert("Appointment booked ✅");
  };

  return (
    <View style={{ padding: 15 }}>
      <Text>Select Date</Text>

      <TextInput
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <SlotPicker
        slots={slots}
        selected={selectedSlot}
        onSelect={setSelectedSlot}
      />

      <TextInput
        placeholder="Reason"
        value={reason}
        onChangeText={setReason}
        style={{ borderWidth: 1, marginTop: 10 }}
      />

      <TouchableOpacity
        onPress={handleBook}
        style={{ backgroundColor: "#4DA6FF", padding: 12, marginTop: 10 }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
}