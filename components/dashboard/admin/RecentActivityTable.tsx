import { Button } from "@/components/ui/button";

export default function RecentActivityTable() {
  const systemStudents = [
    {
      id: "LASU/2026/8931",
      name: "Bello Hakeem",
      email: "hakeem@lasu.edu.ng",
      level: "200L",
      status: "Active",
    },
    {
      id: "LASU/2026/1042",
      name: "Amadi Chinonso",
      email: "c.amadi@lasu.edu.ng",
      level: "400L",
      status: "Active",
    },
    {
      id: "LASU/2026/4412",
      name: "Aisha Yusuf",
      email: "a.yusuf@lasu.edu.ng",
      level: "100L",
      status: "Suspended",
    },
  ];

  return (
    <div className="bg-background border border-border/10 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-border/10 flex justify-between items-center bg-secondary/30">
        <div>
          <h3 className="font-bold text-base text-foreground">
            Student Management Logs
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit, locate, or deactivate student access blocks directly.
          </p>
        </div>
        <Button variant="outline" className="text-xs h-9 rounded-lg">
          View All Students
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-secondary/50 border-b border-border/10 text-xs font-bold uppercase text-muted-foreground">
              <th className="p-4">Matric / ID</th>
              <th className="p-4">Student Profile</th>
              <th className="p-4">Level</th>
              <th className="p-4">System Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {systemStudents.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-secondary/20 transition-colors"
              >
                <td className="p-4 font-mono text-xs text-foreground/80">
                  {student.id}
                </td>
                <td className="p-4">
                  <div className="font-semibold text-foreground">
                    {student.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {student.email}
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{student.level}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                      student.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-rose-500/10 text-rose-600"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs text-rose-600 hover:underline font-medium cursor-pointer">
                    Revoke Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
