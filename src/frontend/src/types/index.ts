import type { Principal } from "@dfinity/principal";

export type ApprovalMode = { instant: null } | { manual: null };
export type RideStatus =
  | { active: null }
  | { completed: null }
  | { cancelled: null };
export type BookingStatus =
  | { pending: null }
  | { confirmed: null }
  | { rejected: null };

export type Ride = {
  id: bigint;
  driverId: Principal;
  origin: string;
  destination: string;
  date: string;
  departureTime: string;
  totalSeats: bigint;
  seatsAvailable: bigint;
  pricePerSeat: bigint;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  luggageAllowed: boolean;
  approvalMode: ApprovalMode;
  status: RideStatus;
  createdAt: bigint;
};

export type Booking = {
  id: bigint;
  rideId: bigint;
  riderId: Principal;
  status: BookingStatus;
  ratingGiven: [] | [bigint];
  createdAt: bigint;
};

export type UserPublic = {
  id: Principal;
  name: string;
  avatarUrl: string;
  city: string;
  about: string;
  chatPref: string;
  petsPreference: string;
  smokingPreference: string;
  luggagePreference: string;
  carBrand: string;
  carColor: string;
  vehicleType: string;
  licensePlate: string;
  facebookUrl: string;
  linkedinUrl: string;
  averageRating: number;
  ratingCount: bigint;
};

// Utility functions
export function getRideStatusLabel(status: RideStatus): string {
  if ("active" in status) return "Active";
  if ("completed" in status) return "Completed";
  if ("cancelled" in status) return "Cancelled";
  return "Unknown";
}

export function getBookingStatusLabel(status: BookingStatus): string {
  if ("pending" in status) return "Pending";
  if ("confirmed" in status) return "Confirmed";
  if ("rejected" in status) return "Rejected";
  return "Unknown";
}

export function isApprovalModeInstant(mode: ApprovalMode): boolean {
  return "instant" in mode;
}

export function isRideActive(status: RideStatus): boolean {
  return "active" in status;
}

export function isRideCompleted(status: RideStatus): boolean {
  return "completed" in status;
}

export function isBookingConfirmed(status: BookingStatus): boolean {
  return "confirmed" in status;
}

export function isBookingPending(status: BookingStatus): boolean {
  return "pending" in status;
}
