import { ShieldCheck } from "lucide-react";

interface TrustSealProps {
  className?: string;
  compact?: boolean;
}

export function TrustSeal({ className = "", compact = false }: TrustSealProps) {
  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium ${className}`}
        data-ocid="trust.seal"
      >
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
        <span>Verified &amp; Secure Platform</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-black/60 backdrop-blur-sm text-primary text-sm font-medium ${className}`}
      data-ocid="trust.seal"
    >
      <ShieldCheck className="h-4 w-4 shrink-0" />
      <span>Your data is safe &amp; secure</span>
    </div>
  );
}
