import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/types/board";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{task.priority}</Badge>
        </div>

        <h3 className="font-medium text-sm">{task.title}</h3>

        {task.description && (
          <p className="text-xs text-muted-foreground">{task.description}</p>
        )}

        <div className="text-xs text-muted-foreground">
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
