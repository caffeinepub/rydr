import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AccountCommunicationPage() {
  const navigate = useNavigate();
  const [rideNotifs, setRideNotifs] = useState(true);
  const [chatNotifs, setChatNotifs] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);

  const handleChange = (
    setter: (v: boolean) => void,
    value: boolean,
    label: string,
  ) => {
    setter(value);
    toast.success(`${label} ${value ? "enabled" : "disabled"}.`);
  };

  return (
    <main className="min-h-screen bg-background" data-ocid="communication.page">
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="communication.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Communication Preferences</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-2">
        <p className="text-sm text-muted-foreground mb-4">
          Manage how RYDR communicates with you.
        </p>

        {/* Ride booking notifications */}
        <div
          className="flex items-center justify-between py-4 px-1"
          data-ocid="communication.ride_notifs.switch"
        >
          <div className="flex-1 min-w-0 mr-4">
            <Label className="text-sm font-semibold cursor-pointer">
              Ride booking notifications
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Alerts when someone books your ride or a booking is confirmed
            </p>
          </div>
          <Switch
            checked={rideNotifs}
            onCheckedChange={(v) =>
              handleChange(setRideNotifs, v, "Ride notifications")
            }
          />
        </div>

        <Separator />

        {/* Chat notifications */}
        <div
          className="flex items-center justify-between py-4 px-1"
          data-ocid="communication.chat_notifs.switch"
        >
          <div className="flex-1 min-w-0 mr-4">
            <Label className="text-sm font-semibold cursor-pointer">
              Chat message notifications
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Alerts when you receive new messages
            </p>
          </div>
          <Switch
            checked={chatNotifs}
            onCheckedChange={(v) =>
              handleChange(setChatNotifs, v, "Chat notifications")
            }
          />
        </div>

        <Separator />

        {/* Promo emails */}
        <div
          className="flex items-center justify-between py-4 px-1"
          data-ocid="communication.promo_emails.switch"
        >
          <div className="flex-1 min-w-0 mr-4">
            <Label className="text-sm font-semibold cursor-pointer">
              Promotional emails
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tips, new features, and RYDR updates
            </p>
          </div>
          <Switch
            checked={promoEmails}
            onCheckedChange={(v) =>
              handleChange(setPromoEmails, v, "Promotional emails")
            }
          />
        </div>
      </div>
    </main>
  );
}
