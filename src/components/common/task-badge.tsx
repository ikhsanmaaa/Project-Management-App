import { Badge } from "../ui/badge";

export default function TaskBadge({ columnId }: { columnId: string }) {
  return (
    <Badge
      variant="secondary"
      className={
        columnId === "inProgress"
          ? "bg-amber-100 text-amber-700"
          : columnId === "done"
            ? "bg-lime-100 text-lime-700"
            : "bg-red-100 text-red-700"
      }
    >
      {columnId}
    </Badge>
  );
}
