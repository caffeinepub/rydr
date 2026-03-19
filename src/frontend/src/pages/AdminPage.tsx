import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Car,
  CheckCircle,
  ChevronRight,
  CircleX,
  Clock,
  Flag,
  LayoutDashboard,
  Loader2,
  Lock,
  MapPin,
  Menu,
  MessageSquare,
  Palette,
  Server,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { PRESET_THEMES, useBranding } from "../context/BrandingContext";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useIsAdmin } from "../hooks/useIsAdmin";

// ── Types ──────────────────────────────────────────────────────

type TabId =
  | "dashboard"
  | "users"
  | "rides"
  | "disputes"
  | "fraud"
  | "analytics"
  | "system"
  | "branding"
  | "ratings";

// ── Mock Data ──────────────────────────────────────────────────

const MOCK_USERS = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    ridesTaken: 12,
    ridesPosted: 3,
    status: "active" as const,
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul.v@outlook.com",
    ridesTaken: 7,
    ridesPosted: 15,
    status: "active" as const,
  },
  {
    id: 3,
    name: "Anjali Patel",
    email: "anjali.p@yahoo.com",
    ridesTaken: 4,
    ridesPosted: 0,
    status: "suspended" as const,
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    ridesTaken: 22,
    ridesPosted: 8,
    status: "active" as const,
  },
  {
    id: 5,
    name: "Sneha Joshi",
    email: "sneha.j@hotmail.com",
    ridesTaken: 1,
    ridesPosted: 0,
    status: "banned" as const,
  },
  {
    id: 6,
    name: "Arjun Mehta",
    email: "arjun.m@gmail.com",
    ridesTaken: 9,
    ridesPosted: 6,
    status: "active" as const,
  },
  {
    id: 7,
    name: "Kavya Reddy",
    email: "kavya.r@proton.me",
    ridesTaken: 18,
    ridesPosted: 4,
    status: "active" as const,
  },
  {
    id: 8,
    name: "Deepak Kumar",
    email: "deepak.k@gmail.com",
    ridesTaken: 3,
    ridesPosted: 0,
    status: "suspended" as const,
  },
];

const MOCK_RIDES = [
  {
    id: 1,
    route: "Mumbai → Pune",
    driver: "Rahul Verma",
    date: "2026-03-08",
    seats: 3,
    status: "active" as const,
    price: "₹350",
  },
  {
    id: 2,
    route: "Delhi → Agra",
    driver: "Vikram Singh",
    date: "2026-03-07",
    seats: 2,
    status: "completed" as const,
    price: "₹450",
  },
  {
    id: 3,
    route: "Bengaluru → Mysuru",
    driver: "Arjun Mehta",
    date: "2026-03-09",
    seats: 4,
    status: "active" as const,
    price: "₹280",
  },
  {
    id: 4,
    route: "Chennai → Pondicherry",
    driver: "Kavya Reddy",
    date: "2026-03-06",
    seats: 2,
    status: "completed" as const,
    price: "₹320",
  },
  {
    id: 5,
    route: "Hyderabad → Warangal",
    driver: "Rahul Verma",
    date: "2026-03-10",
    seats: 3,
    status: "active" as const,
    price: "₹220",
  },
  {
    id: 6,
    route: "Jaipur → Udaipur",
    driver: "Vikram Singh",
    date: "2026-03-05",
    seats: 1,
    status: "cancelled" as const,
    price: "₹500",
  },
  {
    id: 7,
    route: "Kolkata → Durgapur",
    driver: "Arjun Mehta",
    date: "2026-03-11",
    seats: 2,
    status: "active" as const,
    price: "₹180",
  },
  {
    id: 8,
    route: "Ahmedabad → Surat",
    driver: "Kavya Reddy",
    date: "2026-03-04",
    seats: 4,
    status: "completed" as const,
    price: "₹240",
  },
  {
    id: 9,
    route: "Pune → Nashik",
    driver: "Rahul Verma",
    date: "2026-03-12",
    seats: 3,
    status: "active" as const,
    price: "₹200",
  },
  {
    id: 10,
    route: "Lucknow → Varanasi",
    driver: "Vikram Singh",
    date: "2026-03-03",
    seats: 2,
    status: "cancelled" as const,
    price: "₹380",
  },
];

