import { Skeleton } from "@/components/ui/skeleton";

function StatTileSkeleton() {
  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{
        backgroundColor: "oklch(0.12 0.04 240)",
        border: "1px solid rgba(0,174,239,0.15)",
      }}
    >
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-7 w-16" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

function RideRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 space-y-6"
      data-ocid="dashboard.loading_state"
    >
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatTileSkeleton />
        <StatTileSkeleton />
        <StatTileSkeleton />
        <StatTileSkeleton />
      </div>
      {/* Recent rides */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: "oklch(0.12 0.04 240)",
          border: "1px solid rgba(0,174,239,0.15)",
        }}
      >
        <Skeleton className="h-4 w-24 mb-4" />
        <RideRowSkeleton />
        <RideRowSkeleton />
        <RideRowSkeleton />
      </div>
    </div>
  );
}
