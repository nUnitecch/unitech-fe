import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminDashboard>{children}</AdminDashboard>;
}
