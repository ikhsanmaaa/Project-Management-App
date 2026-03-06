import type { BoardState, Task } from "@/types/board";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BoardActions = {
  addTask: (columnId: string, title: string) => void;
  deleteTask: (taskId: string, columnId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  moveTask: (
    sourceColumnId: string,
    destColumnId: string,
    sourceIndex: number,
    destIndex: number,
  ) => void;
};

type BoardStore = BoardState & BoardActions;

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      tasks: {},

      columns: {
        todo: {
          id: "todo",
          title: "Todo",
          taskIds: [],
        },
        inProgress: {
          id: "inProgress",
          title: "In Progress",
          taskIds: [],
        },
        done: {
          id: "done",
          title: "Done",
          taskIds: [],
        },
      },

      columnOrder: ["todo", "inProgress", "done"],

      addTask: (columnId, title) =>
        set((state) => {
          const column = state.columns[columnId];
          if (!column) return state;

          const id = crypto.randomUUID();

          const newTask: Task = {
            id,
            title,
            priority: "medium",
            createdAt: new Date().toISOString(),
          };

          return {
            tasks: {
              ...state.tasks,
              [id]: newTask,
            },

            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                taskIds: [...column.taskIds, id],
              },
            },
          };
        }),

      deleteTask: (taskId, columnId) =>
        set((state) => {
          const column = state.columns[columnId];
          if (!column) return state;

          const newTasks = { ...state.tasks };
          delete newTasks[taskId];

          return {
            tasks: newTasks,

            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                taskIds: column.taskIds.filter((id) => id !== taskId),
              },
            },
          };
        }),

      updateTask: (taskId, updates) =>
        set((state) => {
          const task = state.tasks[taskId];
          if (!task) return state;

          return {
            tasks: {
              ...state.tasks,
              [taskId]: {
                ...task,
                ...updates,
              },
            },
          };
        }),

      moveTask: (sourceColumnId, destColumnId, sourceIndex, destIndex) =>
        set((state) => {
          const sourceColumn = state.columns[sourceColumnId];
          const destColumn = state.columns[destColumnId];

          if (!sourceColumn || !destColumn) return state;

          const sourceTaskIds = [...sourceColumn.taskIds];
          const [movedTask] = sourceTaskIds.splice(sourceIndex, 1);

          if (!movedTask) return state;

          if (sourceColumnId === destColumnId) {
            sourceTaskIds.splice(destIndex, 0, movedTask);

            return {
              columns: {
                ...state.columns,
                [sourceColumnId]: {
                  ...sourceColumn,
                  taskIds: sourceTaskIds,
                },
              },
            };
          }

          const destTaskIds = [...destColumn.taskIds];
          destTaskIds.splice(destIndex, 0, movedTask);

          return {
            columns: {
              ...state.columns,
              [sourceColumnId]: {
                ...sourceColumn,
                taskIds: sourceTaskIds,
              },
              [destColumnId]: {
                ...destColumn,
                taskIds: destTaskIds,
              },
            },
          };
        }),
    }),
    {
      name: "kanban-storage",
    },
  ),
);
