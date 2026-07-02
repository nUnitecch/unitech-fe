import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileUp,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "System analytics & status KPIs",
  },
  {
    label: "Student Moderation",
    href: "/admin/students",
    icon: Users,
    description: "Manage student profiles & privileges",
  },
  {
    label: "Timetable Management",
    href: "/admin/timetable",
    icon: CalendarDays,
    description: "Configure schedules & blocks",
  },
  {
    label: "Resource Library",
    href: "/admin/resources",
    icon: FileUp,
    description: "Control academic uploaded assets",
  },
  {
    label: "System Operators",
    href: "/admin/operators",
    icon: ShieldCheck,
    description: "Manage admin permissions & invites",
  },
];
