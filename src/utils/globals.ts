export const formatDateTime = (dateTime : string | number | Date ) => {
  return new Date(dateTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
