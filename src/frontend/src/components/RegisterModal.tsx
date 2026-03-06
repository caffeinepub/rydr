import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "../hooks/useQueries";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterModal({ open, onClose }: RegisterModalProps) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { mutateAsync, isPending } = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await mutateAsync({ name: name.trim(), avatarUrl });
      toast.success("Profile created! Welcome to RYDR.");
      onClose();
    } catch (err: any) {
      toast.error(
        err?.message ||
          "Profile creation failed. Please sign out and sign back in.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="register.dialog">
        <DialogHeader>
          <div className="flex justify-center mb-3">
            <img
              src="/assets/uploads/file_00000000650c720883073dd037e87b31-1.png"
              alt="RYDR"
              className="h-10 w-auto"
            />
          </div>
          <DialogTitle className="font-display text-xl font-black text-center">
            Welcome to RYDR
          </DialogTitle>
          <DialogDescription className="text-center">
            Set up your profile to start posting and booking rides.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="register-name">Display Name *</Label>
            <Input
              id="register-name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-ocid="register.name_input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-avatar">Avatar URL (optional)</Label>
            <Input
              id="register-avatar"
              placeholder="https://example.com/avatar.jpg"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              data-ocid="register.avatar_input"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !name.trim()}
            data-ocid="register.submit_button"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isPending ? "Creating..." : "Create Profile"}
          </Button>
          <p className="text-xs text-muted-foreground text-center pt-1">
            If this keeps failing, try signing out and signing back in.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
