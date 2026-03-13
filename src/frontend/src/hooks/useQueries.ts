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
      try {
        const result = await (actor as any).getMyProfile();
        if (Array.isArray(result) && result.length === 0) return null;
        if (Array.isArray(result) && result.length > 0)
          return result[0] as UserPublic;
        return (result as UserPublic) ?? null;
      } catch (err) {
        console.error("[useMyProfile] error:", err);
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
    staleTime: 30000,
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
    onError: (err) => {
      console.error("[useRegisterUser] error:", err);
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
    onError: (err) => {
      console.error("[useUpdateProfile] error:", err);
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
      if (!actor) throw new Error("Not connected to backend");
      let result: any;
      try {
        result = await actor.updateUserProfile(
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
      } catch (err) {
        console.error("[useUpdateUserProfile] backend call failed:", err);
        throw new Error("Unable to update profile. Please try again.");
      }
      if (result && typeof result === "object" && "err" in result) {
        console.error("[useUpdateUserProfile] backend error:", result.err);
        throw new Error("Unable to update profile. Please try again.");
      }
      return result?.ok ?? result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (err) => {
      console.error("[useUpdateUserProfile] error:", err);
    },
  });
}

export function useGetUserProfile(userId: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<UserPublic | null>({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      try {
        const result = await (actor as any).getUserProfile(userId);
        if (Array.isArray(result) && result.length === 0) return null;
        if (Array.isArray(result) && result.length > 0)
          return result[0] as UserPublic;
        return (result as UserPublic) ?? null;
      } catch (err) {
        console.error("[useGetUserProfile] error:", err);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!userId,
    retry: 1,
    staleTime: 30000,
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
      try {
        return (actor as any).searchRides(origin, destination, date) as Promise<
          Ride[]
        >;
      } catch (err) {
        console.error("[useSearchRides] error:", err);
        return [];
      }
    },
    enabled: !!actor && !isFetching && enabled,
    retry: 1,
    staleTime: 30000,
  });
}

export function useRideDetail(rideId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Ride | null>({
    queryKey: ["rideDetail", rideId?.toString()],
    queryFn: async () => {
      if (!actor || rideId === undefined) return null;
      try {
        const result = await (actor as any).getRideDetail(rideId);
        if (Array.isArray(result) && result.length === 0) return null;
        if (Array.isArray(result) && result.length > 0)
          return result[0] as Ride;
        return (result as Ride) ?? null;
      } catch (err) {
        console.error("[useRideDetail] error:", err);
        return null;
      }
    },
    enabled: !!actor && !isFetching && rideId !== undefined,
    retry: 1,
    staleTime: 30000,
  });
}

export function useMyPostedRides() {
  const { actor, isFetching } = useActor();
  return useQuery<Ride[]>({
    queryKey: ["myPostedRides"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (actor as any).getMyPostedRides() as Promise<Ride[]>;
      } catch (err) {
        console.error("[useMyPostedRides] error:", err);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
    staleTime: 30000,
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
      let result: any;
      try {
        result = await (actor as any).postRide(
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
      } catch (err) {
        console.error("[usePostRide] error:", err);
        throw new Error("Failed to post ride. Please try again.");
      }
      if (result && typeof result === "object" && "err" in result) {
        console.error("[usePostRide] backend error:", result.err);
        throw new Error("Failed to post ride. Please try again.");
      }
      return result?.ok ?? result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPostedRides"] });
    },
    onError: (err) => {
      console.error("[usePostRide] mutation error:", err);
    },
  });
}

export function useCompleteRide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rideId: bigint) => {
      if (!actor) throw new Error("Not connected");
      let result: any;
      try {
        result = await (actor as any).completeRide(rideId);
      } catch (err) {
        console.error("[useCompleteRide] error:", err);
        throw new Error("Failed to complete ride. Please try again.");
      }
      if (result && typeof result === "object" && "err" in result) {
        console.error("[useCompleteRide] backend error:", result.err);
        throw new Error("Failed to complete ride. Please try again.");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPostedRides"] });
      queryClient.invalidateQueries({ queryKey: ["rideDetail"] });
    },
    onError: (err) => {
      console.error("[useCompleteRide] mutation error:", err);
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
      try {
        return (actor as any).getMyBookings() as Promise<Booking[]>;
      } catch (err) {
        console.error("[useMyBookings] error:", err);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
    staleTime: 30000,
  });
}

export function useBookingRequestsForDriver() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ["bookingRequests"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (actor as any).getBookingRequestsForDriver() as Promise<
          Booking[]
        >;
      } catch (err) {
        console.error("[useBookingRequestsForDriver] error:", err);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
    staleTime: 30000,
  });
}

export function useBookRide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rideId: bigint) => {
      if (!actor) throw new Error("Not connected");
      let result: any;
      try {
        result = await (actor as any).bookRide(rideId);
      } catch (err) {
        console.error("[useBookRide] error:", err);
        throw new Error("Failed to book ride. Please try again.");
      }
      if (result && typeof result === "object" && "err" in result) {
        console.error("[useBookRide] backend error:", result.err);
        throw new Error("Failed to book ride. Please try again.");
      }
      return result.ok as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["rideDetail"] });
    },
    onError: (err) => {
      console.error("[useBookRide] mutation error:", err);
    },
  });
}

export function useApproveBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: bigint) => {
      if (!actor) throw new Error("Not connected");
      let result: any;
      try {
        result = await (actor as any).approveBooking(bookingId);
      } catch (err) {
        console.error("[useApproveBooking] error:", err);
        throw new Error("Failed to approve booking. Please try again.");
      }
      if (result && typeof result === "object" && "err" in result) {
        console.error("[useApproveBooking] backend error:", result.err);
        throw new Error("Failed to approve booking. Please try again.");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
    onError: (err) => {
      console.error("[useApproveBooking] mutation error:", err);
    },
  });
}

export function useRejectBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: bigint) => {
      if (!actor) throw new Error("Not connected");
      let result: any;
      try {
        result = await (actor as any).rejectBooking(bookingId);
      } catch (err) {
        console.error("[useRejectBooking] error:", err);
        throw new Error("Failed to reject booking. Please try again.");
      }
      if (result && typeof result === "object" && "err" in result) {
        console.error("[useRejectBooking] backend error:", result.err);
        throw new Error("Failed to reject booking. Please try again.");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
    onError: (err) => {
      console.error("[useRejectBooking] mutation error:", err);
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
      let result: any;
      try {
        result = await (actor as any).rateDriver(bookingId, rating);
      } catch (err) {
        console.error("[useRateDriver] error:", err);
        throw new Error("Failed to submit rating. Please try again.");
      }
      if (result && typeof result === "object" && "err" in result) {
        console.error("[useRateDriver] backend error:", result.err);
        throw new Error("Failed to submit rating. Please try again.");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
    onError: (err) => {
      console.error("[useRateDriver] mutation error:", err);
    },
  });
}
