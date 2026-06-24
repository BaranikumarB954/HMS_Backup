import { StyleSheet } from "react-native";

export const myAppointmentStyles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    padding: 4,
    margin: 10
  },

  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10
  },

  activeTab: {
    backgroundColor: "#6C63FF"
  },

  tabText: {
    color: "#666"
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "bold"
  }
});