"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", attendance: 65 },
  { month: "Feb", attendance: 59 },
  { month: "Mar", attendance: 80 },
  { month: "Apr", attendance: 81 },
  { month: "May", attendance: 56 },
  { month: "Jun", attendance: 55 },
  { month: "Jul", attendance: 40 },
];

export default function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
