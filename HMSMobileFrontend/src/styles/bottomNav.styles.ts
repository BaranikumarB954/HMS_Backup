import { StyleSheet } from "react-native";
import { COLORS } from "./themeColors";

export const bottomNavStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    backgroundColor: COLORS.cardBg,
    borderTopWidth: 0.5,
    borderColor: COLORS.border,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: {
    position: "relative", // ✅ needed for red dot
  },

  label: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: "500",
  },

  activeLabel: {
    color: COLORS.primary600,
    fontWeight: "600",
  },

  // 🔴 Profile incomplete indicator
  redDot: {
    position: "absolute",
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.dangerText,
  },
});