import { StyleSheet } from "react-native";
import { COLORS } from "./themeColors";

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.pageBg,
  },

  container: {
    margin: 20,
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
    color: COLORS.textPrimary,
  },
});