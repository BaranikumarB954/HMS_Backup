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