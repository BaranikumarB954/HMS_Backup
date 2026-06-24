import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { editProfileStyles as styles } from "../../styles/editProfile.styles";
import {
  getPatientProfile,
  updatePatientProfile   // ✅ added
} from "../../services/profile.service";

export default function EditProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<any>({});
  const [patient, setPatient] = useState<any>({});

  const [loading, setLoading] = useState(false); // ✅ added

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getPatientProfile();

      // ✅ FIXED RESPONSE
      setUser(res.user);
      setPatient(res.patient);
    } catch (err) {
      console.log(err);
    }
  };

  const getInitials = () => {
    return `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;
  };

  // ✅ NEW UPDATE FUNCTION
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,

        gender: patient.gender,
        dob: patient.dob,
        bloodGroup: patient.bloodGroup,

        street: patient?.address?.street,
        city: patient?.address?.city,
        state: patient?.address?.state,
        pincode: patient?.address?.pincode,

        emgContName: patient.emgContName,
        emgContPhone: patient.emgContPhone,
      };

      await updatePatientProfile(payload);

      alert("Profile updated successfully ✅");

      router.replace("/patient/profile");
    } catch (err: any) {
      alert(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/patient/profile')}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>

        <Text style={styles.title}>User Profile</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🔹 Profile Image */}
        <View style={styles.imageContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>

          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* 🔹 USER INFO */}
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Basic Info</Text>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={user.firstName}
            onChangeText={(v) => setUser({ ...user, firstName: v })}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={user.lastName}
            onChangeText={(v) => setUser({ ...user, lastName: v })}
          />

          <Text style={styles.label}>E-Mail</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            editable={false}
          />

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            style={styles.input}
            value={user.phone}
            onChangeText={(v) => setUser({ ...user, phone: v })}
          />
        </View>

        {/* 🔹 PATIENT INFO */}
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Medical Info</Text>

          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={patient.gender}
            onChangeText={(v) => setPatient({ ...patient, gender: v })}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={
              patient.dob
                ? new Date(patient.dob).toDateString()
                : ""
            }
          />

          <Text style={styles.label}>Blood Group</Text>
          <TextInput
            style={styles.input}
            value={patient.bloodGroup}
            onChangeText={(v) => setPatient({ ...patient, bloodGroup: v })}
          />
        </View>

        {/* 🔹 ADDRESS */}
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Address</Text>

          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            value={patient?.address?.street}
            onChangeText={(v) =>
              setPatient({
                ...patient,
                address: { ...patient.address, street: v }
              })
            }
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={patient?.address?.city}
            onChangeText={(v) =>
              setPatient({
                ...patient,
                address: { ...patient.address, city: v }
              })
            }
          />

          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={patient?.address?.state}
            onChangeText={(v) =>
              setPatient({
                ...patient,
                address: { ...patient.address, state: v }
              })
            }
          />

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            value={String(patient?.address?.pincode || "")}
            onChangeText={(v) =>
              setPatient({
                ...patient,
                address: { ...patient.address, pincode: v }
              })
            }
          />
        </View>

        {/* 🔹 EMERGENCY */}
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={patient.emgContName}
            onChangeText={(v) =>
              setPatient({ ...patient, emgContName: v })
            }
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={patient.emgContPhone}
            onChangeText={(v) =>
              setPatient({ ...patient, emgContPhone: v })
            }
          />
        </View>

        {/* 🔹 SAVE BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}   // ✅ CONNECTED
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "SAVE"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}