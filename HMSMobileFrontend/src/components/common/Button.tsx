import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Button({ title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});