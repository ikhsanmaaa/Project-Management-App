import type { BoardState, Task } from "@/types/board";
import { create } from "zustand";

type BoardActions = {
  addTask: (columnId: string, title: string) => void;
  deleteTask: (taskId: string, columnId: string) => void;
  moveTask: (
    sourceColumnId: string,
    destColumnId: string,
    sourceIndex: number,
    destIndex: number,
  ) => void;
};

type BoardStore = BoardState & BoardActions;

export const useBoardStore = create<BoardStore>((set, get) => ({
  tasks: {},

  columns: {
    todo: {
      id: "todo",
      title: "Todo",
      taskIds: [],
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      taskIds: [],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: [],
    },
  },

  columnOrder: ["todo", "inprogress", "done"],

  addTask: (columnId, title) => {
    const id = crypto.randomUUID();

    const newTask: Task = {
      id,
      title,
      priority: "medium",
      createdAt: new Date().toISOString(),
    };

    const column = get().columns[columnId];

    set((state) => ({
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
    }));
  },

  deleteTask: (taskId, columnId) => {
    const column = get().columns[columnId];

    set((state) => {
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
    });
  },

  moveTask: (sourceColumnId, destColumnId, sourceIndex, destIndex) => {
    const state = get();

    const sourceColumn = state.columns[sourceColumnId];
    const destColumn = state.columns[destColumnId];

    const sourceTaskIds = [...sourceColumn.taskIds];
    const [movedTask] = sourceTaskIds.splice(sourceIndex, 1);

    if (sourceColumnId === destColumnId) {
      sourceTaskIds.splice(destIndex, 0, movedTask);

      set({
        columns: {
          ...state.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            taskIds: sourceTaskIds,
          },
        },
      });

      return;
    }

    const destTaskIds = [...destColumn.taskIds];
    destTaskIds.splice(destIndex, 0, movedTask);

    set({
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
    });
  },
}));
