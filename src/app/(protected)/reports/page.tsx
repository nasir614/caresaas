"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[250px] w-full" />
    </CardContent>
  </Card>
);

const AttendanceChart = dynamic(() => import('@/components/charts/AttendanceChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const BillingChart = dynamic(() => import('@/components/charts/BillingChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const ComplianceChart = dynamic(() => import('@/components/charts/ComplianceChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
            <AttendanceChart />
        </div>
        <BillingChart />
        <ComplianceChart />
      </div>
    </div>
  );
}
