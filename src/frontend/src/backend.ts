import { Actor, type ActorConfig } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { IDL } from "@dfinity/candid";

// Re-export types
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
    origin: string, destination: string, date: string, departureTime: string,
    totalSeats: bigint, pricePerSeat: bigint,
    petsAllowed: boolean, smokingAllowed: boolean, luggageAllowed: boolean,
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
    identity?: import("@icp-sdk/core/agent").Identity | Promise<import("@icp-sdk/core/agent").Identity>;
    host?: string;
  };
  agent?: unknown;
  processError?: (error: unknown) => Error;
};

export class ExternalBlob {
  private _url?: string;
  private _bytes?: Uint8Array;
  onProgress?: (progress: number) => void;

  constructor(bytes?: Uint8Array) {
    this._bytes = bytes;
  }

  async getBytes(): Promise<Uint8Array> {
    if (this._bytes) return this._bytes;
    if (this._url) {
      const response = await fetch(this._url);
      this._bytes = new Uint8Array(await response.arrayBuffer());
      return this._bytes;
    }
    return new Uint8Array();
  }

  static fromURL(url: string): ExternalBlob {
    const blob = new ExternalBlob();
    blob._url = url;
    return blob;
  }
}

// IDL factory for the RYDR backend
const idlFactory = ({ IDL: I }: { IDL: typeof IDL }) => {
  const ApprovalMode = I.Variant({ instant: I.Null, manual: I.Null });
  const RideStatus = I.Variant({ active: I.Null, completed: I.Null, cancelled: I.Null });
  const BookingStatus = I.Variant({ pending: I.Null, confirmed: I.Null, rejected: I.Null });
  const UserRole = I.Variant({ admin: I.Null, user: I.Null, guest: I.Null });

  const UserPublic = I.Record({
    id: I.Principal,
    name: I.Text,
    avatarUrl: I.Text,
    averageRating: I.Float64,
    ratingCount: I.Nat,
  });

  const Ride = I.Record({
    id: I.Nat,
    driverId: I.Principal,
    origin: I.Text,
    destination: I.Text,
    date: I.Text,
    departureTime: I.Text,
    totalSeats: I.Nat,
    seatsAvailable: I.Nat,
    pricePerSeat: I.Nat,
    petsAllowed: I.Bool,
    smokingAllowed: I.Bool,
    luggageAllowed: I.Bool,
    approvalMode: ApprovalMode,
    status: RideStatus,
    createdAt: I.Int,
  });

  const Booking = I.Record({
    id: I.Nat,
    rideId: I.Nat,
    riderId: I.Principal,
    status: BookingStatus,
    ratingGiven: I.Opt(I.Nat),
    createdAt: I.Int,
  });

  const RideResult = I.Variant({ ok: Ride, err: I.Text });
  const BookingResult = I.Variant({ ok: Booking, err: I.Text });
  const OkResult = I.Variant({ ok: I.Null, err: I.Text });

  return I.Service({
    _initializeAccessControlWithSecret: I.Func([I.Text], [], []),
    getCallerUserRole: I.Func([], [UserRole], ["query"]),
    assignCallerUserRole: I.Func([I.Principal, UserRole], [], []),
    isCallerAdmin: I.Func([], [I.Bool], ["query"]),
    registerUser: I.Func([I.Text, I.Text], [UserPublic], []),
    getMyProfile: I.Func([], [I.Opt(UserPublic)], ["query"]),
    getUserProfile: I.Func([I.Principal], [I.Opt(UserPublic)], ["query"]),
    postRide: I.Func(
      [I.Text, I.Text, I.Text, I.Text, I.Nat, I.Nat, I.Bool, I.Bool, I.Bool, ApprovalMode],
      [RideResult], []
    ),
    searchRides: I.Func([I.Text, I.Text, I.Text], [I.Vec(Ride)], ["query"]),
    getRideDetail: I.Func([I.Nat], [I.Opt(Ride)], ["query"]),
    completeRide: I.Func([I.Nat], [OkResult], []),
    getMyPostedRides: I.Func([], [I.Vec(Ride)], ["query"]),
    bookRide: I.Func([I.Nat], [BookingResult], []),
    getMyBookings: I.Func([], [I.Vec(Booking)], ["query"]),
    getBookingRequestsForDriver: I.Func([], [I.Vec(Booking)], ["query"]),
    approveBooking: I.Func([I.Nat], [OkResult], []),
    rejectBooking: I.Func([I.Nat], [OkResult], []),
    rateDriver: I.Func([I.Nat, I.Nat], [OkResult], []),
  });
};

export const canisterId = "placeholder";

export function createActor(
  canisterId: string,
  _uploadFile?: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile?: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions & { agent?: unknown; processError?: (e: unknown) => Error }
): backendInterface {
  const actorConfig: ActorConfig = {
    canisterId: Principal.fromText(canisterId),
    agent: options?.agent as never,
  };

  return Actor.createActor(idlFactory as never, actorConfig) as unknown as backendInterface;
}
