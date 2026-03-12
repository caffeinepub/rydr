import { Skeleton } from "@/components/ui/skeleton";

function BubbleSkeleton({ sent }: { sent: boolean }) {
  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"} mb-3`}>
      {!sent && <Skeleton className="h-7 w-7 rounded-full mr-2 shrink-0" />}
      <div className="space-y-1.5 max-w-[70%]">
        <Skeleton
          className={`h-9 rounded-2xl ${sent ? "w-36" : "w-48"}`}
          style={{
            backgroundColor: sent
              ? "rgba(0,174,239,0.15)"
              : "oklch(0.16 0.03 240)",
          }}
        />
        <Skeleton className={`h-2.5 w-12 ${sent ? "ml-auto" : ""}`} />
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full" data-ocid="chat.loading_state">
      {/* Chat list skeleton */}
      <div className="flex-1 px-4 pt-4 space-y-2">
        {[false, true, false, false, true, false].map((sent, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items are positional
          <BubbleSkeleton key={i} sent={sent} />
        ))}
      </div>
      {/* Input skeleton */}
      <div
        className="px-4 py-3 border-t border-border flex items-center gap-2"
        style={{ backgroundColor: "oklch(0.10 0.03 240)" }}
      >
        <Skeleton className="flex-1 h-10 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}
