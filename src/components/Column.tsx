import type { Column as ColumnType } from "@/types/board";
import { useBoardStore } from "@/store/boardStore";
import TaskCard from "./TaskCard";

type Props = {
  column: ColumnType;
};

export default function Column({ column }: Props) {
  const tasks = useBoardStore((state) => state.tasks);

  return (
    <div className="w-80 shrink-0">
      <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">{column.title}</h2>

          <button className="text-gray-400 hover:text-gray-700">+</button>
        </div>

        <div className="flex flex-col gap-4">
          {column.taskIds.map((taskId) => {
            const task = tasks[taskId];

            if (!task) return null;

            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
}
