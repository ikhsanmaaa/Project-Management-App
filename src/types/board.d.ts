import type { Activity } from "./activity";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  completedAt?: string;
  deadline: string;
};

type TaskFormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  deadline: Date;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type BoardState = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
  activities: Activity[];
};
