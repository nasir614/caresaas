"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", billed: 4000 },
  { month: "Feb", billed: 3000 },
  { month: "Mar", billed: 5000 },
  { month: "Apr", billed: 4500 },
  { month: "May", billed: 6000 },
  { month: "Jun", billed: 5500 },
];

export default function BillingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="billed" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
