export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <p className="text-sm font-medium">No task in this column</p>
      <p className="text-xs">Create a task from the board page</p>
    </div>
  );
}
