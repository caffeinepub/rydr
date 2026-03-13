import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

const FAQ = [
  {
    id: "post-ride",
    q: "How do I post a ride?",
    a: "Tap the 'Publish' button in the bottom navigation. Fill in your departure and destination, date, time, available seats, and price per seat. You can also set ride preferences like pets or smoking rules.",
  },
  {
    id: "book-ride",
    q: "How do I book a ride?",
    a: "Search for a ride from the home screen by entering your departure and destination. Browse the results, tap a ride you like, review the details, and tap 'Book Seat'. The driver will confirm your booking.",
  },
  {
    id: "contact-support",
    q: "How do I contact support?",
    a: "You can reach the RYDR support team anytime by emailing support@rydr.in. We aim to respond within 24 hours on business days.",
  },
  {
    id: "cancel-booking",
    q: "How do I cancel a booking?",
    a: "Go to your bookings in the dashboard, find the booking you want to cancel, and tap 'Cancel Booking'. Please note that frequent cancellations may affect your trust score.",
  },
];

export function AccountHelpPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background" data-ocid="help.page">
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="help.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Help &amp; FAQ</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground mb-6">
          Frequently asked questions about using RYDR.
        </p>
        <Accordion type="single" collapsible className="space-y-2">
          {FAQ.map((item, idx) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-border rounded-xl px-4 bg-card"
              data-ocid={`help.item.${idx + 1}`}
            >
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 p-4 rounded-xl border border-border bg-card text-center">
          <p className="text-sm font-semibold mb-1">Still need help?</p>
          <p className="text-xs text-muted-foreground">
            Email us at{" "}
            <a href="mailto:support@rydr.in" className="text-primary underline">
              support@rydr.in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
