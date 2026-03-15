import type { Activity } from "@/types/activity";
import type { BoardState, Task, TaskFormData } from "@/types/board";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BoardActions = {
  addTask: (data: TaskFormData) => void;
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

      activities: [],

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
        expired: {
          id: "expired",
          title: "Expired",
          taskIds: [],
        },
      },

      columnOrder: ["todo", "inProgress", "done", "expired"],

      addTask: (data) =>
        set((state) => {
          const id = crypto.randomUUID();

          const newTask: Task = {
            id,
            title: data.title,
            description: data.description,
            priority: data.priority,
            createdAt: new Date().toISOString(),
            deadline: data.deadline.toISOString(),
          };

          const activity: Activity = {
            id: crypto.randomUUID(),
            taskId: id,
            taskTitle: newTask.title,
            type: "created",
            createdAt: new Date().toISOString(),
          };
          return {
            tasks: {
              ...state.tasks,
              [id]: newTask,
            },

            activities: [activity, ...state.activities].slice(0, 50),

            columns: {
              ...state.columns,
              todo: {
                ...state.columns.todo,
                taskIds: [...state.columns.todo.taskIds, id],
              },
            },
          };
        }),

      deleteTask: (taskId, columnId) =>
        set((state) => {
          const column = state.columns[columnId];
          if (!column) return state;

          const task = state.tasks[taskId];
          if (!task) return state;

          const newTasks = { ...state.tasks };
          delete newTasks[taskId];

          const activity: Activity = {
            id: crypto.randomUUID(),
            taskId,
            taskTitle: task.title,
            type: "deleted",
            createdAt: new Date().toISOString(),
          };

          return {
            tasks: newTasks,

            activities: [activity, ...state.activities].slice(0, 50),

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

          if (sourceColumnId === destColumnId && sourceIndex === destIndex) {
            return state;
          }

          const sourceTaskIds = [...sourceColumn.taskIds];
          const [movedTask] = sourceTaskIds.splice(sourceIndex, 1);
          const task = state.tasks[movedTask];

          const activity: Activity = {
            id: crypto.randomUUID(),
            taskId: movedTask,
            taskTitle: task.title,
            type:
              destColumnId === "done"
                ? "completed"
                : destColumnId === "inProgress"
                  ? "in progress"
                  : destColumnId === "expired"
                    ? "expired"
                    : "moved",
            createdAt: new Date().toISOString(),
          };

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
            activities: [activity, ...state.activities].slice(0, 50),

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
