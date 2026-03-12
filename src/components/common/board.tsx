import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import Column from "./column";
import TaskCard from "./task-card";
import { DialogTask } from "./dialog-task";
import { Button } from "@/components/ui/button";

import { useBoardStore } from "@/store/board-store";
import type { TaskFormData } from "@/types/board";

export default function Board() {
  const columnOrder = useBoardStore((state) => state.columnOrder);
  const tasks = useBoardStore((state) => state.tasks);
  const addTask = useBoardStore((state) => state.addTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  const [open, setOpen] = useState(false);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const handleCreateTask = (data: TaskFormData) => {
    addTask(data);
    setOpen(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const columnId = event.active.data.current?.columnId as string;

    setActiveTaskId(event.active.id as string);
    setActiveColumnId(columnId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTaskId(null);
      setActiveColumnId(null);
      return;
    }

    const sourceColumn = active.data.current?.columnId as string;
    const destColumn = over.id as string;

    if (!sourceColumn || !destColumn) return;

    moveTask(sourceColumn, destColumn, 0, 0);

    setActiveTaskId(null);
    setActiveColumnId(null);
  };

  const activeTask = activeTaskId ? tasks[activeTaskId] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-800">Kanban Board</h1>

        <Button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          + Create Task
        </Button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columnOrder.map((columnId) => (
            <Column key={columnId} columnId={columnId} />
          ))}
        </div>

        <DragOverlay>
          {activeTask && activeColumnId ? (
            <TaskCard task={activeTask} columnId={activeColumnId} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <DialogTask
        type="add"
        openDialog={open}
        handleSubmit={handleCreateTask}
        onOpenDialog={setOpen}
      />
    </div>
  );
}
