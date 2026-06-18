import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Input(props: any) {
  return (
    <TextInput
      placeholderTextColor="#999"
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border
  }
});