import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useBoardStore } from "@/store/board-store";
import TaskCard from "./task-card";
import { cn } from "@/utils/cn";

type Props = {
  columnId: string;
};

export default function Column({ columnId }: Props) {
  const column = useBoardStore((state) => state.columns[columnId]);
  const tasks = useBoardStore((state) => state.tasks);

  const isExpired = columnId === "expired";

  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  const taskIds =
    columnId === "done" ? column.taskIds.slice(-5) : column.taskIds;

  return (
    <div className="w-70 shrink-0">
      <div
        ref={setNodeRef}
        className={cn(
          "rounded-xl p-4 shadow-sm transition",
          isOver ? "bg-blue-50 border border-blue-300" : "bg-gray-50",
          isExpired && "bg-gray-100",
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700 text-sm">
            {column.title}
          </h2>

          <span className="text-xs text-gray-400">{taskIds.length}</span>
        </div>

        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3 min-h-25">
            {taskIds.map((taskId) => {
              const task = tasks[taskId];
              if (!task) return null;

              return <TaskCard key={task.id} task={task} columnId={columnId} />;
            })}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
