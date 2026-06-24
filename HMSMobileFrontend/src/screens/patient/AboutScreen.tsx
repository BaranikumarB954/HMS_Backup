import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { aboutStyles as styles } from "../../styles/about.styles";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/patient/profile')}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>

        <Text style={styles.title}>About Us</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* 🔹 Content */}
      <View style={styles.card}>
        <Text style={styles.text}>
          This Hospital Management System helps patients manage appointments,
          health records, and personal details efficiently.
        </Text>

        <Text style={styles.text}>
          Our mission is to provide a seamless healthcare experience with
          secure and reliable digital services.
        </Text>
      </View>

    </View>
  );
}