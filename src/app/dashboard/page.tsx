import {
  Activity,
  CalendarCheck,
  TrendingUp,
  Users,
  ShieldAlert,
} from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";

const kpiData = [
  {
    title: "Total Clients",
    value: "125",
    trend: "+5.2% month-over-month",
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
    trendIcon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "Attendance Today",
    value: "82",
    trend: "91% of expected",
    icon: <Activity className="h-6 w-6 text-muted-foreground" />,
  },
  {
    title: "Compliance Alerts",
    value: "3",
    trend: "2 credentials expiring soon",
    icon: <ShieldAlert className="h-6 w-6 text-muted-foreground" />,
    trendColor: "text-amber-600",
  },
  {
    title: "Upcoming Care Plans",
    value: "7",
    trend: "Due next 7 days",
    icon: <CalendarCheck className="h-6 w-6 text-muted-foreground" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Here's a snapshot of your organization's activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            icon={kpi.icon}
            trendIcon={kpi.trendIcon}
            trendColor={kpi.trendColor}
          />
        ))}
      </div>
    </div>
  );
}
