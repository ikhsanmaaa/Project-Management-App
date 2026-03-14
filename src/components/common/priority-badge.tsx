import { cn } from "@/utils/cn";
import { Badge } from "../ui/badge";

export default function PriorityBadge({
  taskPriority,
}: {
  taskPriority: string;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "capitalize",
        taskPriority === "low"
          ? "bg-green-100 text-green-700"
          : taskPriority === "medium"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700",
      )}
    >
      {taskPriority}
    </Badge>
  );
}
