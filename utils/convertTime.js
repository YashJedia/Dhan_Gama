export default function convertTime(time) {
  let [hours, minutes, seconds] = time.split(":");
  hours = parseInt(hours);

  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Converts 0 to 12 for midnight, and handles 12 PM

  return `${hours}:${minutes} ${period}`;
}
