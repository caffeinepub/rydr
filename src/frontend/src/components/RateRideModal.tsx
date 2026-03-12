import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

interface RateRideModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  targetName: string;
  targetType: "driver" | "passenger";
}

export function RateRideModal({
  open,
  onClose,
  onSubmit,
  targetName,
  targetType,
}: RateRideModalProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [comment, setComment] = useState("");

  const handleClose = () => {
    setHoveredStar(0);
    setSelectedStar(0);
    setComment("");
    onClose();
  };

  const handleSubmit = () => {
    if (selectedStar === 0) return;
    onSubmit(selectedStar, comment.trim());
    setHoveredStar(0);
    setSelectedStar(0);
    setComment("");
  };

  const displayStar = hoveredStar || selectedStar;
  const label =
    displayStar === 1
      ? "Poor"
      : displayStar === 2
        ? "Fair"
        : displayStar === 3
          ? "Good"
          : displayStar === 4
            ? "Great"
            : displayStar === 5
              ? "Excellent!"
              : "Select a rating";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-sm" data-ocid="rate_ride.dialog">
        <DialogHeader>
          <DialogTitle className="font-display font-black">
            Rate {targetName}
          </DialogTitle>
          <DialogDescription>
            How was your experience with this{" "}
            {targetType === "driver" ? "driver" : "passenger"}?
          </DialogDescription>
        </DialogHeader>

        {/* Stars */}
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setSelectedStar(star)}
                className="transition-transform hover:scale-110 focus-visible:outline-none"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  className="h-9 w-9 transition-colors"
                  fill={star <= displayStar ? "#f59e0b" : "none"}
                  stroke={star <= displayStar ? "#f59e0b" : "currentColor"}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground min-h-[1.25rem]">
            {label}
          </span>
        </div>

        {/* Comment */}
        <Textarea
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          maxLength={300}
          className="resize-none"
          data-ocid="rate_ride.comment_textarea"
        />
        <p className="text-[11px] text-muted-foreground text-right -mt-2">
          {comment.length}/300
        </p>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            data-ocid="rate_ride.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedStar === 0}
            className="gap-2"
            data-ocid="rate_ride.submit_button"
          >
            <Star className="h-4 w-4" />
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
