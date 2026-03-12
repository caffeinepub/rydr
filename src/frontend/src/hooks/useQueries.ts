import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApprovalMode, Booking, Ride, UserPublic } from "../types";
import { useActor } from "./useActor";

// ── User queries ──────────────────────────────────────────────

export function useMyProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserPublic | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (actor as any).getMyProfile();
      if (Array.isArray(result) && result.length === 0) return null;
      if (Array.isArray(result) && result.length > 0)
        return result[0] as UserPublic;
      return (result as UserPublic) ?? null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      avatarUrl,
    }: { name: string; avatarUrl: string }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).registerUser(
        name,
        avatarUrl,
      ) as Promise<UserPublic>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      avatarUrl,
    }: { name: string; avatarUrl: string }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).registerUser(
        name,
        avatarUrl,
      ) as Promise<UserPublic>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
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
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateUserProfile(
        params.name,
        params.avatarUrl,
        params.city,
        params.about,
        params.chatPref,
        params.petsPreference,
        params.smokingPreference,
        params.luggagePreference,
        params.carBrand,
        params.carColor,
        params.vehicleType,
        params.licensePlate,
        params.facebookUrl,
        params.linkedinUrl,
      );
      if (result && "err" in result) throw new Error(result.err);
      return result?.ok ?? result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useGetUserProfile(userId: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<UserPublic | null>({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const result = await (actor as any).getUserProfile(userId);
      if (Array.isArray(result) && result.length === 0) return null;
      if (Array.isArray(result) && result.length > 0)
        return result[0] as UserPublic;
      return (result as UserPublic) ?? null;
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ── Ride queries ──────────────────────────────────────────────

export function useSearchRides(
  origin: string,
  destination: string,
  date: string,
  enabled: boolean,
) {
  const { actor, isFetching } = useActor();
  return useQuery<Ride[]>({
    queryKey: ["searchRides", origin, destination, date],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).searchRides(origin, destination, date) as Promise<
        Ride[]
      >;
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useRideDetail(rideId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Ride | null>({
    queryKey: ["rideDetail", rideId?.toString()],
    queryFn: async () => {
      if (!actor || rideId === undefined) return null;
      const result = await (actor as any).getRideDetail(rideId);
      if (Array.isArray(result) && result.length === 0) return null;
      if (Array.isArray(result) && result.length > 0) return result[0] as Ride;
      return (result as Ride) ?? null;
    },
    enabled: !!actor && !isFetching && rideId !== undefined,
  });
}

export function useMyPostedRides() {
  const { actor, isFetching } = useActor();
  return useQuery<Ride[]>({
    queryKey: ["myPostedRides"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyPostedRides() as Promise<Ride[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostRide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      origin: string;
      destination: string;
      date: string;
      departureTime: string;
      totalSeats: bigint;
      pricePerSeat: bigint;
      petsAllowed: boolean;
      smokingAllowed: boolean;
      luggageAllowed: boolean;
      approvalMode: ApprovalMode;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).postRide(
        params.origin,
        params.destination,
        params.date,
        params.departureTime,
        params.totalSeats,
        params.pricePerSeat,
        params.petsAllowed,
        params.smokingAllowed,
        params.luggageAllowed,
        params.approvalMode,
      );
      if (result && "err" in result) throw new Error(result.err);
      return result?.ok ?? result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPostedRides"] });
    },
  });
}

export function useCompleteRide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rideId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).completeRide(rideId);
      if ("err" in result) throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPostedRides"] });
      queryClient.invalidateQueries({ queryKey: ["rideDetail"] });
    },
  });
}

// ── Booking queries ───────────────────────────────────────────

export function useMyBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyBookings() as Promise<Booking[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookingRequestsForDriver() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ["bookingRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getBookingRequestsForDriver() as Promise<Booking[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookRide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rideId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).bookRide(rideId);
      if ("err" in result) throw new Error(result.err);
      return result.ok as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["rideDetail"] });
    },
  });
}

export function useApproveBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).approveBooking(bookingId);
      if ("err" in result) throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
  });
}

export function useRejectBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).rejectBooking(bookingId);
      if ("err" in result) throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
  });
}

export function useRateDriver() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookingId,
      rating,
    }: { bookingId: bigint; rating: bigint }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).rateDriver(bookingId, rating);
      if ("err" in result) throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
}
