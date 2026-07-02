"use client";

import { useStudentData } from "@/contexts/studentContext";
import React from "react";
import Link from "next/link";

export default function WelcomeBoard() {
  const { studentData, isLoading } = useStudentData();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="space-y-8 animate-pulse mb-6">
        <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    );
  }

  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between bg-background p-6 text-primary rounded-xl mb-6">
      <div>
        <h2 className="font-semibold text-2xl mb-2">
          Welcome back, {studentData?.firstName}!
        </h2>
        <p className="">Your next class is CSC 203 by 2:00 PM </p>
      </div>
      <div className="flex gap-3.5 text-[14px] mt-3.5">
        <Link
          href="dashboard/timetable"
          className="text-logo bg-logo/10 font-semibold px-4 py-1 rounded-[9px] "
        >
          View Timetable
        </Link>
      </div>
    </section>
  );
}
