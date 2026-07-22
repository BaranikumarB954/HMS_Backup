import { StyleSheet } from "react-native";

export const myAppointmentStyles = StyleSheet.create({
  /* ===========================
      SCREEN
  =========================== */

  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  /* ===========================
      HEADER
  =========================== */

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: "#64748B",
  },

  /* ===========================
      TAB CONTAINER
  =========================== */

  tabContainer: {
    flexDirection: "row",

    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 10,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 5,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  tab: {
    flex: 1,

    height: 48,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 14,
  },

  activeTab: {
    backgroundColor: "#4DA6FF",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },

  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* ===========================
      LIST
  =========================== */

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 110,
  },

  /* ===========================
      LOADER
  =========================== */

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ===========================
      EMPTY STATE
  =========================== */

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 15,
    textAlign: "center",
    color: "#64748B",
    lineHeight: 22,
  },

  /* ===========================
      BOTTOM NAV SPACE
  =========================== */

  bottomSpacing: {
    height: 90,
  },

  /* ===========================
      SECTION TITLE
  =========================== */

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",

    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 5,
  },

  /* ===========================
      FILTER CHIP (Future Use)
  =========================== */

  chip: {
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 20,

    marginRight: 10,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  activeChip: {
    backgroundColor: "#4DA6FF",
    borderColor: "#4DA6FF",
  },

  chipText: {
    color: "#64748B",
    fontWeight: "600",
  },

  activeChipText: {
    color: "#FFFFFF",
  },

  /* ===========================
      SHADOW CARD (Reusable)
  =========================== */

  cardShadow: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },
});