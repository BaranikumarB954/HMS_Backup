import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { appointmentCardStyles as styles } from "@/src/styles/appointmentCard.styles";
import { cancelAppointment } from "@/src/services/appointment.service";
import { formatTo12Hour,formatAppointmentDate} from "@/src/utils/commonFunctions";

export default function AppointmentCard({ appointment, onRefresh, onReschedule }: any) {
  const [cancelLoading, setCancelLoading] = useState(false);

  const doctor =
    appointment?.doctorId?.employeeId?.userId;

  const doctorName = doctor
    ? `${doctor.firstName} ${doctor.lastName}`
    : "Doctor";

  const initials = doctor
    ? `${doctor.firstName?.[0] || ""}${doctor.lastName?.[0] || ""}`
    : "DR";

  const dept = appointment?.departmentId?.deptName || "General";

  const date = formatAppointmentDate(
    appointment.appointmentDate
  );

  const time = `${formatTo12Hour(appointment?.timeslot?.start)} - ${formatTo12Hour(appointment?.timeslot?.end)}`;

  // 🎨 STATUS COLOR
  const getStatusColor = (status: string) => {
    switch (status) {
      case "BOOKED":
        return styles.booked;
      case "COMPLETED":
        return styles.completed;
      case "CANCELLED":
        return styles.cancelled;
      default:
        return styles.defaultStatus;
    }
  };

  // ❌ CANCEL
  const handleCancel = () => {
    Alert.alert("Cancel Appointment", "Are you sure?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            setCancelLoading(true);
            await cancelAppointment(appointment._id);

            Alert.alert("Success", "Appointment cancelled");
            onRefresh && onRefresh();
          } catch (err: any) {
            Alert.alert("Error", err?.message || "Cancel failed");
          } finally {
            setCancelLoading(false);
          }
        }
      }
    ]);
  };

  // 🔁 RESCHEDULE
  const handleReschedule = () => {
    onReschedule?.({
      doctorId: appointment?.doctorId?._id,
      appointmentId: appointment?._id
    });
  };

  return (
    <View style={styles.card}>

      {/* 🔥 TOP ROW */}
      <View style={styles.topRow}>

        {/* 👤 AVATAR */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {/* INFO */}
        <View style={styles.info}>
          <Text style={styles.name}>{doctorName}</Text>
          <Text style={styles.dept}>{dept}</Text>
        </View>

        {/* STATUS */}
        <View style={[styles.statusBox, getStatusColor(appointment.status)]}>
          <Text style={styles.statusText}>{appointment.status}</Text>
        </View>
      </View>

      {/* 📅 DATE + TIME */}
      <View style={styles.middleRow}>
        <Text style={styles.infoText}>{date}</Text>
        <Text style={styles.infoText}>{time}</Text>
      </View>

      {/* 🔽 ACTIONS */}
      {appointment.status === "BOOKED" && (
        <View style={styles.buttonGroup}>

          <TouchableOpacity
            style={styles.rescheduleBtn}
            onPress={handleReschedule}
          >
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={handleCancel}
            disabled={cancelLoading}
          >
            <Text style={styles.cancelText}>
              {cancelLoading ? "Cancelling..." : "Cancel"}
            </Text>
          </TouchableOpacity>

        </View>
      )}
    </View>
  );
}