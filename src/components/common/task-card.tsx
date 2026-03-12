import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Task, TaskFormData } from "@/types/board";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useBoardStore } from "@/store/board-store";
import { DialogTask } from "./dialog-task";
import { DialogDelete } from "./dialog-delete";
import { format } from "date-fns";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

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

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        columnId,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
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
      {...listeners}
      {...attributes}
      className={`cursor-grab hover:shadow-md transition ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={
              task.priority === "low"
                ? "bg-green-100 text-green-700"
                : task.priority === "medium"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
            }
          >
            {task.priority}
          </Badge>

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

        <h3 className="font-medium text-sm">{task.title}</h3>

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
