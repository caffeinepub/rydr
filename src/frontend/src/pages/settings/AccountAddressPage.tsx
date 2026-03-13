import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AccountAddressPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please enter a postal address.");
      return;
    }
    setSaving(true);
    try {
      // Persist locally for now
      localStorage.setItem("rydr_postal_address", address.trim());
      toast.success("Address saved.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background" data-ocid="address.page">
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="address.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Postal Address</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="postal-address">Postal Address</Label>
            <Input
              id="postal-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 123 MG Road, Bengaluru, Karnataka 560001"
              data-ocid="address.input"
            />
          </div>
          <Button
            type="submit"
            disabled={saving}
            className="w-full gap-2"
            data-ocid="address.save_button"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving..." : "Save Address"}
          </Button>
        </form>
      </div>
    </main>
  );
}
