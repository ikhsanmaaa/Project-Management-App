import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const completionData = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 5 },
  { day: "Wed", completed: 4 },
  { day: "Thu", completed: 7 },
  { day: "Fri", completed: 6 },
];

const statusData = [
  { name: "Todo", value: 10 },
  { name: "In Progress", value: 5 },
  { name: "Done", value: 13 },
];

const COLORS = ["#6366f1", "#f59e0b", "#22c55e"];

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* ===== Stats Cards ===== */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Completed Today
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Tasks
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">28</p>
          </CardContent>
        </Card>
      </div>

      {/* ===== Completion Chart ===== */}

      <Card>
        <CardHeader>
          <CardTitle>Daily Task Completion</CardTitle>
        </CardHeader>

        <CardContent className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={completionData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ===== Bottom Section ===== */}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Task Distribution */}

        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-sm">
              ✔ Task <span className="font-medium">Fix login bug</span>{" "}
              completed
            </div>

            <div className="text-sm">
              ✔ Task <span className="font-medium">Design landing page</span>{" "}
              moved to progress
            </div>

            <div className="text-sm">
              ✔ Task <span className="font-medium">Update API docs</span>{" "}
              completed
            </div>

            <div className="text-sm">
              ✔ Task <span className="font-medium">Setup CI pipeline</span>{" "}
              created
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
