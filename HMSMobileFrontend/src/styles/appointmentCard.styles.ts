import { StyleSheet } from "react-native";

export const appointmentCardStyles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111"
  },

  dept: {
    fontSize: 13,
    color: "#777",
    marginTop: 4
  },

  statusBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600"
  },

  // 🎨 STATUS COLORS
  booked: {
    backgroundColor: "#E0F2FE"
  },

  completed: {
    backgroundColor: "#DCFCE7"
  },

  cancelled: {
    backgroundColor: "#FEE2E2"
  },

  defaultStatus: {
    backgroundColor: "#E5E7EB"
  },

  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },

  infoText: {
    fontSize: 13,
    color: "#444"
  },

  bottomRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  type: {
    fontSize: 12,
    color: "#666"
  },

  // ❌ CANCEL BUTTON (red)
  cancelBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8
  },

  cancelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  },
  avatar: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#6C63FF", // 🔥 purple like UI
  justifyContent: "center",
  alignItems: "center"
},

avatarText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16
},

info: {
  flex: 1,
  marginLeft: 10
},

buttonGroup: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 12
},

rescheduleBtn: {
  backgroundColor: "#EDEBFF",
  padding: 10,
  borderRadius: 10
},

rescheduleText: {
  color: "#6C63FF",
  fontWeight: "bold"
},
});