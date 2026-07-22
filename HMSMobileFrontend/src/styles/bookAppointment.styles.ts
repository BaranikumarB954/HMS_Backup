import { StyleSheet } from "react-native";

export const bookAppointmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 20,
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 15,
  },

  reasonInput: {
    minHeight: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 16,

    fontSize: 15,
    color: "#1E293B",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,

    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: -3,
    },

    elevation: 10,
  },

  bookButton: {
    backgroundColor: "#3B82F6",

    height: 58,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#3B82F6",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  // Optional reusable styles

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginVertical: 18,
  },
});