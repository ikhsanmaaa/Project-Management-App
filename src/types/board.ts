export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
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
};
