import type { Task } from "@/types/board";
import { parseISO, differenceInDays } from "date-fns";

type Props = {
  task: Task;
  timelineStart: Date;
  days: number;
};

export function TimelineRow({ task, timelineStart, days }: Props) {
  const start = parseISO(task.createdAt);
  const end = parseISO(task.deadline);

  let offset = differenceInDays(start, timelineStart);
  let duration = differenceInDays(end, start) + 1;

  if (offset < 0) offset = 0;
  if (offset + duration > days) {
    duration = days - offset;
  }

  return (
    <div
      className="grid border-b items-center"
      style={{
        gridTemplateColumns: `220px repeat(${days}, minmax(60px,1fr))`,
      }}
    >
      <div className="p-3 border-r text-sm">{task.title}</div>

      {Array.from({ length: offset }).map((_, i) => (
        <div key={i}></div>
      ))}

      <div
        className="h-6 bg-blue-500 rounded"
        style={{
          gridColumn: `span ${duration}`,
        }}
      />
    </div>
  );
}
