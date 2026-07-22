// 🔥 CONVERT 24H → 12H FORMAT (WITH LEADING ZERO)
export const formatTo12Hour = (time: string): string => {
  if (!time) return "";

  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

  return `${formattedHour}:${minute} ${ampm}`;
};

export const formatAppointmentDate = (
  date: string
): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getStatusColor = (
  status: string
): string => {
  switch (status) {
    case "BOOKED":
      return "#3B82F6";

    case "COMPLETED":
      return "#22C55E";

    case "CANCELLED":
      return "#EF4444";

    default:
      return "#94A3B8";
  }
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";

  if (hour < 17) return "Good Afternoon";

  return "Good Evening";
};

export const formatCurrency = (
  amount: number
): string => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const getInitials = (
  firstName?: string,
  lastName?: string
): string => {
  const first = firstName?.charAt(0).toUpperCase() || "";

  const last = lastName?.charAt(0).toUpperCase() || "";

  return `${first}${last}` || "DR";
}