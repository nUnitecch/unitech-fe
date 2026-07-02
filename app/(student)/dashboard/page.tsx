import RecentMaterials from "@/components/dashboard/RecentMaterials";
import QuickAction from "@/components/dashboard/QuickAction";
import Quote from "@/components/dashboard/Quote";
import UpcomingClasses from "@/components/dashboard/UpcomingClasses";
import WelcomeBoard from "@/components/dashboard/WelcomeBoard";
import CalendarSection from "@/components/dashboard/calendar/CalendarSection";

export default function Dashboard() {
  return (
    <section className="min-h-screen pb-12 space-y-8">
      <div className="space-y-8">
        <WelcomeBoard />
        <QuickAction />
        <Quote />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col gap-8 order-1 lg:order-2 lg:col-span-1">
          <UpcomingClasses />
          <CalendarSection />
        </div>
        <div className="order-2 lg:order-1 lg:col-span-2">
          <RecentMaterials />
        </div>
      </div>
    </section>
  );
}
