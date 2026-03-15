export type ActivityType =
  | "created"
  | "moved"
  | "in progress"
  | "completed"
  | "expired"
  | "deleted";

export type Activity = {
  id: string;
  taskId: string;
  taskTitle: string;
  type: ActivityType;
  createdAt: string;
};
