import { StyleSheet } from "react-native";

export const profileMainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
    paddingTop:40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  // 🔹 USER CARD
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  userLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#185FA5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  name: {
    fontSize: 14,
    color: "#6b7280",
  },

  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  // 🔹 MENU
  menuContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  menuText: {
    fontSize: 15,
    color: "#111827",
  },

  // 🔹 FOOTER
  footerCard: {
    marginTop: 20,
    backgroundColor: "#e5e7eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  footerText: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },

  link: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },

  // 🔹 PROFILE STATUS
  warning: {
    color: "#A32D2D",
    fontSize: 12,
    marginTop: 4,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#A32D2D",
    marginRight: 8,
  },

  infoCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D3D1C7",
    backgroundColor: "#fff",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: "#5F5E5A",
    marginTop: 8,
  },

  value: {
    fontSize: 14,
    color: "#2C2C2A",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#111827",
  },

  saveBtn: {
    backgroundColor: "#185FA5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  saveText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },

  blurOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)", // 🔥 THIS FIXES WHITE ISSUE
  },
  overlay: {
  flex: 1,
  justifyContent: "flex-end",
  backgroundColor: "rgba(0,0,0,0.3)", // ✅ IMPORTANT FIX
},

  closeArea: {
    flex: 1,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 3,
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#185FA5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  errorText: {
  color: "#dc2626",
  fontSize: 12,
  marginTop: 4,
  marginBottom: 8,
},

});