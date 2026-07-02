import DashboardHome from "@/components/dashboard/DashboardHome";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardHome>{children}</DashboardHome>;
}
