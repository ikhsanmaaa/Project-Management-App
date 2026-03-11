import type { Column as ColumnType, TaskFormData } from "@/types/board";
import { useBoardStore } from "@/store/board-store";
import TaskCard from "./task-card";
import { Button } from "../ui/button";
import { DialogTask } from "./dialog-task";
import { useState } from "react";

type Props = {
  column: ColumnType;
};

export default function Column({ column }: Props) {
  const tasks = useBoardStore((state) => state.tasks);

  const [open, setOpen] = useState(false);

  const addTask = useBoardStore((state) => state.addTask);

  const handleAddTask = (data: TaskFormData) => {
    addTask(column.id, data);
    setOpen(false);
  };

  return (
    <div className="w-80 shrink-0">
      <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">{column.title}</h2>

          <Button
            className="text-gray-400 hover:text-gray-700"
            onClick={() => setOpen(true)}
          >
            +
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {column.taskIds.map((taskId) => {
            const task = tasks[taskId];

            if (!task) return null;

            return <TaskCard key={task.id} task={task} column={column} />;
          })}
        </div>
      </div>

      <DialogTask
        type="add"
        openDialog={open}
        handleSubmit={handleAddTask}
        onOpenDialog={setOpen}
      />
    </div>
  );
}