const MOCK_DISPUTES = [
  {
    id: 1,
    reporter: "Priya Sharma",
    against: "Rahul Verma",
    type: "Safety",
    description: "Driver was reckless on highway.",
    status: "open" as const,
    comment: "",
  },
  {
    id: 2,
    reporter: "Anjali Patel",
    against: "Vikram Singh",
    type: "No-show",
    description: "Driver didn't show up at pickup point.",
    status: "under_review" as const,
    comment: "Investigating GPS logs.",
  },
  {
    id: 3,
    reporter: "Arjun Mehta",
    against: "Sneha Joshi",
    type: "Payment",
    description: "Passenger cancelled last minute and wants refund.",
    status: "resolved" as const,
    comment: "Partial refund issued.",
  },
  {
    id: 4,
    reporter: "Kavya Reddy",
    against: "Deepak Kumar",
    type: "Other",
    description: "Inappropriate behavior during ride.",
    status: "rejected" as const,
    comment: "Insufficient evidence provided.",
  },
  {
    id: 5,
    reporter: "Vikram Singh",
    against: "Priya Sharma",
    type: "No-show",
    description: "Passenger never arrived at meeting point.",
    status: "open" as const,
    comment: "",
  },
];

const MOCK_FRAUD = [
  {
    id: 1,
    name: "Sneha Joshi",
    risk: "high" as const,
    reason: "Duplicate account detected",
    lastActivity: "2026-03-01",
  },
  {
    id: 2,
    name: "Deepak Kumar",
    risk: "high" as const,
    reason: "Fake booking pattern",
    lastActivity: "2026-03-02",
  },
  {
    id: 3,
    name: "Unknown User 3",
    risk: "high" as const,
    reason: "Spam account — multiple reports",
    lastActivity: "2026-02-28",
  },
  {
    id: 4,
    name: "Anjali Patel",
    risk: "medium" as const,
    reason: "Unusual cancellation rate (87%)",
    lastActivity: "2026-03-04",
  },
  {
    id: 5,
    name: "Ravi Teja",
    risk: "medium" as const,
    reason: "Multiple failed booking attempts",
    lastActivity: "2026-03-05",
  },
];

const MOCK_LOGS = [
  {
    id: "log-1",
    time: "2026-03-06 14:32:11",
    level: "INFO",
    message: "Canister heartbeat OK — cycle balance nominal",
  },
  {
    id: "log-2",
    time: "2026-03-06 13:18:44",
    level: "INFO",
    message: "User registered: principal-xxxxx",
  },
  {
    id: "log-3",
    time: "2026-03-06 12:05:02",
    level: "WARN",
    message: "High query latency detected (210ms spike)",
  },
  {
    id: "log-4",
    time: "2026-03-05 22:41:37",
    level: "INFO",
    message: "Ride #891 completed by Vikram Singh",
  },
  {
    id: "log-5",
    time: "2026-03-05 18:30:00",
    level: "ERROR",
    message: "Booking approval timeout — auto-rejected booking #128",
  },
];

const POPULAR_ROUTES = [
  { route: "Mumbai → Pune", bookings: 312, pct: 100 },
  { route: "Delhi → Agra", bookings: 278, pct: 89 },
  { route: "Bengaluru → Mysuru", bookings: 241, pct: 77 },
  { route: "Chennai → Pondicherry", bookings: 198, pct: 63 },
  { route: "Hyderabad → Warangal", bookings: 163, pct: 52 },
];

const AD_DAILY = [
  { day: "Mon", amount: 1050 },
  { day: "Tue", amount: 1180 },
  { day: "Wed", amount: 980 },
  { day: "Thu", amount: 1320 },
  { day: "Fri", amount: 1500 },
  { day: "Sat", amount: 1240 },
  { day: "Sun", amount: 890 },
];

// ── Nav items ──────────────────────────────────────────────────

const NAV_ITEMS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  { id: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { id: "rides", label: "Rides", icon: <Car className="h-4 w-4" /> },
  {
    id: "disputes",
    label: "Disputes",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "fraud",
    label: "Fraud Detection",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    id: "system",
    label: "System Health",
    icon: <Server className="h-4 w-4" />,
  },
  {
    id: "branding",
    label: "Branding",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    id: "ratings",
    label: "User Ratings",
    icon: <Star className="h-4 w-4" />,
  },
];

const MOCK_RATINGS = [
  {
    id: 1,
    reviewer: "Priya Sharma",
    target: "Rahul Verma",
    targetType: "driver" as const,
    rating: 5,
    comment: "Great ride!",
    date: "2026-03-10",
    flagged: false,
  },
  {
    id: 2,
    reviewer: "Rahul Verma",
    target: "Anjali Patel",
    targetType: "passenger" as const,
    rating: 4,
    comment: "On time.",
    date: "2026-03-09",
    flagged: false,
  },
  {
    id: 3,
    reviewer: "Vikram Singh",
    target: "Kavya Reddy",
    targetType: "driver" as const,
    rating: 2,
    comment: "Late by 30 min",
    date: "2026-03-08",
    flagged: true,
  },
  {
    id: 4,
    reviewer: "Anjali Patel",
    target: "Priya Sharma",
    targetType: "passenger" as const,
    rating: 5,
    comment: "Very polite.",
    date: "2026-03-07",
    flagged: false,
  },
  {
    id: 5,
    reviewer: "Kavya Reddy",
    target: "Vikram Singh",
    targetType: "driver" as const,
    rating: 1,
    comment: "Cancelled last minute",
    date: "2026-03-06",
    flagged: true,
  },
];

