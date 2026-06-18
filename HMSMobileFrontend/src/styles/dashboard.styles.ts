import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e293b",
  },

  subtitle: {
    color: "#64748b",
    marginTop: 4,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#334155",
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 12,
    color: "#64748b",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
  },

  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  activityCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  activityText: {
    fontSize: 14,
    color: "#334155",
  },
});