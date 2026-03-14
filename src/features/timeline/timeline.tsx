import { useBoardStore } from "@/store/board-store";
import { getTimelineDates } from "@/utils/timeline";
import { addDays } from "date-fns";
import { useMemo } from "react";
import { TimelineHeader } from "./timeline-header";
import { TimelineRow } from "./timeline-row";
import EmptyState from "@/components/common/empty-state-list";

export function Timeline() {
  const tasksObj = useBoardStore((s) => s.tasks);
  const tasks = Object.values(tasksObj);

  const startDate = useMemo(() => new Date(), []);
  const endDate = useMemo(() => addDays(startDate, 13), [startDate]);

  const dates = getTimelineDates(startDate, endDate);

  return (
    <div className="p-6">
      {tasks.length > 0 ? (
        <div className="border rounded-lg bg-white overflow-x-auto">
          <TimelineHeader dates={dates} />

          {tasks.map((task) => (
            <TimelineRow
              key={task.id}
              task={task}
              timelineStart={startDate}
              days={dates.length}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
