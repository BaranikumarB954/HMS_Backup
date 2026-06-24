import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFE8",
    padding: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#D3D1C7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C2C2A",
  },

  email: {
    fontSize: 14,
    color: "#5F5E5A",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#2C2C2A",
  },

  label: {
    fontSize: 13,
    color: "#5F5E5A",
    marginTop: 8,
  },

  value: {
    fontSize: 14,
    color: "#2C2C2A",
  },

  warning: {
    marginTop: 10,
    color: "#A32D2D",
    fontSize: 12,
  },

  logoutBtn: {
    backgroundColor: "#185FA5",
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  modalContainer: {
  flex: 1,
  backgroundColor: "#F1EFE8",
  padding: 20,
  justifyContent: "flex-end",
},

dragBar: {
  width: 50,
  height: 5,
  backgroundColor: "#D3D1C7",
  alignSelf: "center",
  borderRadius: 10,
  marginBottom: 20,
},

modalTitle: {
  fontSize: 22,
  fontWeight: "700",
  textAlign: "center",
  marginBottom: 20,
  color: "#2C2C2A",
},

input: {
  height: 50,
  borderWidth: 1,
  borderColor: "#D3D1C7",
  borderRadius: 25,
  paddingHorizontal: 16,
  marginBottom: 15,
  backgroundColor: "#fff",
},

saveBtn: {
  height: 50,
  backgroundColor: "#1E2A78",
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
},

saveText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 14,
},
});