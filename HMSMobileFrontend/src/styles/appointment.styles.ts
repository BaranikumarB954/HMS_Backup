import { StyleSheet } from "react-native";

export const appointmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  deptContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },

  deptBtn: {
    padding: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginRight: 8,
  },

  deptActive: {
    backgroundColor: "#185FA5",
  },

  deptText: {
    fontSize: 12,
  },

  doctorCard: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
  },

  doctorName: {
    fontWeight: "600",
  },

  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  slot: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#E6F4EA",
  },

  slotBooked: {
    backgroundColor: "#E0E0E0",
  },

  slotSelected: {
    backgroundColor: "#185FA5",
  },

  slotText: {
    fontSize: 12,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#185FA5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});