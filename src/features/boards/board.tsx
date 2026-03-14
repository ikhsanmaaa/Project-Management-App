import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import { Button } from "@/components/ui/button";

import { useBoardStore } from "@/store/board-store";
import type { TaskFormData } from "@/types/board";
import Column from "../column/column";
import TaskCard from "../column/task-card";
import { DialogTask } from "@/components/common/dialog-task";
import DialogColumnDone from "@/components/common/dialog-column-done";
import { isBefore, parseISO } from "date-fns";

export default function Board() {
  const columnOrder = useBoardStore((state) => state.columnOrder);

  const tasks = useBoardStore((state) => state.tasks);
  const addTask = useBoardStore((state) => state.addTask);
  const moveTask = useBoardStore((state) => state.moveTask);
  const columns = useBoardStore((state) => state.columns);

  const [open, setOpen] = useState(false);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingMove, setPendingMove] = useState<{
    taskId: string;
    sourceColumn: string;
    destColumn: string;
    sourceIndex: number;
    destIndex: number;
  } | null>(null);

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
    const destColumn = over.data.current?.columnId ?? over.id;

    const sourceColumnData = columns[sourceColumn];
    const destColumnData = columns[destColumn];

    if (!sourceColumnData || !destColumnData || destColumn === "expired")
      return;

    const sourceIndex = sourceColumnData.taskIds.indexOf(active.id as string);
    const destIndex = destColumnData.taskIds.indexOf(over.id as string);

    if (destColumn === "done") {
      setPendingMove({
        taskId: active.id as string,
        sourceColumn,
        destColumn,
        sourceIndex,
        destIndex,
      });

      setConfirmOpen(true);
    } else {
      moveTask(sourceColumn, destColumn, sourceIndex, destIndex);
    }

    setActiveTaskId(null);
    setActiveColumnId(null);
  };

  const activeTask = activeTaskId ? tasks[activeTaskId] : null;

  const handleConfirmDone = () => {
    if (!pendingMove) return;

    moveTask(
      pendingMove.sourceColumn,
      pendingMove.destColumn,
      pendingMove.sourceIndex,
      pendingMove.destIndex,
    );

    useBoardStore.getState().updateTask(pendingMove.taskId, {
      completedAt: new Date().toISOString(),
    });

    setPendingMove(null);
    setConfirmOpen(false);
  };

  const handleCancelDone = () => {
    setPendingMove(null);
    setConfirmOpen(false);
  };

  useEffect(() => {
    const today = new Date();

    Object.values(tasks).forEach((task) => {
      const deadline = parseISO(task.deadline);

      if (isBefore(deadline, today)) {
        const currentColumn = Object.values(columns).find((col) =>
          col.taskIds.includes(task.id),
        );

        if (!currentColumn) return;

        if (currentColumn.id !== "expired" && currentColumn.id !== "done") {
          const sourceIndex = currentColumn.taskIds.indexOf(task.id);

          moveTask(currentColumn.id, "expired", sourceIndex, 0);
        }
      }
    });
  }, [tasks, columns, moveTask]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-800">Kanban Board</h1>

        <Button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          + Create Task
        </Button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
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

      <DialogColumnDone
        setConfirmOpen={setConfirmOpen}
        confirmOpen={confirmOpen}
        handleCancelDone={handleCancelDone}
        handleConfirmDone={handleConfirmDone}
      />
    </div>
  );
}
