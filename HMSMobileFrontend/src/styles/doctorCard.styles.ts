import { StyleSheet } from "react-native";

export const doctorCardStyles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 3
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#4DA6FF",
    justifyContent: "center",
    alignItems: "center"
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },

  info: {
    flex: 1,
    marginLeft: 10
  },

  name: {
    fontWeight: "bold",
    fontSize: 16
  },

  specialization: {
    color: "#666",
    marginTop: 2
  },

  ratingBox: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10
  },

  rating: {
    fontSize: 12
  },

  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },

  available: {
    color: "green",
    fontWeight: "bold"
  },

  time: {
    color: "#666",
    marginTop: 2
  },

  feeBox: {
    alignItems: "flex-end"
  },

  fee: {
    fontWeight: "bold",
    fontSize: 16
  },

  feeLabel: {
    fontSize: 12,
    color: "#888"
  },

  button: {
    marginTop: 15,
    backgroundColor: "#1F4E5F", // 🔥 dark bluish like your UI
    padding: 12,
    borderRadius: 12,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }

});