import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  change,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 bg-background border border-border rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-secondary">{icon}</div>
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight text-foreground">
            {value}
          </span>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            {change}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
}
