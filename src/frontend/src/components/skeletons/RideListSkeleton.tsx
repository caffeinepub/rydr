import { Skeleton } from "@/components/ui/skeleton";

function RideCardSkeleton() {
  return (
    <div
      className="bg-card border border-border rounded-lg p-4 space-y-4"
      style={{ borderColor: "rgba(0,174,239,0.15)" }}
    >
      {/* Route */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="w-2.5 h-2.5 rounded-full" />
          <Skeleton className="w-px h-8" />
          <Skeleton className="w-2.5 h-2.5 rounded-full" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-8 w-14" />
      </div>
      {/* Meta */}
      <div className="flex gap-4">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
      {/* Badges */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
    </div>
  );
}

export function RideListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" data-ocid="rides.loading_state">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items are positional
        <RideCardSkeleton key={i} />
      ))}
    </div>
  );
}
