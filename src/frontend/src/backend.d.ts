import type { Principal } from "@dfinity/principal";
import type { Identity } from "@icp-sdk/core/agent";

export type ApprovalMode = { instant: null } | { manual: null };
export type RideStatus = { active: null } | { completed: null } | { cancelled: null };
export type BookingStatus = { pending: null } | { confirmed: null } | { rejected: null };

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
  averageRating: number;
  ratingCount: bigint;
};

export type UserRole = { admin: null } | { user: null } | { guest: null };

export interface backendInterface {
  _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
  getCallerUserRole(): Promise<UserRole>;
  assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
  isCallerAdmin(): Promise<boolean>;

  registerUser(name: string, avatarUrl: string): Promise<UserPublic>;
  getMyProfile(): Promise<[] | [UserPublic]>;
  getUserProfile(userId: Principal): Promise<[] | [UserPublic]>;

  postRide(
    origin: string,
    destination: string,
    date: string,
    departureTime: string,
    totalSeats: bigint,
    pricePerSeat: bigint,
    petsAllowed: boolean,
    smokingAllowed: boolean,
    luggageAllowed: boolean,
    approvalMode: ApprovalMode
  ): Promise<{ ok: Ride } | { err: string }>;

  searchRides(origin: string, destination: string, date: string): Promise<Ride[]>;
  getRideDetail(rideId: bigint): Promise<[] | [Ride]>;
  completeRide(rideId: bigint): Promise<{ ok: null } | { err: string }>;
  getMyPostedRides(): Promise<Ride[]>;

  bookRide(rideId: bigint): Promise<{ ok: Booking } | { err: string }>;
  getMyBookings(): Promise<Booking[]>;
  getBookingRequestsForDriver(): Promise<Booking[]>;
  approveBooking(bookingId: bigint): Promise<{ ok: null } | { err: string }>;
  rejectBooking(bookingId: bigint): Promise<{ ok: null } | { err: string }>;
  rateDriver(bookingId: bigint, rating: bigint): Promise<{ ok: null } | { err: string }>;
}

export type CreateActorOptions = {
  agentOptions?: {
    identity?: Identity;
    host?: string;
  };
  agent?: unknown;
  processError?: (error: unknown) => Error;
};

export declare class ExternalBlob {
  onProgress?: (progress: number) => void;
  getBytes(): Promise<Uint8Array>;
  static fromURL(url: string): ExternalBlob;
}

export declare function createActor(
  canisterId: string,
  uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions
): backendInterface;

export declare const canisterId: string;
