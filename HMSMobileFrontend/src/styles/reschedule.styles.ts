import { StyleSheet } from "react-native";

export const RescheduleCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16
  },

  // 📅 DATE
  dateBox: {
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginRight: 10
  },

  activeDate: {
    backgroundColor: "#6366F1"
  },

  dateText: {
    color: "#111",
    fontSize: 13
  },

  // ⏰ SLOTS
  slotContainer: {
    marginTop: 20
  },

  sectionTitle: {
    fontSize: 14,
    marginBottom: 10
  },

  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },

  slotBox: {
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 8
  },

  activeSlot: {
    backgroundColor: "#6366F1"
  },

  slotText: {
    fontSize: 12,
    color: "#111"
  },

  // ✅ BUTTON
  confirmBtn: {
    marginTop: 30,
    backgroundColor: "#6366F1",
    padding: 14,
    borderRadius: 12,
    alignItems: "center"
  },

  confirmText: {
    color: "#fff",
    fontWeight: "600"
  }
});