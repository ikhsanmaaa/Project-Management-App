import { useBoardStore } from "@/store/board-store";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import EmptyState from "../../components/common/empty-state-list";
import TaskRow from "../column/task-row";

export default function List() {
  const columns = useBoardStore((state) => state.columns);
  const tasks = useBoardStore((state) => state.tasks);

  const todoTasks = columns.todo.taskIds.map((id) => tasks[id]);
  const progressTasks = columns.inProgress.taskIds.map((id) => tasks[id]);
  const doneTasks = columns.done.taskIds.map((id) => tasks[id]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold">Task List</h1>

        <span className="text-md text-muted-foreground">
          {Object.keys(tasks).length} tasks
        </span>
      </div>

      <Tabs defaultValue="todo">
        <TabsList className="bg-muted p-1 rounded-lg">
          <TabsTrigger value="todo" className="cursor-pointer">
            Todo ({todoTasks.length})
          </TabsTrigger>

          <TabsTrigger value="inProgress" className="cursor-pointer">
            In Progress ({progressTasks.length})
          </TabsTrigger>

          <TabsTrigger value="done" className="cursor-pointer">
            Done ({doneTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todo" className="flex flex-col gap-4 mt-6">
          {todoTasks.length > 0 ? (
            todoTasks.map((task) => <TaskRow key={task.id} task={task} />)
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="inProgress" className="flex flex-col gap-4 mt-6">
          {progressTasks.length > 0 ? (
            progressTasks.map((task) => <TaskRow key={task.id} task={task} />)
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="done" className="flex flex-col gap-4 mt-6">
          {doneTasks.length > 0 ? (
            doneTasks.map((task) => <TaskRow key={task.id} task={task} />)
          ) : (
            <EmptyState />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
