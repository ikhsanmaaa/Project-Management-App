import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useBoardStore } from "@/store/board-store";
import TaskCard from "./task-card";

type Props = {
  columnId: string;
};

export default function Column({ columnId }: Props) {
  const column = useBoardStore((state) => state.columns[columnId]);
  const tasks = useBoardStore((state) => state.tasks);

  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  return (
    <div className="w-80 shrink-0">
      <div
        ref={setNodeRef}
        className={`rounded-xl p-4 shadow-sm transition
        ${isOver ? "bg-blue-50 border border-blue-300" : "bg-gray-50"}
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700 text-sm">
            {column.title}
          </h2>

          <span className="text-xs text-gray-400">{column.taskIds.length}</span>
        </div>

        <SortableContext
          items={column.taskIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3 min-h-25">
            {column.taskIds.map((taskId) => {
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
