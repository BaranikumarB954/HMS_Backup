import { StyleSheet } from "react-native";

export const bottomNavStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 10,
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 4,
  },

  activeLabel: {
    color: "#2563eb",
    fontWeight: "600",
  },
});