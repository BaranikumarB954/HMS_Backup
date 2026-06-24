import { StyleSheet } from "react-native";
import { COLORS } from "./themeColors";

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
    paddingTop:30,
    padding: 10,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  /* 🔵 PRIMARY ACTION */
  primaryCard: {
    backgroundColor: COLORS.primary600,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  primaryCardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  primaryCardSub: {
    color: "#E6F1FB",
    fontSize: 12,
    marginTop: 4,
  },

  /* 🔲 GRID */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  actionCard: {
    width: "48%",
    backgroundColor: COLORS.cardBg,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
});