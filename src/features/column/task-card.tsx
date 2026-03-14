import { Card, CardContent } from "@/components/ui/card";
import type { Task, TaskFormData } from "@/types/board";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useBoardStore } from "@/store/board-store";
import { format } from "date-fns";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DialogTask } from "@/components/common/dialog-task";
import { DialogDelete } from "@/components/common/dialog-delete";
import PriorityBadge from "@/components/common/priority-badge";
import TaskBadge from "@/components/common/task-badge";

type Props = {
  task: Task;
  columnId: string;
};

export default function TaskCard({ task, columnId }: Props) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const column = useBoardStore((state) => state.columns[columnId]);

  const updateTask = useBoardStore((state) => state.updateTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdateTask = (data: TaskFormData) => {
    updateTask(task.id, {
      ...data,
      deadline: data.deadline?.toISOString(),
    });
    setOpenUpdate(false);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id, column.id);
    setOpenDelete(false);
  };

  const isOverdue = new Date(task.deadline) < new Date();

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab hover:shadow-md transition ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <PriorityBadge taskPriority={task.priority} />

          {columnId !== "todo" && <TaskBadge columnId={columnId} />}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => setOpenUpdate(true)}
                >
                  Update
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={() => setOpenDelete(true)}
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className="font-medium text-sm capitalize">{task.title}</h3>

        {task.description && (
          <p className="text-xs text-muted-foreground">{task.description}</p>
        )}

        <p
          className={`text-xs ${
            isOverdue ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {format(new Date(task.deadline), "dd MMM yyyy HH:mm")}
        </p>
      </CardContent>

      <DialogTask
        type="update"
        openDialog={openUpdate}
        handleSubmit={handleUpdateTask}
        onOpenDialog={setOpenUpdate}
      />

      <DialogDelete
        openDialog={openDelete}
        onOpenDialog={setOpenDelete}
        handleSubmit={handleDeleteTask}
      />
    </Card>
  );
}
