import type { Ride } from "../types";

/** Haversine distance in km between two lat/lng pairs */
export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Point-to-line-segment distance in km.
 * Checks if a point (ptLat/ptLng) is within the corridor of a route.
 */
export function pointToSegmentKm(
  ptLat: number,
  ptLng: number,
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number,
): number {
  const dx = bLng - aLng;
  const dy = bLat - aLat;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return haversineKm(ptLat, ptLng, aLat, aLng);
  const t = Math.max(
    0,
    Math.min(1, ((ptLng - aLng) * dx + (ptLat - aLat) * dy) / lenSq),
  );
  return haversineKm(ptLat, ptLng, aLat + t * dy, aLng + t * dx);
}

export type RideCoords = {
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
};

export type MatchResult = {
  ride: Ride;
  score: number; // 0-100
  pickupKm: number;
  destKm: number;
  isExact: boolean;
};

/**
 * Score a list of rides against search coordinates.
 * If no coords provided, all rides get score=50 (neutral).
 */
export function scoreRides(
  rides: Ride[],
  originCoords: { lat: number; lng: number } | null,
  destCoords: { lat: number; lng: number } | null,
  rideCoords: Map<string, RideCoords>,
): MatchResult[] {
  if (!originCoords || !destCoords) {
    return rides.map((r) => ({
      ride: r,
      score: 50,
      pickupKm: 0,
      destKm: 0,
      isExact: false,
    }));
  }

  return rides
    .map((ride) => {
      const coords = rideCoords.get(ride.id.toString());
      if (!coords)
        return { ride, score: 40, pickupKm: 999, destKm: 999, isExact: false };

      const pickupKm = haversineKm(
        originCoords.lat,
        originCoords.lng,
        coords.originLat,
        coords.originLng,
      );
      const destKm = pointToSegmentKm(
        destCoords.lat,
        destCoords.lng,
        coords.originLat,
        coords.originLng,
        coords.destLat,
        coords.destLng,
      );

      const pickupScore =
        pickupKm <= 1 ? 40 : pickupKm <= 3 ? 30 : pickupKm <= 5 ? 20 : 5;
      const destScore =
        destKm <= 5 ? 40 : destKm <= 15 ? 25 : destKm <= 30 ? 10 : 0;
      const seatsScore = Number(ride.seatsAvailable) > 0 ? 15 : 0;
      const score = Math.min(100, pickupScore + destScore + seatsScore);

      return {
        ride,
        score,
        pickupKm,
        destKm,
        isExact: pickupKm <= 2 && destKm <= 5,
      };
    })
    .sort((a, b) => b.score - a.score);
}
