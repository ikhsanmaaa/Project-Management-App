import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoardStore } from "@/store/board-store";
import type { CompletionData } from "@/types/overview";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

export default function Overview() {
  const tasks = useBoardStore((state) => state.tasks);

  const column = useBoardStore((state) => state.columns.todo);

  const columnTask = column.taskIds.map((taskId) => tasks[taskId]);

  const taskList = Object.values(tasks);

  const completionData = taskList.reduce<CompletionData[]>((acc, task) => {
    const day = new Date(task.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const existing = acc.find((d) => d.day === day);

    if (existing) {
      existing.completed += 1;
    } else {
      acc.push({ day, completed: 1 });
    }

    return acc;
  }, []);

  const columns = useBoardStore((state) => state.columns);

  const statusData = Object.values(columns).map((column) => ({
    name: column.title,
    value: column.taskIds.length,
  }));

  return (
    <div className="space-y-8">
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>

          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                ></Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {columnTask.map((task) => (
              <div className="text-sm" key={task.id}>
                ✔ Task <span className="font-medium">{task.title}</span>
                {task.id}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
