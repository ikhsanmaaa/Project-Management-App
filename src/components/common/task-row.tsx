import type { Task } from "@/types/board";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TaskRow({ task }: { task: Task }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="pb-2">
        <CardTitle className="text-base capitalize">{task.title}</CardTitle>

        {task.description && (
          <CardDescription className="text-xs">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
        <Badge
          className={cn(
            "capitalize",
            task.priority === "low"
              ? "bg-green-100 text-green-700"
              : task.priority === "medium"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700",
          )}
        >
          {task.priority}
        </Badge>

        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{format(new Date(task.deadline), "dd MMM yyyy HH:mm")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
