import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { doctorCardStyles as styles } from "@/src/styles/doctorCard.styles";
import { formatTo12Hour,formatCurrency,getInitials } from "@/src/utils/commonFunctions";

export default function DoctorCard({ doctor }: any) {
  const router = useRouter();

  const fullName = `${doctor.firstName} ${doctor.lastName}`;
  // const initials = `${doctor.firstName[0]}${doctor.lastName[0]}`;
  const initials = getInitials(
  doctor.firstName,
  doctor.lastName
);
  return (
    <View style={styles.card}>

      {/* 🔥 TOP SECTION */}
      <View style={styles.topRow}>

        {/* PROFILE */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {/* DETAILS */}
        <View style={styles.info}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.specialization}>
            {doctor.specialization} ({doctor.expYears} yrs exp)
          </Text>
        </View>

        {/* RATING */}
        <View style={styles.ratingBox}>
          <Text style={styles.rating}>⭐ 4.8</Text>
        </View>

      </View>

      {/* 🔥 MIDDLE SECTION */}
      <View style={styles.middleRow}>

        {/* AVAILABLE */}
        <View>
          <Text style={styles.available}>Available Now</Text>
          <Text>
            {formatTo12Hour(doctor.avlblStartTime)} -{" "}
            {formatTo12Hour(doctor.avlblEndTime)}
          </Text>
        </View>

        {/* FEE */}
        <View style={styles.feeBox}>
          <Text style={styles.fee}>{formatCurrency(doctor.consultationFee)}</Text>
          <Text style={styles.feeLabel}>Consultation Fee</Text>
        </View>

      </View>

      {/* 🔥 BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/patient/appointment/bookAppointment",
            params: {
              empId: doctor.employeeId,
              doctorName: `${doctor.firstName} ${doctor.lastName}`,
              specialization: doctor.specialization,
              fee: doctor.consultationFee,
              deptName: doctor.departmentName || doctor.deptName
            }
          })
        }
      >
        <Text style={styles.buttonText}>
          Book Appointment →
        </Text>
      </TouchableOpacity>

    </View>
  );
}