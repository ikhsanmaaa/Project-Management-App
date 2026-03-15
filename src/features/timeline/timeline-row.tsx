import type { Task } from "@/types/board";
import { cn } from "@/utils/cn";
import { parseISO, differenceInDays } from "date-fns";

type Props = {
  task: Task;
  timelineStart: Date;
  days: number;
};

export function TimelineRow({ task, timelineStart, days }: Props) {
  const start = parseISO(task.createdAt);
  const end = parseISO(task.deadline);

  const today = new Date();
  const isExpired = end < today;

  const isDone = !!task.completedAt;

  let offset = differenceInDays(start, timelineStart);
  let duration = differenceInDays(end, start) + 1;

  if (offset < 0) offset = 0;

  if (offset + duration > days) {
    duration = days - offset;
  }

  if (isExpired) {
    offset = 0;
    duration = days;
  }

  return (
    <div
      className="grid border-b items-center"
      style={{
        gridTemplateColumns: `220px repeat(${days}, minmax(60px,1fr))`,
      }}
      title={
        isExpired
          ? "Task is expired"
          : isDone
            ? "Task is Completed"
            : "On going task"
      }
    >
      <div
        className={cn(
          "p-3 border-r text-sm capitalize",
          isExpired ? "text-red-600" : "",
          isDone ? "text-green-700" : "",
        )}
      >
        {task.title}
      </div>

      {Array.from({ length: offset }).map((_, i) => (
        <div key={i}></div>
      ))}

      <div
        className={cn(
          "h-6 rounded",
          isExpired ? "bg-red-500" : isDone ? "bg-green-700" : "bg-blue-500",
        )}
        style={{
          gridColumn: `span ${duration}`,
        }}
      />
    </div>
  );
}
