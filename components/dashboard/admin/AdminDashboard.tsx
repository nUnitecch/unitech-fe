import AdminSidebar from "./Sidebar";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-screen overflow-hidden bg-background">
      <div className="w-full h-full grid grid-col-1 md:grid-cols-[auto_1fr]">
        <div className="hidden md:block h-full">
          <AdminSidebar />
        </div>
        <main className="h-full overflow-y-auto bg-slate-50/50 dark:bg-background">
          {children}
        </main>
      </div>
    </section>
  );
}
