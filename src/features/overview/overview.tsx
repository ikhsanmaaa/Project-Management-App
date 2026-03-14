import PriorityBadge from "@/components/common/priority-badge";
import TaskBadge from "@/components/common/task-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const columns = useBoardStore((state) => state.columns);

  const columninProgress = useBoardStore((state) => state.columns.inProgress);
  const inProgressTask = columninProgress.taskIds.map(
    (taskId) => tasks[taskId],
  );

  const columndone = useBoardStore((state) => state.columns.done);
  const doneTaskList = columndone.taskIds.map((taskId) => tasks[taskId]);

  const taskList = Object.values(tasks);

  const taskColumnMap = Object.values(columns).reduce(
    (acc, column) => {
      column.taskIds.forEach((taskId) => {
        acc[taskId] = column.id;
      });
      return acc;
    },
    {} as Record<string, string>,
  );

  const completionData = doneTaskList
    .filter((task) => task.completedAt)
    .reduce<CompletionData[]>((acc, task) => {
      const day = new Date(task.completedAt!).toLocaleDateString("en-US", {
        weekday: "short",
      });

      const existing = acc.find((d) => d.day === day);

      if (existing) {
        existing.completed += 1;
      } else {
        acc.push({ day, completed: 1 });
      }

      return acc;
    }, [])
    .sort(
      (a, b) =>
        new Date(`2024 ${a.day}`).getDay() - new Date(`2024 ${b.day}`).getDay(),
    );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });

  const completedToday =
    completionData.find((d) => d.day === today)?.completed || 0;

  const COLORS: Record<string, string> = {
    Todo: "#6366f1",
    "In Progress": "#f59e0b",
    Done: "#22c55e",
  };

  const statusData = Object.values(columns).map((column) => ({
    name: column.title,
    value: column.taskIds.length,
    fill: COLORS[column.title],
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
            <p className="text-3xl font-bold">{completedToday}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{inProgressTask.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Tasks
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{taskList.length}</p>
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
                  fill="#8884d8"
                />

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {taskList.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>

                    <TableCell>
                      <PriorityBadge taskPriority={task.priority} />
                    </TableCell>

                    <TableCell>
                      {taskColumnMap[task.id] !== "todo" && (
                        <TaskBadge columnId={taskColumnMap[task.id]} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
