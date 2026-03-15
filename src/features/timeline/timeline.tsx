import { useBoardStore } from "@/store/board-store";
import { getTimelineDates } from "@/utils/timeline";
import { addDays } from "date-fns";
import { useMemo } from "react";
import { TimelineHeader } from "./timeline-header";
import { TimelineRow } from "./timeline-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/common/empty-state-list";

export function Timeline() {
  const tasksObj = useBoardStore((s) => s.tasks);
  const tasks = Object.values(tasksObj);

  const startDate = useMemo(() => new Date(), []);
  const endDate = useMemo(() => addDays(startDate, 13), [startDate]);

  const dates = getTimelineDates(startDate, endDate);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Timeline Task</CardTitle>

        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            On going
          </span>

          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Completed
          </span>

          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Overdue
          </span>
        </div>

        <span className="text-sm text-muted-foreground">
          {Object.keys(tasks).length} tasks
        </span>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {tasks.length > 0 ? (
          <div>
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
      </CardContent>
    </Card>
  );
}
