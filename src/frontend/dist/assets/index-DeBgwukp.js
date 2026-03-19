function getRideStatusLabel(status) {
  if ("active" in status) return "Active";
  if ("completed" in status) return "Completed";
  if ("cancelled" in status) return "Cancelled";
  return "Unknown";
}
function getBookingStatusLabel(status) {
  if ("pending" in status) return "Pending";
  if ("confirmed" in status) return "Confirmed";
  if ("rejected" in status) return "Rejected";
  return "Unknown";
}
function isRideActive(status) {
  return "active" in status;
}
function isRideCompleted(status) {
  return "completed" in status;
}
function isBookingConfirmed(status) {
  return "confirmed" in status;
}
function isBookingPending(status) {
  return "pending" in status;
}
export {
  isBookingConfirmed as a,
  isRideActive as b,
  isRideCompleted as c,
  getBookingStatusLabel as d,
  getRideStatusLabel as g,
  isBookingPending as i
};