// ── Sub-components ─────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card className="border-border/50 bg-card/70 backdrop-blur-sm">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {label}
            </p>
            <p
              className="text-2xl font-bold text-foreground"
              style={{
                fontFamily: '"Cabinet Grotesk", system-ui, sans-serif',
              }}
            >
              {value}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    active: {
      label: "Active",
      className: "bg-green-500/15 text-green-400 border-green-500/30",
    },
    suspended: {
      label: "Suspended",
      className: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    },
    banned: {
      label: "Banned",
      className: "bg-red-500/15 text-red-400 border-red-500/30",
    },
    completed: {
      label: "Completed",
      className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-500/15 text-red-400 border-red-500/30",
    },
    open: {
      label: "Open",
      className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    under_review: {
      label: "Under Review",
      className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    },
    resolved: {
      label: "Resolved",
      className: "bg-green-500/15 text-green-400 border-green-500/30",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-500/15 text-red-400 border-red-500/30",
    },
    high: {
      label: "High Risk",
      className: "bg-red-500/15 text-red-400 border-red-500/30",
    },
    medium: {
      label: "Medium",
      className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    },
    low: {
      label: "Low",
      className: "bg-green-500/15 text-green-400 border-green-500/30",
    },
    INFO: {
      label: "INFO",
      className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    WARN: {
      label: "WARN",
      className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    },
    ERROR: {
      label: "ERROR",
      className: "bg-red-500/15 text-red-400 border-red-500/30",
    },
  };
  const m = map[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium border ${m.className}`}
    >
      {m.label}
    </Badge>
  );
}

// ── Tab: Dashboard ─────────────────────────────────────────────

function DashboardTab() {
  const recentActivity = [
    {
      id: "ra-1",
      icon: <Users className="h-3.5 w-3.5 text-primary" />,
      text: "New user registered — Ravi Teja",
      time: "2 min ago",
    },
    {
      id: "ra-2",
      icon: <Car className="h-3.5 w-3.5 text-blue-400" />,
      text: "Ride posted: Mumbai → Pune by Rahul Verma",
      time: "8 min ago",
    },
    {
      id: "ra-3",
      icon: <MessageSquare className="h-3.5 w-3.5 text-yellow-400" />,
      text: "Dispute filed: Safety complaint #47",
      time: "25 min ago",
    },
    {
      id: "ra-4",
      icon: <CheckCircle className="h-3.5 w-3.5 text-green-400" />,
      text: "Booking #1241 confirmed — Priya Sharma",
      time: "1 hr ago",
    },
    {
      id: "ra-5",
      icon: <Shield className="h-3.5 w-3.5 text-accent" />,
      text: "Driver Kavya Reddy verified",
      time: "2 hr ago",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="admin.dashboard.section">
      <div>
        <h2 className="text-xl font-bold mb-1">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Platform overview at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value="1,247"
          icon={<Users className="h-5 w-5 text-primary" />}
          color="bg-primary/10"
        />
        <StatCard
          label="Total Rides"
          value="3,891"
          icon={<Car className="h-5 w-5 text-blue-400" />}
          color="bg-blue-500/10"
        />
        <StatCard
          label="Active Bookings"
          value="156"
          icon={<Activity className="h-5 w-5 text-yellow-400" />}
          color="bg-yellow-500/10"
        />
        <StatCard
          label="Platform Health"
          value="98%"
          icon={<Server className="h-5 w-5 text-green-400" />}
          color="bg-green-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0"
                data-ocid={`admin.activity.item.${idx + 1}`}
              >
                <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">
                    {item.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.time}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Platform Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Overall Health", value: 98, color: "text-green-400" },
              {
                label: "Booking Success Rate",
                value: 94,
                color: "text-primary",
              },
              {
                label: "Driver Satisfaction",
                value: 89,
                color: "text-blue-400",
              },
              { label: "Rider Satisfaction", value: 91, color: "text-accent" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className={`text-sm font-bold ${item.color}`}>
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Tab: Users ─────────────────────────────────────────────────

function UsersTab() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5" data-ocid="admin.users.section">
      <div>
        <h2 className="text-xl font-bold mb-1">User Management</h2>
        <p className="text-sm text-muted-foreground">
          Search, view, and moderate platform users
        </p>
      </div>

      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
        data-ocid="admin.users.search_input"
      />

      <Card className="border-border/50 bg-card/70">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="admin.users.table">
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Email
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-center">
                    Taken
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-center">
                    Posted
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground py-10"
                      data-ocid="admin.users.empty_state"
                    >
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((user, idx) => (
                  <TableRow
                    key={user.id}
                    className="border-border/30 hover:bg-muted/20"
                    data-ocid={`admin.users.row.${idx + 1}`}
                  >
                    <TableCell className="font-medium text-sm">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {user.ridesTaken}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {user.ridesPosted}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
                          onClick={() =>
                            toast.warning(`User ${user.name} warned`)
                          }
                          data-ocid={`admin.users.warn.button.${idx + 1}`}
                        >
                          Warn
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-orange-500/40 text-orange-400 hover:bg-orange-500/10"
                          onClick={() =>
                            toast.info(`User ${user.name} suspended`)
                          }
                          data-ocid={`admin.users.suspend.button.${idx + 1}`}
                        >
                          Suspend
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-red-500/40 text-red-400 hover:bg-red-500/10"
                          onClick={() =>
                            toast.error(`User ${user.name} banned`)
                          }
                          data-ocid={`admin.users.delete_button.${idx + 1}`}
                        >
                          Ban
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Rides ─────────────────────────────────────────────────

function RidesTab() {
  const [filter, setFilter] = useState<
    "all" | "active" | "completed" | "cancelled"
  >("all");
  const filtered =
    filter === "all"
      ? MOCK_RIDES
      : MOCK_RIDES.filter((r) => r.status === filter);

  return (
    <div className="space-y-5" data-ocid="admin.rides.section">
      <div>
        <h2 className="text-xl font-bold mb-1">Ride Monitoring</h2>
        <p className="text-sm text-muted-foreground">
          Monitor and manage all platform rides
        </p>
      </div>

      <div className="flex gap-2" data-ocid="admin.rides.tab">
        {(["all", "active", "completed", "cancelled"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            className="capitalize text-xs h-8"
            onClick={() => setFilter(f)}
            data-ocid={`admin.rides.filter.${f}.button`}
          >
            {f}
          </Button>
        ))}
      </div>

      <Card className="border-border/50 bg-card/70">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="admin.rides.table">
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Route
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Driver
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Date
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-center">
                    Seats
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Price
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((ride, idx) => (
                  <TableRow
                    key={ride.id}
                    className="border-border/30 hover:bg-muted/20"
                    data-ocid={`admin.rides.row.${idx + 1}`}
                  >
                    <TableCell className="font-medium text-sm">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        {ride.route}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {ride.driver}
                    </TableCell>
                    <TableCell className="text-sm">{ride.date}</TableCell>
                    <TableCell className="text-center text-sm">
                      {ride.seats}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={ride.status} />
                    </TableCell>
                    <TableCell className="text-sm font-medium text-primary">
                      {ride.price}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-red-500/40 text-red-400 hover:bg-red-500/10"
                        onClick={() =>
                          toast.error(`Ride #${ride.id} cancelled`)
                        }
                        disabled={ride.status !== "active"}
                        data-ocid={`admin.rides.cancel.button.${idx + 1}`}
                      >
                        <CircleX className="h-3.5 w-3.5 mr-1" />
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Disputes ──────────────────────────────────────────────

function DisputesTab() {
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);
  const [disputeType, setDisputeType] = useState("Payment");
  const [disputeDesc, setDisputeDesc] = useState("");

  const handleSubmitDispute = () => {
    if (!disputeDesc.trim()) {
      toast.error("Please describe the issue");
      return;
    }
    toast.success("Dispute submitted successfully");
    setDisputeDesc("");
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: newStatus as typeof d.status } : d,
      ),
    );
    toast.success("Dispute status updated");
  };

  const handleCommentChange = (id: number, comment: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, comment } : d)),
    );
  };

  return (
    <div className="space-y-5" data-ocid="admin.disputes.section">
      <div>
        <h2 className="text-xl font-bold mb-1">Dispute Management</h2>
        <p className="text-sm text-muted-foreground">
          Review and resolve platform disputes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* File a Dispute */}
        <Card className="lg:col-span-2 border-border/50 bg-card/70 h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              File a Dispute
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Type</Label>
              <Select value={disputeType} onValueChange={setDisputeType}>
                <SelectTrigger data-ocid="admin.disputes.type.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Payment">Payment</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="No-show">No-show</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Description
              </Label>
              <Textarea
                placeholder="Describe the issue in detail..."
                value={disputeDesc}
                onChange={(e) => setDisputeDesc(e.target.value)}
                rows={4}
                data-ocid="admin.disputes.description.textarea"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSubmitDispute}
              data-ocid="admin.disputes.submit_button"
            >
              Submit Dispute
            </Button>
          </CardContent>
        </Card>

        {/* Disputes list */}
        <div className="lg:col-span-3 space-y-3">
          {disputes.map((d, idx) => (
            <Card
              key={d.id}
              className="border-border/50 bg-card/70"
              data-ocid={`admin.disputes.item.${idx + 1}`}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {d.reporter} → {d.against}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {d.type}: {d.description}
                    </p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Admin comment..."
                    value={d.comment}
                    onChange={(e) => handleCommentChange(d.id, e.target.value)}
                    className="flex-1 h-8 text-xs"
                    data-ocid={`admin.disputes.comment.input.${idx + 1}`}
                  />
                  <Select
                    onValueChange={(v) => handleStatusUpdate(d.id, v)}
                    defaultValue={d.status}
                  >
                    <SelectTrigger
                      className="w-36 h-8 text-xs"
                      data-ocid={`admin.disputes.status.select.${idx + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => toast.success("Status saved")}
                    data-ocid={`admin.disputes.save_button.${idx + 1}`}
                  >
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Fraud Detection ───────────────────────────────────────

function FraudTab() {
  return (
    <div className="space-y-5" data-ocid="admin.fraud.section">
      <div>
        <h2 className="text-xl font-bold mb-1">Fraud Detection</h2>
        <p className="text-sm text-muted-foreground">
          Monitor suspicious behavior and flag high-risk accounts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              High Risk Users
            </p>
            <p className="text-3xl font-bold text-red-400">3</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Medium Risk
            </p>
            <p className="text-3xl font-bold text-yellow-400">12</p>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Suspicious Patterns
            </p>
            <p className="text-3xl font-bold text-primary">7</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Flag className="h-4 w-4 text-red-400" />
            Flagged Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="admin.fraud.table">
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Risk Level
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Reason
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Last Activity
                  </TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_FRAUD.map((entry, idx) => (
                  <TableRow
                    key={entry.id}
                    className="border-border/30 hover:bg-muted/20"
                    data-ocid={`admin.fraud.row.${idx + 1}`}
                  >
                    <TableCell className="font-medium text-sm">
                      {entry.name}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={entry.risk} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {entry.reason}
                    </TableCell>
                    <TableCell className="text-sm">
                      {entry.lastActivity}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => toast.info("Reviewing account")}
                          data-ocid={`admin.fraud.review.button.${idx + 1}`}
                        >
                          Review
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10"
                          onClick={() => toast.success("Account cleared")}
                          data-ocid={`admin.fraud.clear.button.${idx + 1}`}
                        >
                          Clear
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Analytics ─────────────────────────────────────────────

function AnalyticsTab() {
  const [timeFilter, setTimeFilter] = useState<"7D" | "30D" | "90D">("30D");
  const maxAdAmount = Math.max(...AD_DAILY.map((d) => d.amount));

  return (
    <div className="space-y-5" data-ocid="admin.analytics.section">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold mb-1">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Platform growth and revenue metrics
          </p>
        </div>
        <div className="flex gap-2">
          {(["7D", "30D", "90D"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={timeFilter === f ? "default" : "outline"}
              className="h-8 text-xs w-12"
              onClick={() => setTimeFilter(f)}
              data-ocid={`admin.analytics.timefilter.${f.toLowerCase()}.button`}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value="₹45,230"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          color="bg-primary/10"
        />
        <StatCard
          label="Rides This Month"
          value="892"
          icon={<Car className="h-5 w-5 text-blue-400" />}
          color="bg-blue-500/10"
        />
        <StatCard
          label="New Users"
          value="234"
          icon={<Users className="h-5 w-5 text-accent" />}
          color="bg-accent/10"
        />
        <StatCard
          label="Avg Rating"
          value="4.7★"
          icon={<Activity className="h-5 w-5 text-yellow-400" />}
          color="bg-yellow-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Popular Routes */}
        <Card className="border-border/50 bg-card/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Popular Routes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {POPULAR_ROUTES.map((route, idx) => (
              <div
                key={route.route}
                data-ocid={`admin.analytics.route.item.${idx + 1}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-foreground">{route.route}</span>
                  <span className="text-xs text-muted-foreground">
                    {route.bookings} bookings
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${route.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Ad Revenue */}
        <Card className="border-border/50 bg-card/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Ad Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="bg-primary/10 rounded-lg p-3 flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Daily</p>
                <p className="text-lg font-bold text-primary">₹1,240</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-3 flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Monthly</p>
                <p className="text-lg font-bold text-accent">₹38,200</p>
              </div>
            </div>
            {/* Simple bar chart */}
            <div className="flex items-end gap-1.5 h-24">
              {AD_DAILY.map((d) => (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full rounded-t-sm bg-primary/60 hover:bg-primary transition-colors"
                    style={{ height: `${(d.amount / maxAdAmount) * 72}px` }}
                    data-ocid={`admin.analytics.adbar.${d.day.toLowerCase()}.chart_point`}
                  />
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Tab: System Health ─────────────────────────────────────────

function SystemTab() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleMaintenanceToggle = (checked: boolean) => {
    setMaintenanceMode(checked);
    if (checked) {
      toast.warning(
        "Maintenance mode enabled — users will see a maintenance screen",
      );
    } else {
      toast.success("Maintenance mode disabled — platform is live");
    }
  };

  return (
    <div className="space-y-5" data-ocid="admin.system.section">
      <div>
        <h2 className="text-xl font-bold mb-1">System Health</h2>
        <p className="text-sm text-muted-foreground">
          Monitor canister performance and platform status
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Canister Status",
            value: "Online",
            icon: <CheckCircle className="h-5 w-5 text-green-400" />,
            color: "bg-green-500/10",
            extra: "✓",
          },
          {
            label: "API Latency",
            value: "45ms",
            icon: <Activity className="h-5 w-5 text-blue-400" />,
            color: "bg-blue-500/10",
          },
          {
            label: "Uptime",
            value: "99.97%",
            icon: <Server className="h-5 w-5 text-primary" />,
            color: "bg-primary/10",
          },
          {
            label: "Last Deploy",
            value: "2 days ago",
            icon: <Clock className="h-5 w-5 text-yellow-400" />,
            color: "bg-yellow-500/10",
          },
        ].map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Error Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Current error rate
              </span>
              <span className="text-sm font-bold text-green-400">0.03%</span>
            </div>
            <Progress value={0.03} max={100} className="h-2 mb-4" />
            <div className="flex gap-3">
              <div className="bg-green-500/10 rounded-lg p-3 flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Successful Requests
                </p>
                <p className="text-sm font-bold text-green-400">99.97%</p>
              </div>
              <div className="bg-red-500/10 rounded-lg p-3 flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Failed Requests
                </p>
                <p className="text-sm font-bold text-red-400">0.03%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              Maintenance Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20 mb-4">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {maintenanceMode
                    ? "Users see a maintenance screen"
                    : "Platform is live and accepting users"}
                </p>
              </div>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={handleMaintenanceToggle}
                data-ocid="admin.system.maintenance.switch"
              />
            </div>
            {maintenanceMode && (
              <div
                className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
                data-ocid="admin.system.maintenance.warning.panel"
              >
                <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />
                <p className="text-xs text-yellow-300">
                  Platform is in maintenance mode. New user requests will be
                  blocked.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="space-y-2 font-mono text-xs"
            data-ocid="admin.system.logs.list"
          >
            {MOCK_LOGS.map((log, idx) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/30"
                data-ocid={`admin.system.logs.item.${idx + 1}`}
              >
                <span className="text-muted-foreground shrink-0">
                  {log.time}
                </span>
                <StatusBadge status={log.level} />
                <span
                  className={
                    log.level === "ERROR"
                      ? "text-red-300"
                      : log.level === "WARN"
                        ? "text-yellow-300"
                        : "text-foreground/80"
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main AdminPage ─────────────────────────────────────────────

// ── Tab: Branding ──────────────────────────────────────────────

function BrandingTab() {
  const { branding, updateBranding, activeThemeId, setTheme } = useBranding();
  const [primary, setPrimary] = useState(branding.primaryColor);
  const [secondary, setSecondary] = useState(branding.secondaryColor);
  const [logoUrl, setLogoUrl] = useState(branding.logoUrl);
  const [appName, setAppName] = useState(branding.appName);

  const [oauthClientId, setOauthClientId] = useState(
    () => localStorage.getItem("RYDR_GOOGLE_CLIENT_ID") ?? "",
  );

  const handleSaveOAuth = () => {
    localStorage.setItem("RYDR_GOOGLE_CLIENT_ID", oauthClientId.trim());
    toast.success(
      "Google OAuth Client ID saved! Real Google login is now active.",
    );
  };

  const handleSave = () => {
    updateBranding({
      primaryColor: primary,
      secondaryColor: secondary,
      logoUrl,
      appName,
    });
    toast.success("Branding settings saved! Theme updated across the app.");
  };

  return (
    <div className="space-y-6" data-ocid="admin.branding.panel">
      <div>
        <h2 className="text-xl font-display font-black mb-1">
          Platform Branding
        </h2>
        <p className="text-sm text-muted-foreground">
          Customize logo, colors, and app name. Changes apply instantly.
        </p>
      </div>

      {/* Preset Themes */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Preset Themes</CardTitle>
          <p className="text-xs text-muted-foreground">
            Switch between 5 pre-built themes instantly. Each theme updates
            colors, backgrounds, and cards across the entire app.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PRESET_THEMES.map((theme) => {
              const isActive = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setTheme(theme.id)}
                  data-ocid={`admin.theme.${theme.id}.button`}
                  className="relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  style={{
                    backgroundColor: theme.cardColor,
                    borderColor: isActive
                      ? theme.primaryColor
                      : "rgba(0,0,0,0.1)",
                    boxShadow: isActive
                      ? `0 0 0 2px ${theme.primaryColor}40`
                      : "none",
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: theme.primaryColor }}
                    >
                      Active
                    </span>
                  )}
                  <div className="flex gap-1.5">
                    <div
                      className="w-5 h-5 rounded-full border border-white/30"
                      style={{ background: theme.primaryColor }}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/30"
                      style={{ background: theme.secondaryColor }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-semibold text-center leading-tight"
                    style={{ color: theme.textColor }}
                  >
                    {theme.name}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Logo &amp; App Name</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="branding-logo">
              Logo URL (SVG/PNG/WebP) — leave empty for text logo
            </Label>
            <Input
              id="branding-logo"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://your-domain.com/logo.svg"
              data-ocid="admin.branding.logo.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="branding-appname">App Name</Label>
            <Input
              id="branding-appname"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="RYDR"
              data-ocid="admin.branding.appname.input"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Custom Theme Colors</CardTitle>
          <p className="text-xs text-muted-foreground">
            Override the active preset with custom colors.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="branding-primary">Primary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="branding-primary"
                  type="color"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                  className="h-10 w-16 rounded cursor-pointer border border-border bg-transparent"
                  data-ocid="admin.branding.primary.input"
                />
                <Input
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                  className="flex-1 font-mono text-sm"
                  placeholder="#00AEEF"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="branding-secondary">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="branding-secondary"
                  type="color"
                  value={secondary}
                  onChange={(e) => setSecondary(e.target.value)}
                  className="h-10 w-16 rounded cursor-pointer border border-border bg-transparent"
                  data-ocid="admin.branding.secondary.input"
                />
                <Input
                  value={secondary}
                  onChange={(e) => setSecondary(e.target.value)}
                  className="flex-1 font-mono text-sm"
                  placeholder="#0B3D91"
                />
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="rounded-lg border border-border/50 p-4 space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Live Preview
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-sm font-bold text-white"
                style={{ background: primary }}
              >
                Primary Button
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-sm font-bold text-white"
                style={{ background: secondary }}
              >
                Secondary Button
              </button>
              <div
                className="h-8 w-24 rounded-md"
                style={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        className="gap-2"
        style={{ background: primary }}
        data-ocid="admin.branding.save.button"
      >
        <Palette className="h-4 w-4" />
        Save Branding
      </Button>

      {/* Authentication Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Authentication Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="branding-oauth-client-id">
              Google OAuth Client ID
            </Label>
            <p className="text-xs text-muted-foreground">
              Paste your Client ID from Google Cloud Console to enable real
              Google Sign-In popup.
            </p>
            <Input
              id="branding-oauth-client-id"
              value={oauthClientId}
              onChange={(e) => setOauthClientId(e.target.value)}
              placeholder="1234567890-abc123.apps.googleusercontent.com"
              data-ocid="admin.branding.oauth.input"
            />
          </div>
          <Button
            onClick={handleSaveOAuth}
            variant="outline"
            className="gap-2"
            data-ocid="admin.branding.oauth.save_button"
          >
            Save OAuth Settings
          </Button>
          {!oauthClientId && (
            <p className="text-xs text-muted-foreground">
              No Client ID configured — app is using the demo email form for
              login.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RatingsTab() {
  const [ratings, setRatings] = React.useState(MOCK_RATINGS);
  const totalRatings = ratings.length;
  const flaggedCount = ratings.filter((r) => r.flagged).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black font-display">User Ratings</h2>
        <p className="text-muted-foreground text-sm">
          Monitor and moderate ratings across the platform.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-3xl font-black font-display text-primary">
            {totalRatings}
          </p>
          <p className="text-sm text-muted-foreground">Total Ratings</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-3xl font-black font-display text-destructive">
            {flaggedCount}
          </p>
          <p className="text-sm text-muted-foreground">Flagged Reviews</p>
        </div>
      </div>

      <div
        className="bg-card border border-border rounded-xl overflow-hidden"
        data-ocid="admin.ratings.table"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Reviewer
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Target
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Rating
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Comment
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ratings.map((r, idx) => (
                <TableRow
                  key={r.id}
                  className={r.flagged ? "bg-destructive/5" : undefined}
                >
                  <TableCell className="font-medium text-sm">
                    {r.reviewer}
                  </TableCell>
                  <TableCell className="text-sm">{r.target}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        r.targetType === "driver"
                          ? "border-primary/40 text-primary bg-primary/10 text-xs"
                          : "border-muted text-muted-foreground text-xs"
                      }
                    >
                      {r.targetType === "driver" ? "Driver" : "Passenger"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5"
                          fill={s <= r.rating ? "#f59e0b" : "none"}
                          stroke={s <= r.rating ? "#f59e0b" : "currentColor"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[180px] truncate">
                    {r.comment}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {r.date}
                  </TableCell>
                  <TableCell>
                    {r.flagged && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs gap-1"
                        onClick={() =>
                          setRatings((prev) =>
                            prev.filter((x) => x.id !== r.id),
                          )
                        }
                        data-ocid={`admin.ratings.remove.button.${idx + 1}`}
                      >
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export function AdminPage() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading } = useIsAdmin();
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [isClaiming, setIsClaiming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClaimAdmin = async () => {
    if (!actor) {
      toast.error("Please sign in first");
      return;
    }
    setIsClaiming(true);
    try {
      await (actor as any)._initializeAccessControlWithSecret(
        "rydr-admin-2026",
      );
      await queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
      toast.success("Admin access granted!");
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to claim admin access. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-background"
        data-ocid="admin.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  // Access denied
  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-background px-4"
        data-ocid="admin.access_denied.panel"
      >
        <Card className="w-full max-w-md border-red-500/30 bg-card text-center">
          <CardContent className="pt-10 pb-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
              <Lock className="h-7 w-7 text-red-400" />
            </div>
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-sm text-muted-foreground">
              You don't have admin privileges to access this panel.
            </p>

            {/* Info box explaining how admin access works */}
            <div className="bg-secondary/60 border border-border rounded-lg p-4 text-left space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-primary shrink-0" />
                <p className="text-sm font-semibold text-foreground">
                  How Admin Access Works
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This admin panel uses Google authentication. Sign in with your
                Google account to access the admin panel.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Admin access is automatically granted to{" "}
                <strong className="text-foreground">aman5875@gmail.com</strong>.
                Sign in with that Google account to manage the platform.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                After signing in, return to{" "}
                <code className="bg-background px-1 py-0.5 rounded text-primary">
                  /admin
                </code>{" "}
                to access the control centre.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                className="w-full gap-2"
                onClick={login}
                disabled={isLoggingIn}
                data-ocid="admin.sign_in.button"
              >
                {isLoggingIn ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Shield className="h-4 w-4" />
                )}
                {isLoggingIn ? "Connecting..." : "Sign In"}
              </Button>

              {/* Claim Admin — shown when user is signed in but not admin */}
              {identity && (
                <div className="mt-2 pt-3 border-t border-border/40">
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    First time setup: Click to claim admin access for your
                    account.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-primary/40 text-primary hover:bg-primary/10"
                    onClick={handleClaimAdmin}
                    disabled={isClaiming || !actor}
                    data-ocid="admin.claim_admin.button"
                  >
                    {isClaiming ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Shield className="h-4 w-4" />
                    )}
                    {isClaiming ? "Claiming..." : "Claim Super Admin Access"}
                  </Button>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate({ to: "/" })}
                data-ocid="admin.go_home.button"
              >
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "users":
        return <UsersTab />;
      case "rides":
        return <RidesTab />;
      case "disputes":
        return <DisputesTab />;
      case "fraud":
        return <FraudTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "system":
        return <SystemTab />;
      case "branding":
        return <BrandingTab />;
      case "ratings":
        return <RatingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background" data-ocid="admin.panel">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop close on click is intentional
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-50 md:z-auto h-screen w-64 shrink-0 flex flex-col bg-card border-r border-border/50 overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        data-ocid="admin.sidebar.panel"
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border/30">
          <div className="flex items-center gap-2.5">
            <span
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 800,
                fontSize: "1.25rem",
                letterSpacing: "0.05em",
                color: "oklch(var(--primary))",
              }}
            >
              RYDR
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground leading-none">
                Admin Panel
              </p>
              <Badge
                variant="outline"
                className="mt-1 text-[10px] border-primary/40 text-primary px-1.5 py-0"
              >
                Super Admin
              </Badge>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 px-3 py-4 space-y-0.5"
          data-ocid="admin.nav.panel"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              data-ocid={`admin.nav.${item.id}.link`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === item.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-5 py-4 border-t border-border/30">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Shield className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Signed in as Admin
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                Super Admin access
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 h-8 text-xs text-muted-foreground"
            onClick={() => navigate({ to: "/" })}
            data-ocid="admin.back_to_app.button"
          >
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Back to App
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {/* Mobile hamburger */}
          <div className="md:hidden mb-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              data-ocid="admin.mobile_menu.button"
              className="p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-semibold text-sm capitalize">
              {activeTab}
            </span>
          </div>
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
