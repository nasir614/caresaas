import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  trendIcon?: React.ReactNode;
  trendColor?: string;
}

export function KpiCard({ title, value, trend, icon, trendIcon, trendColor }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn("text-xs text-muted-foreground flex items-center gap-1", trendColor)}>
          {trendIcon}
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}
